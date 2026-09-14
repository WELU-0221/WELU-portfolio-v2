"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { animated, useSpring, useReducedMotion } from "@react-spring/web";
import { RobotBoundary, RobotModel } from "./robot-model";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mechanicalFlow, musicFlow, robotResponsibilities, robotStages, robotStart, robotTags, robotTeam, type RobotPose } from "@/data/robot-story";
import styles from "./robot-story.module.css";

function Flow({ title, steps }: { title: string; steps: string[] }) {
  return <div className={styles.flow}><h3>{title}</h3><ol>{steps.map(step => <li key={step}>{step}</li>)}</ol></div>;
}

export function RobotStory() {
  const reduced = useReducedMotion();
  const entrance = useSpring({ from: { opacity: 0 }, opacity: 1, immediate: reduced === true, config: { tension: 80, friction: 26 } });
  const root = useRef<HTMLDivElement>(null);
  const motion = useRef<RobotPose>({ ...robotStart });
  const invalidate = useRef<(() => void) | null>(null);
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const pages = gsap.utils.toArray<HTMLElement>("[data-robot-page]", element);
        const poses = [robotStart, robotStart, { ...robotStart, scale: .82 }, ...robotStages.slice(1).map(stage => stage.pose)];
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => invalidate.current?.(),
          scrollTrigger: { id: "robot-story", trigger: element, start: "top top", end: "bottom bottom", scrub: .55, invalidateOnRefresh: true },
        });
        // A single timeline owns all poses and text; CSS sticky never reparents React DOM.
        pages.forEach((page, index) => {
          if (index === 0) return;
          const position = index - .75;
          timeline.to(motion.current, { ...poses[index], duration: .75 }, position);
        });
        timeline.to({}, { duration: .25 }, pages.length - 1);
        pages.forEach((page, index) => {
          const copy = page.querySelector<HTMLElement>("[data-robot-copy]");
          if (!copy) return;
          if (index > 0) timeline.fromTo(copy, { opacity: .15, y: 28 }, { opacity: 1, y: 0, duration: .4 }, index - .55);
          if (index < pages.length - 1) timeline.to(copy, { opacity: .15, y: -20, duration: .35 }, index + .35);
        });
        return () => { timeline.scrollTrigger?.kill(); timeline.kill(); };
      });
    }, element);
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(refresh); media.revert(); context.revert(); invalidate.current = null; };
  }, []);
  return <div ref={root} className={styles.story} id="robot-story">
    <div className={styles.viewport} aria-label="AI Dancing Robot 3D 展示">
      <animated.div className={styles.canvas} style={entrance}>
        <RobotBoundary><Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [3.2, 1.8, 7.5], fov: 35, near: .01, far: 100 }} gl={{ alpha: true, antialias: true }} onCreated={state => { invalidate.current = state.invalidate; state.gl.setClearAlpha(0); }} fallback={<p className={styles.status}>此瀏覽器無法顯示 WebGL 模型，請繼續閱讀專案。</p>}>
          <ambientLight intensity={1.2} /><hemisphereLight intensity={1.3} /><directionalLight position={[5, 8, 5]} intensity={1.7} /><directionalLight position={[-5, 3, -3]} intensity={.8} />
          <Suspense fallback={<Html center><span className="text-sm text-muted">Loading Robot…</span></Html>}><RobotModel motion={motion} renderFrameRef={invalidate} /></Suspense>
        </Canvas></RobotBoundary>
      </animated.div>
    </div>
    <div className={styles.pages}>
      <header data-robot-page className={styles.page}>
        <div data-robot-copy className={styles.copy}>
          <Link href="/#projects" className="mb-8 inline-block text-sm text-muted">← Back to Projects</Link>
          <p className={styles.label}>W / 03 · UNIVERSITY CAPSTONE PROJECT</p>
          <h1 className={styles.heroTitle}>AI 跳舞機器人</h1><p className={styles.text}>AI Dancing Robot</p>
          <p className={styles.label}>CROSS-DISCIPLINARY ENGINEERING</p>
          <div className={styles.tags}>{robotTags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <Link href="#robot-overview" className={styles.link}>Scroll to explore ↓</Link>
        </div>
      </header>
      <section id="robot-overview" data-robot-page className={styles.page} aria-labelledby="robot-overview-title"><div data-robot-copy className={styles.copy}>
        <p className={styles.label}>{robotStages[0].label}</p><h2 id="robot-overview-title" className={styles.title}>{robotStages[0].title}</h2><p className={styles.text}>{robotStages[0].text}</p>
        <p className={styles.text}>這是一項跨領域團隊專題：整合機械結構、硬體配置、音樂分析與 AI 方法，探索讓機器人依音樂節奏產生對應動作。</p>
      </div></section>
      <section id="robot-responsibilities" data-robot-page className={styles.page} aria-labelledby="robot-role-title"><div data-robot-copy className={styles.copy}>
        <p className={styles.label}>MY RESPONSIBILITIES / 個人負責</p><h2 id="robot-role-title" className={styles.title}>我參與的部分。</h2>
        <ul className={styles.list}>{robotResponsibilities.map(item => <li key={item}>{item}</li>)}</ul>
      </div></section>
      {robotStages.slice(1).map(stage => <section key={stage.id} id={`robot-${stage.id}`} data-robot-page className={styles.page} aria-labelledby={`robot-${stage.id}-title`}>
        {stage.id === "workflows" ? <div data-robot-copy className={styles.dual}>
          <header><p className={styles.label}>{stage.label}</p><h2 id={`robot-${stage.id}-title`} className={styles.title}>{stage.title}</h2></header>
          <Flow title="MECHANICAL" steps={mechanicalFlow} /><Flow title="AI / MUSIC" steps={musicFlow} /><p className={styles.merge}>ROBOT SYSTEM</p>
        </div> : <div data-robot-copy className={styles.copy} data-side={stage.side} data-narrow={stage.id === "rhythm" || stage.id === "contribution"}>
          <p className={styles.label}>{stage.label}</p><h2 id={`robot-${stage.id}-title`} className={styles.title}>{stage.title}</h2>
          {stage.id === "team" && <div className={styles.tags}>{robotTeam.map(item => <span key={item}>{item}</span>)}</div>}
          <p className={styles.text}>{stage.text}</p>
          {stage.items && <ul className={styles.list}>{stage.items.map(item => <li key={item}>{item}</li>)}</ul>}
          {stage.id === "hardware" && <div className={styles.callout} aria-hidden="true" />}
          {stage.id === "music" && <><div className={styles.spectrum} aria-hidden="true">{Array.from({ length: 40 }, (_, index) => <i key={index} style={{ height: `${20 + ((index * 17 + index * index * 7) % 80)}%` }} />)}</div><p className="mt-2 font-mono text-xs text-muted">ABSTRACT SPECTROGRAM / 頻譜概念示意</p></>}
        </div>}
      </section>)}
    </div>
  </div>;
}