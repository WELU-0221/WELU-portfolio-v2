"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ErrorInfo, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Html, useGLTF } from "@react-three/drei";
import { MathUtils, type Group } from "three";

const modelUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/models/socket/socket-assembly.glb`;

class PreviewErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[Socket homepage preview] Failed to load model", error, info);
  }

  render() {
    return this.state.failed
      ? <PreviewFallback message="3D MODEL UNAVAILABLE" />
      : this.props.children;
  }
}

function PreviewFallback({ message }: { message: string }) {
  return <div className="flex h-full items-center justify-center px-5 text-center font-mono text-xs text-inverse/65">{message}</div>;
}

function PreviewLoading() {
  return <Html center><span className="whitespace-nowrap font-mono text-[0.65rem] text-inverse/65">LOADING 3D MODEL…</span></Html>;
}

function PreviewModel({ animate, pointer }: { animate: boolean; pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { scene } = useGLTF(modelUrl);
  const model = useMemo(() => scene.clone(true), [scene]);
  const group = useRef<Group>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    const assembly = group.current;
    if (!assembly) return;

    if (animate) elapsed.current += Math.min(delta, 0.05);
    const targetY = 0.18 + elapsed.current * 0.22 + pointer.current.x * 0.24;
    const targetX = -0.08 + pointer.current.y * 0.12;
    assembly.rotation.y = MathUtils.damp(assembly.rotation.y, targetY, 4, delta);
    assembly.rotation.x = MathUtils.damp(assembly.rotation.x, targetX, 4, delta);
  });

  return (
    <Bounds fit clip observe margin={1.18}>
      <group ref={group}>
        <primitive object={model} />
      </group>
    </Bounds>
  );
}

export function SocketProjectPreview({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const [finePointer, setFinePointer] = useState(false);
  const animate = active && finePointer && !reduceMotion;

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!animate) {
      pointer.current = { x: 0, y: 0 };
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: MathUtils.clamp(event.clientX / window.innerWidth * 2 - 1, -1, 1),
        y: MathUtils.clamp(event.clientY / window.innerHeight * 2 - 1, -1, 1),
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [animate]);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-foreground text-inverse" role="img" aria-label="Socket 設計自動化系統 3D 模型預覽">
      <div className="absolute inset-x-5 top-5 z-10 flex justify-between gap-4 border-b border-inverse/25 pb-4 font-mono text-xs tracking-widest">
        <span>W / 01</span>
        <span>SOCKET ASSEMBLY</span>
      </div>

      <div className="absolute inset-0 translate-y-2 md:translate-y-3">
        <PreviewErrorBoundary>
          <Canvas
            camera={{ fov: 34, near: 0.01, far: 1000, position: [3.6, 2.8, 5.4] }}
            dpr={animate ? [1, 1.5] : 1}
            frameloop={animate ? "always" : "demand"}
            gl={{ alpha: true, antialias: true }}
            onCreated={({ gl }) => gl.setClearAlpha(0)}
            style={{ background: "transparent" }}
            fallback={<PreviewFallback message="WEBGL UNAVAILABLE" />}
          >
            <ambientLight intensity={1.35} />
            <hemisphereLight args={["#ffffff", "#20364c", 1.35]} />
            <directionalLight position={[4, 7, 5]} intensity={2.5} />
            <directionalLight position={[-4, 2, -3]} intensity={1.15} />
            <Suspense fallback={<PreviewLoading />}>
              <PreviewModel animate={animate} pointer={pointer} />
            </Suspense>
          </Canvas>
        </PreviewErrorBoundary>
      </div>
    </div>
  );
}
