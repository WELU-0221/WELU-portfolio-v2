"use client";
import { Component, useEffect, useMemo, useRef, type ReactNode, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, DataTexture, Group, LinearFilter, RepeatWrapping, RGBAFormat, MathUtils, Mesh, MeshStandardMaterial, Vector3, type Material, type Object3D } from "three";
import type { GLTFLoaderPlugin, GLTFParser } from "three-stdlib";
import type { RobotPose } from "@/data/robot-story";
import styles from "./robot-story.module.css";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const modelUrl = `${base}/models/AI自動機器人/組合件1.glb`;
// The CAD exporter labels a raw DDS normal map as PNG. Decode its actual bytes
// without rewriting the source GLB or replacing its original material values.
const robotTexturePlugin = (parser: GLTFParser): GLTFLoaderPlugin & { name: string } => ({
    name: "WELU_CAD_DDS_TEXTURE",
    async loadTexture(index: number) {
      const definition = parser.json.textures[index];
      const image = parser.json.images[definition.source];
      if (image.bufferView === undefined) return parser.loadTexture(index);
      const buffer: ArrayBuffer = await parser.getDependency("bufferView", image.bufferView);
      if (buffer.byteLength < 128 || new DataView(buffer).getUint32(0, true) !== 0x20534444) return parser.loadTexture(index);
      const header = new DataView(buffer);
      const width = header.getUint32(16, true), height = header.getUint32(12, true);
      const offset = header.getUint32(4, true) + 4;
      if (header.getUint32(88, true) !== 32 || header.getUint32(84, true) !== 0 || header.getUint32(92, true) !== 0xff0000 || header.getUint32(96, true) !== 0xff00 || header.getUint32(100, true) !== 0xff || offset + width * height * 4 > buffer.byteLength) throw new Error("Unsupported CAD DDS pixel layout");
      const source = new Uint8Array(buffer, offset, width * height * 4);
      const pixels = new Uint8Array(source.length);
      for (let pixel = 0; pixel < source.length; pixel += 4) {
        pixels[pixel] = source[pixel + 2]; pixels[pixel + 1] = source[pixel + 1]; pixels[pixel + 2] = source[pixel]; pixels[pixel + 3] = 255;
      }
      const texture = new DataTexture(pixels, width, height, RGBAFormat);
      texture.flipY = false;
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.magFilter = texture.minFilter = LinearFilter;
      texture.needsUpdate = true;
      return texture;
    },
});
const configureRobotLoader: NonNullable<Parameters<typeof useGLTF>[3]> = loader => { loader.register(robotTexturePlugin); };
export class RobotBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) { console.error("[Robot GLB] Load failed", error); }
  render() { return this.state.failed ? <p className={styles.status} role="status">3D 模型暫時無法載入。仍可向下閱讀完整專案。</p> : this.props.children; }
}

