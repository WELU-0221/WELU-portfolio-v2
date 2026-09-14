"use client";
import { Component, useEffect, useMemo, useRef, type ReactNode, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, DataTexture, LinearFilter, RepeatWrapping, RGBAFormat, MathUtils, Vector3, type Group } from "three";
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
    // CAD exports can carry lights. Our own soft rig is independent of export settings.
    model.traverse(object => { if (object.type.endsWith("Light")) object.visible = false; });
    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const dimensions = bounds.getSize(new Vector3());
    return { model, center, dimensions, extent: Math.max(dimensions.x, dimensions.y, dimensions.z, .001) };
  }, [scene]);
  const axes = useMemo(() => ({ target: new Vector3(), forward: new Vector3(), right: new Vector3(), up: new Vector3() }), []);
  useEffect(() => {
    const objects: Array<{ name: string; type: string }> = [];
    asset.model.traverse(object => objects.push({ name: object.name || "(unnamed)", type: object.type }));
    console.groupCollapsed("[Robot GLB] Loaded — scene objects / meshes");
    console.table(objects);
    console.info("[Robot GLB] Bounds", { center: asset.center.toArray(), size: asset.dimensions.toArray(), normalizedExtent: 2 });
    console.groupEnd();
    // Geometry and original materials belong to useGLTF's cache, not this clone.
  }, [asset]);
  useFrame(() => {
    if (!robot.current) return;
    const pose = motion.current;
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
    robot.current.rotation.y = -Math.PI / 2 + (mobile ? pose.yaw * .35 : pose.yaw);
  });
  return <group ref={robot}><group scale={2 / asset.extent}><group position={asset.center.clone().negate()}><primitive object={asset.model} dispose={null} /></group></group></group>;
}
