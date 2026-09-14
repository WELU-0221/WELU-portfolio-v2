"use client";

import { Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, type ErrorInfo, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { Box3, MathUtils, Mesh, MeshStandardMaterial, Vector3, type DirectionalLight, type Group, type Material } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socketStages, socketStart, type SocketPose } from "@/data/socket-story";
import styles from "./socket-story.module.css";

const modelUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/models/socket/socket-assembly.glb`;

class ViewerErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("[Socket GLB] Load error", error, info); }
  render() { return this.state.failed ? <Fallback text="3D 模型暫時無法載入，仍可捲動閱讀工程流程。" /> : this.props.children; }
}
function Fallback({ text }: { text: string }) {
  return <div className="absolute inset-x-0 bottom-1/4 px-gutter text-center text-sm text-muted" role="status">{text}</div>;
}

// Clone only materials: shared GLTF cache and homepage rendering remain untouched.
function prepareModel(scene: Group) {
  const model = scene.clone(true);
  const materials: Material[] = [];
  const boxes = new Box3().setFromObject(model);
  const size = boxes.getSize(new Vector3());
  const center = boxes.getCenter(new Vector3());
  const extent = Math.max(size.x, size.y, size.z, 0.001);
  model.traverse(object => {
    if (!(object instanceof Mesh)) return;
    const tint = (source: Material) => {
      const material = source.clone();
      if (material instanceof MeshStandardMaterial) {
        material.color.multiplyScalar(0.42);
        material.roughness = 0.62;
        material.metalness = 0.18;
      }
      materials.push(material);
      return material;
    };
    object.material = Array.isArray(object.material) ? object.material.map(tint) : tint(object.material);
  });
  const names = ["零件3-1", "零件1-1", "零件2-1"];
  const offsets = [0.38, 0.015, -0.38];
  const parts = names.flatMap((name, index) => {
    const object = model.getObjectByName(name);
    return object ? [{ object, origin: object.position.clone(), offset: extent * offsets[index], start: index * 0.15 }] : [];
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
    console.groupCollapsed("[Socket GLB] Scene objects");
    console.table(objects);
    console.groupEnd();
    return () => { asset.materials.forEach(material => material.dispose()); };
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
    // Fixed reference distance keeps camera moves perceptible instead of cancelling zoom.
    const referenceHeight = 2 * Math.tan(MathUtils.degToRad(35 / 2)) * 7.4;
    const referenceWidth = referenceHeight * size.width / Math.max(size.height, 1);
    const fit = Math.min(referenceWidth * (mobile ? 0.68 : 0.27), referenceHeight * (mobile ? 0.31 : 0.42)) / 2.4;
    const x = mobile ? pose.x * 0.1 : pose.x;
    const y = mobile ? -0.2 + pose.y * 0.15 : pose.y;
    group.position.copy(vectors.target).addScaledVector(vectors.right, x * visibleWidth).addScaledVector(vectors.up, y * visibleHeight);
    group.scale.setScalar(fit * (mobile ? Math.min(pose.scale, 1.12) : pose.scale));
    group.rotation.set(pose.rx, (mobile ? pose.ry * 0.5 : pose.ry) + drag.current, mobile ? pose.rz * 0.3 : pose.rz);
    asset.parts.forEach(part => {
      part.object.position.copy(part.origin);
      part.object.position.y += part.offset * MathUtils.smoothstep(pose.explode, part.start, Math.min(1, part.start + 0.7));
    });
    if (keyLight.current) keyLight.current.intensity = 2 * pose.light;
  });

  return <>
    <ambientLight intensity={0.32} />
    <hemisphereLight intensity={0.5} />
    <directionalLight ref={keyLight} position={[3, 6, 4]} intensity={2} />
    <directionalLight position={[-4, 2, -3]} intensity={0.65} />
    <group ref={assembly}>
      <group scale={2.4 / asset.extent}>
        <group position={[-asset.center.x, -asset.center.y, -asset.center.z]}>
          <primitive object={asset.model} dispose={null} />
        </group>
      </group>
    </group>
  </>;
}

export function SocketModelViewer() {
  const root = useRef<HTMLDivElement>(null);
  const motion = useRef<SocketPose>({ ...socketStart });
  const invalidate = useRef<() => void>(() => undefined);
  const drag = useRef(0);
  const pointer = useRef<{ id: number; x: number } | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = root.current;
    if (!element) return;
    const scene = element.closest<HTMLElement>("[data-socket-scene]");
    if (!scene) return;
    const media = gsap.matchMedia();
    media.add({ reduced: "(prefers-reduced-motion: reduce)", normal: "(prefers-reduced-motion: no-preference)" }, match => {
      const reduced = Boolean(match.conditions?.reduced);
      const ctx = gsap.context(() => {
        Object.assign(motion.current, socketStart);
        const panels = gsap.utils.toArray<HTMLElement>("[data-story-panel]", element);
        const canvas = element.querySelector("[data-story-canvas]");
        const progress = element.querySelector("[data-story-progress]");
        gsap.set(panels, { autoAlpha: 0, y: reduced ? 0 : 22 });
        gsap.set(panels[0], { autoAlpha: 1, y: 0 });
        const timeline = gsap.timeline({ onUpdate: () => invalidate.current() });
        for (let index = 1; index < socketStages.length; index++) {
          const pose = reduced ? { ...socketStart, explode: socketStages[index].pose.explode } : socketStages[index].pose;
          timeline.to(motion.current, { ...pose, duration: 1, ease: "sine.inOut" }, index - 1);
          timeline.to(panels[index - 1], { autoAlpha: 0, y: reduced ? 0 : -18, duration: 0.3, ease: "none" }, index - 0.3);
          timeline.fromTo(panels[index], { autoAlpha: 0, y: reduced ? 0 : 22 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "none" }, index - 0.3);
        }
        timeline.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 7, ease: "none" }, 0);
        timeline.to(canvas, { opacity: 0.48, duration: 1 }, 6);
        ScrollTrigger.create({
          trigger: scene, animation: timeline, pin: true, start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 7 * 0.85)}`,
          scrub: reduced ? true : 0.75, invalidateOnRefresh: true, anticipatePin: 1,
        });
      }, element);
      return () => ctx.revert();
    });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(frame);
      media.revert();
      pointer.current = null;
      invalidate.current = () => undefined;
    };
  }, []);

  return <div ref={root} className={styles.stage} aria-label="Socket assembly scroll story">
    <div data-story-canvas className={styles.canvas}
      onPointerDown={event => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        pointer.current = { id: event.pointerId, x: event.clientX };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={event => {
        if (pointer.current?.id !== event.pointerId) return;
        drag.current += (event.clientX - pointer.current.x) * 0.006;
        pointer.current.x = event.clientX;
        invalidate.current();
      }}
      onPointerUp={() => { pointer.current = null; }}
      onPointerCancel={() => { pointer.current = null; }}
      onLostPointerCapture={() => { pointer.current = null; }}>
      <ViewerErrorBoundary>
        <Canvas camera={{ fov: 35, near: 0.01, far: 100, position: [0, 3.6, 6.5] }}
          dpr={[1, 1.75]} frameloop="demand" gl={{ alpha: true, antialias: true }}
          onCreated={({ gl, invalidate: refresh }) => {
            gl.setClearAlpha(0); gl.toneMappingExposure = 0.85; invalidate.current = refresh;
          }}
          fallback={<Fallback text="此瀏覽器無法顯示 WebGL 3D 模型" />}>
          <Suspense fallback={<Html center><span className="font-mono text-xs text-muted">LOADING MODEL…</span></Html>}>
            <ModelScene motion={motion} drag={drag} />
          </Suspense>
        </Canvas>
      </ViewerErrorBoundary>
    </div>
    {socketStages.map((stage, index) => <article key={stage.label} data-story-panel data-placement={stage.placement}
      className={styles.copy} style={{ visibility: index === 0 ? "visible" : "hidden" }}>
      <p className="font-mono text-xs tracking-widest text-accent">{stage.label}</p>
      <h2 className={styles.heading}>{stage.title}</h2>
      {stage.body && <p className={styles.body}>{stage.body}</p>}
      {index === 3 && <div className={styles.callout} aria-hidden="true" />}
    </article>)}
    <div className={styles.rail}>
      <p className={styles.hint}>SCROLL TO EXPLORE ↓ · <span className="hidden md:inline">拖曳旋轉 · </span>往上滑動倒放</p>
      <div className={styles.railLine}><div data-story-progress className={styles.progress} /></div>
    </div>
  </div>;
}
