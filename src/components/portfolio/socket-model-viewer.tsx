"use client";

import { Component, Suspense, useEffect, useMemo, useRef, type ErrorInfo, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { Box3, MathUtils, Mesh, MeshStandardMaterial, Vector3, type DirectionalLight, type Group, type Material } from "three";
import type { SocketPose } from "@/data/socket-story";
import styles from "./socket-story.module.css";

const modelUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/models/socket/socket-assembly.glb`;

class ViewerErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("[Socket GLB] Load error", error, info); }
  render() { return this.state.failed ? <Fallback text="3D 模型暫時無法載入，仍可閱讀工程流程。" /> : this.props.children; }
}

function Fallback({ text }: { text: string }) {
  return <div className="absolute inset-x-0 top-1/2 px-gutter text-center text-sm text-muted" role="status">{text}</div>;
}

function prepareModel(scene: Group) {
  const model = scene.clone(true);
  const materials: Material[] = [];
  const bounds = new Box3().setFromObject(model);
  const size = bounds.getSize(new Vector3());
  const center = bounds.getCenter(new Vector3());
  const extent = Math.max(size.x, size.y, size.z, 0.001);
  model.traverse(object => {
    if (!(object instanceof Mesh)) return;
    const tint = (source: Material) => {
      const material = source.clone();
      if (material instanceof MeshStandardMaterial) {
        material.color.multiplyScalar(0.5);
        material.roughness = 0.58;
        material.metalness = 0.16;
      }
      materials.push(material);
      return material;
    };
    object.material = Array.isArray(object.material) ? object.material.map(tint) : tint(object.material);
  });
  // Actual independently addressable names in the supplied GLB; no inferred names are used.
  const names = ["零件3-1", "零件1-1", "零件2-1"];
  const horizontalDirections = [new Vector3(-0.92, 0, 0), new Vector3(0, 0, 0), new Vector3(0.92, 0, 0)];
  const verticalDirections = [new Vector3(0, 0.78, 0), new Vector3(0, 0, 0), new Vector3(0, -0.78, 0)];
  const parts = names.flatMap((name, index) => {
    const object = model.getObjectByName(name);
    return object ? [{ object, origin: object.position.clone(), horizontal: horizontalDirections[index].multiplyScalar(extent), vertical: verticalDirections[index].multiplyScalar(extent) }] : [];
  });
  return { model, materials, center, extent, parts };
}

function ModelScene({ motion, drag }: { motion: MutableRefObject<SocketPose>; drag: MutableRefObject<number> }) {
  const { scene } = useGLTF(modelUrl);
  const asset = useMemo(() => prepareModel(scene), [scene]);
  const assembly = useRef<Group>(null);
  const keyLight = useRef<DirectionalLight>(null);
  const { camera, size } = useThree();
  const vectors = useMemo(() => ({ target: new Vector3(), forward: new Vector3(), right: new Vector3(), up: new Vector3() }), []);

  useEffect(() => {
    const objects: Array<{ name: string; type: string }> = [];
    asset.model.traverse(object => objects.push({ name: object.name || "(unnamed)", type: object.type }));
    console.groupCollapsed("[Socket GLB] Scene objects"); console.table(objects); console.groupEnd();
    return () => asset.materials.forEach(material => material.dispose());
  }, [asset]);

  useFrame(() => {
    const group = assembly.current;
    if (!group) return;
    const pose = motion.current;
    const mobile = size.width < 768;
    camera.position.set(pose.cx, pose.cy, pose.cz);
    vectors.target.set(pose.tx, pose.ty, 0);
    camera.lookAt(vectors.target);
    camera.getWorldDirection(vectors.forward);
    vectors.right.crossVectors(vectors.forward, camera.up).normalize();
    vectors.up.crossVectors(vectors.right, vectors.forward).normalize();
    const distance = camera.position.distanceTo(vectors.target);
    const visibleHeight = 2 * Math.tan(MathUtils.degToRad(35 / 2)) * distance;
    const visibleWidth = visibleHeight * size.width / Math.max(size.height, 1);
    const referenceHeight = 2 * Math.tan(MathUtils.degToRad(35 / 2)) * 7.4;
    const referenceWidth = referenceHeight * size.width / Math.max(size.height, 1);
    // Keep the model within the dedicated visual area; copy must always remain readable.
    const fit = Math.min(referenceWidth * (mobile ? 0.78 : 0.34), referenceHeight * (mobile ? 0.54 : 0.46)) / 2.4;
    const x = mobile ? 0 : pose.x;
    const y = mobile ? -0.03 : pose.y;
    group.position.copy(vectors.target).addScaledVector(vectors.right, x * visibleWidth).addScaledVector(vectors.up, y * visibleHeight);
    group.scale.setScalar(fit * (mobile ? Math.min(pose.scale, 1.12) : pose.scale));
    group.rotation.set(pose.rx, (mobile ? pose.ry * 0.55 : pose.ry) + drag.current, mobile ? pose.rz * 0.35 : pose.rz);
    asset.parts.forEach(part => part.object.position.copy(part.origin).addScaledVector(part.horizontal, pose.horizontal).addScaledVector(part.vertical, pose.vertical));
    if (keyLight.current) keyLight.current.intensity = 2 * pose.light;
  });
  return <>
    <ambientLight intensity={0.3} /><hemisphereLight intensity={0.54} />
    <directionalLight ref={keyLight} position={[3, 6, 4]} intensity={2} />
    <directionalLight position={[-4, 2, -3]} intensity={0.7} />
    <group ref={assembly}><group scale={2.4 / asset.extent}><group position={[-asset.center.x, -asset.center.y, -asset.center.z]}><primitive object={asset.model} dispose={null} /></group></group></group>
  </>;
}

interface SocketModelViewerProps { motion: MutableRefObject<SocketPose>; invalidateRef: MutableRefObject<() => void>; }

export function SocketModelViewer({ motion, invalidateRef }: SocketModelViewerProps) {
  const drag = useRef(0);
  const pointer = useRef<{ id: number; x: number } | null>(null);
  return <div className={styles.canvas} data-socket-canvas
    onPointerDown={event => { if (event.pointerType === "mouse" && event.button === 0) { pointer.current = { id: event.pointerId, x: event.clientX }; event.currentTarget.setPointerCapture(event.pointerId); } }}
    onPointerMove={event => { if (pointer.current?.id === event.pointerId) { drag.current += (event.clientX - pointer.current.x) * 0.006; pointer.current.x = event.clientX; invalidateRef.current(); } }}
    onPointerUp={() => { pointer.current = null; }} onPointerCancel={() => { pointer.current = null; }} onLostPointerCapture={() => { pointer.current = null; }}>
    <ViewerErrorBoundary><Canvas camera={{ fov: 35, near: 0.01, far: 100, position: [0, 3.6, 6.8] }} dpr={[1, 1.75]} frameloop="demand" gl={{ alpha: true, antialias: true }}
      onCreated={({ gl, invalidate }) => { gl.setClearAlpha(0); gl.toneMappingExposure = 0.86; invalidateRef.current = invalidate; }} fallback={<Fallback text="此瀏覽器無法顯示 WebGL 3D 模型" />}>
      <Suspense fallback={<Html center><span className="font-mono text-xs text-muted">LOADING MODEL…</span></Html>}><ModelScene motion={motion} drag={drag} /></Suspense>
    </Canvas></ViewerErrorBoundary>
  </div>;
}

useGLTF.preload(modelUrl);