export function RobotModel({ motion, renderFrameRef }: { motion: MutableRefObject<RobotPose>; renderFrameRef: MutableRefObject<(() => void) | null> }) {
  const { scene } = useGLTF(modelUrl, `${base}/models/draco/`, true, configureRobotLoader);
  const robot = useRef<Group>(null);
  const { camera, size, gl, invalidate } = useThree();
  useEffect(() => { renderFrameRef.current = invalidate; invalidate(); return () => { if (renderFrameRef.current === invalidate) renderFrameRef.current = null; }; }, [invalidate, renderFrameRef]);
  const asset = useMemo(() => {
    const model = scene.clone(true);
    const materialCopies = new Map<Material, Material>();
    // CAD exports can carry lights. Our own soft rig is independent of export settings.
    model.traverse(object => { if (object.type.endsWith("Light")) object.visible = false; if (object instanceof Mesh) { const tune = (material: Material) => { const existing = materialCopies.get(material); if (existing) return existing; const adjusted = material.clone(); if (adjusted instanceof MeshStandardMaterial) { const hsl = { h: 0, s: 0, l: 0 }; adjusted.color.getHSL(hsl); if (hsl.s < .16) adjusted.color.multiplyScalar(.64); adjusted.roughness = Math.max(adjusted.roughness, .58); adjusted.metalness = Math.min(adjusted.metalness, .16); } materialCopies.set(material, adjusted); return adjusted; }; object.material = Array.isArray(object.material) ? object.material.map(tune) : tune(object.material); } });
    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const dimensions = bounds.getSize(new Vector3());
    const armParts: Object3D[] = [];
    model.traverse(object => {
      if (/手臂|arm/i.test(object.name)) armParts.push(object);
    });
    const assembly = model.getObjectByName("組合件1") ?? model;
    const rigDefinitions = [
      { id: "left", pivot: [.012, .058, -.049] as const, elbow: [.016, .064, -.114] as const, parts: ["手臂1-1-1", "馬達-16", "手臂1-2-1", "腳2-111-2", "馬達-18", "馬達-19", "手臂-1"], forearm: ["馬達-19", "手臂-1"] },
      { id: "right", pivot: [.013, .058, .048] as const, elbow: [.016, .064, .113] as const, parts: ["手臂1-1-2", "馬達-25", "馬達-33", "手臂1-2-4", "腳2-111-4", "馬達-30", "馬達-31", "手臂-3"], forearm: ["馬達-31", "手臂-3"] },
    ];
    assembly.updateMatrixWorld(true);
    const armRigs = rigDefinitions.map(definition => {
      const pivot = new Group();
      pivot.name = `WELU_${definition.id}_shoulder_pivot`;
      pivot.position.set(definition.pivot[0], definition.pivot[1], definition.pivot[2]);
      assembly.add(pivot);
      assembly.updateMatrixWorld(true);
      definition.parts.map(name => assembly.getObjectByName(name)).filter((part): part is Object3D => Boolean(part)).forEach(part => pivot.attach(part));
      return { id: definition.id, pivot };
    });
    const elbowRigs = armRigs.map((rig, index) => {
      const definition = rigDefinitions[index];
      const pivot = new Group();
      pivot.name = `WELU_${definition.id}_elbow_pivot`;
      pivot.position.set(definition.elbow[0], definition.elbow[1], definition.elbow[2]);
      assembly.add(pivot);
      assembly.updateMatrixWorld(true);
      rig.pivot.attach(pivot);
      definition.forearm.map(name => rig.pivot.getObjectByName(name)).filter((part): part is Object3D => Boolean(part)).forEach(part => pivot.attach(part));
      return { id: definition.id, pivot };
    });
    // The source GLB flattens the lower-body hierarchy. Build two virtual hip
    // pivots from the mirrored CAD coordinates so each leg can move as a unit.
    const legDefinitions = [
      { id: "left", pivot: [-.002, -.066, -.062] as const, side: -1 },
      { id: "right", pivot: [-.002, -.066, .062] as const, side: 1 },
    ];
    const legRigs = legDefinitions.map(definition => {
      const pivot = new Group();
      pivot.name = `WELU_${definition.id}_hip_pivot`;
      pivot.position.set(definition.pivot[0], definition.pivot[1], definition.pivot[2]);
      assembly.add(pivot);
      assembly.updateMatrixWorld(true);
      const parts = assembly.children
        .filter(part => part !== pivot && part.position.y < -.045 && Math.abs(part.position.z) > .02 && Math.sign(part.position.z) === definition.side)
      const lowerParts = parts.filter(part => part.position.y < -.12);
      parts.forEach(part => pivot.attach(part));
      return { id: definition.id, pivot, lowerParts };
    });
    const kneePositions = { left: [-.025, -.115, -.055] as const, right: [-.025, -.115, .055] as const };
    const kneeRigs = legRigs.map(rig => {
      const pivot = new Group();
      pivot.name = `WELU_${rig.id}_knee_pivot`;
      const position = kneePositions[rig.id as "left" | "right"];
      pivot.position.set(position[0], position[1], position[2]);
      assembly.add(pivot);
      assembly.updateMatrixWorld(true);
      rig.pivot.attach(pivot);
      rig.lowerParts.forEach(part => pivot.attach(part));
      return { id: rig.id, pivot };
    });
    return { model, center, dimensions, materials: [...materialCopies.values()], armParts, armRigs, elbowRigs, legRigs, kneeRigs, extent: Math.max(dimensions.x, dimensions.y, dimensions.z, .001) };
  }, [scene]);
  const armRigBases = useMemo(() => asset.armRigs.map(rig => ({ x: rig.pivot.rotation.x, y: rig.pivot.rotation.y, z: rig.pivot.rotation.z })), [asset]);
  const elbowRigBases = useMemo(() => asset.elbowRigs.map(rig => ({ x: rig.pivot.rotation.x, y: rig.pivot.rotation.y, z: rig.pivot.rotation.z })), [asset]);
  const legRigBases = useMemo(() => asset.legRigs.map(rig => ({ x: rig.pivot.rotation.x, y: rig.pivot.rotation.y, z: rig.pivot.rotation.z })), [asset]);
  const kneeRigBases = useMemo(() => asset.kneeRigs.map(rig => ({ x: rig.pivot.rotation.x, y: rig.pivot.rotation.y, z: rig.pivot.rotation.z })), [asset]);
  useEffect(() => () => { asset.materials.forEach(material => material.dispose()); }, [asset]);
  const axes = useMemo(() => ({ target: new Vector3(), forward: new Vector3(), right: new Vector3(), up: new Vector3() }), []);
  useEffect(() => {
    const objects: Array<{ name: string; type: string }> = [];
    asset.model.traverse(object => objects.push({ name: object.name || "(unnamed)", type: object.type }));
    console.groupCollapsed("[Robot GLB] Loaded — scene objects / meshes");
    console.table(objects);
    console.info("[Robot GLB] Shoulder pivots", asset.armRigs.map(rig => rig.pivot.name));
    console.info("[Robot GLB] Elbow pivots", asset.elbowRigs.map(rig => rig.pivot.name));
    console.info("[Robot GLB] Hip pivots", asset.legRigs.map(rig => rig.pivot.name));
    console.info("[Robot GLB] Knee pivots", asset.kneeRigs.map(rig => rig.pivot.name));
    console.info("[Robot GLB] Bounds", { center: asset.center.toArray(), size: asset.dimensions.toArray(), normalizedExtent: 2 });
    console.groupEnd();
    // Geometry and original materials belong to useGLTF's cache, not this clone.
  }, [asset]);
  useFrame(({ clock }) => {
    if (!robot.current) return;
    const pose = motion.current;
    const wave = pose.armWave ?? 0;
    asset.armRigs.forEach((rig, index) => {
      const base = armRigBases[index];
      if (!base) return;
      // These virtual pivots sit at the shoulder motors identified from the
      // exported CAD coordinates. Each pivot carries its entire arm assembly.
      const phase = clock.elapsedTime * 2.1 + index * Math.PI;
      const lift = (Math.sin(phase) + 1) * .5 * wave;
      const side = rig.id === "left" ? 1 : -1;
      rig.pivot.rotation.x = base.x + lift * .95 * side;
      rig.pivot.rotation.z = base.z + Math.sin(phase) * wave * .08;
      rig.pivot.rotation.y = base.y;
    });
    asset.elbowRigs.forEach((rig, index) => {
      const base = elbowRigBases[index];
      if (!base) return;
      const phase = clock.elapsedTime * 2.1 + index * Math.PI;
      const bend = Math.max(0, Math.sin(phase)) * wave;
      const side = rig.id === "left" ? 1 : -1;
      rig.pivot.rotation.x = base.x + bend * .82 * side;
      rig.pivot.rotation.y = base.y;
      rig.pivot.rotation.z = base.z;
    });
    asset.legRigs.forEach((rig, index) => {
      const base = legRigBases[index];
      if (!base) return;
      const phase = clock.elapsedTime * 2.1 + index * Math.PI;
      const side = rig.id === "left" ? 1 : -1;
      rig.pivot.rotation.x = base.x + Math.sin(phase) * wave * .24 * side;
      rig.pivot.rotation.y = base.y;
      rig.pivot.rotation.z = base.z;
    });
    asset.kneeRigs.forEach((rig, index) => {
      const base = kneeRigBases[index];
      if (!base) return;
      const phase = clock.elapsedTime * 2.1 + index * Math.PI;
      const bend = Math.max(0, Math.sin(phase)) * wave;
      const side = rig.id === "left" ? 1 : -1;
      rig.pivot.rotation.x = base.x + bend * .68 * side;
      rig.pivot.rotation.y = base.y;
      rig.pivot.rotation.z = base.z;
    });
    const mobile = size.width < 768;
    camera.position.set(pose.cx, pose.cy, pose.cz);
    axes.target.set(0, pose.ty, 0);
    camera.lookAt(axes.target);
    camera.getWorldDirection(axes.forward);
    axes.right.crossVectors(axes.forward, camera.up).normalize();
    axes.up.crossVectors(axes.right, axes.forward).normalize();
    const height = 2 * Math.tan(MathUtils.degToRad(35 / 2)) * camera.position.distanceTo(axes.target);
    const width = height * size.width / Math.max(size.height, 1);
    const referenceHeight = 2 * Math.tan(MathUtils.degToRad(35 / 2)) * 8.35;
    const referenceWidth = referenceHeight * size.width / Math.max(size.height, 1);
    const fit = Math.min(referenceWidth * (mobile ? .68 : .43), referenceHeight * (mobile ? .29 : .62)) / 2;
    robot.current.position.copy(axes.target)
      .addScaledVector(axes.right, (mobile ? pose.x * .025 : pose.x) * width)
      .addScaledVector(axes.up, (mobile ? -.34 + Math.max(0, gl.domElement.getBoundingClientRect().top) / Math.max(size.height, 1) + pose.y * .1 : pose.y) * height);
    robot.current.scale.setScalar(fit * (mobile ? Math.min(pose.scale, 1.04) : pose.scale));
    robot.current.rotation.x = mobile ? pose.rx * .35 : pose.rx; robot.current.rotation.y = -Math.PI / 2 + (mobile ? pose.yaw * .35 : pose.yaw); robot.current.rotation.z = mobile ? pose.rz * .25 : pose.rz;
    if (wave > 0 && !mobile) invalidate();
  });
  return <group ref={robot}><group scale={2 / asset.extent}><group position={asset.center.clone().negate()}><primitive object={asset.model} dispose={null} /></group></group></group>;
}

useGLTF.preload(modelUrl, `${base}/models/draco/`, true, configureRobotLoader);
