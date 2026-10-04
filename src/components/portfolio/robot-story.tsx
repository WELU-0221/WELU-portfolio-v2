"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { animated, useSpring, useReducedMotion } from "@react-spring/web";
import { RobotBoundary, RobotModel } from "./robot-model";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { robotContributionGroups, robotHero, robotLearnings, robotOutcomes, robotStages, robotStart, robotSystemGroups, robotTags, type RobotPose } from "@/data/robot-story";
import styles from "./robot-story.module.css";

function Flow({ title, steps }: { title: string; steps: string[] }) {
  return <div className={styles.flow}><h3>{title}</h3><ol>{steps.map(step => <li key={step}>{step}</li>)}</ol></div>;
}

function OverviewStage() {
  return <div data-robot-copy className={`${styles.copy} ${styles.overviewStage}`}>
    <p className={styles.label}>02 / OVERVIEW</p>
    <h2 id="robot-overview-title" className={styles.title}>從結構，到節奏。</h2>
    <p className={styles.text}>本專題以多自由度跳舞機器人為主題，整合機械結構、硬體與感測系統，並探索音樂節奏資訊與機器人動作之間的對應方式。</p>
    <div className={styles.projectScope} aria-label="Project scope">
      <article><span>01</span><strong>MECHANICAL</strong><p>SolidWorks<br />Robot Assembly<br />Joint Arrangement</p></article>
      <article><span>02</span><strong>HARDWARE / SENSING</strong><p>Hardware Layout<br />IMU<br />FSR-402</p></article>
      <article><span>03</span><strong>MUSIC / MOTION</strong><p>Spectrogram<br />Beat / Tempo / Rhythm<br />Motion Mapping Exploration</p></article>
    </div>
    <p className={styles.scopeConnection}>MECHANICAL ＋ HARDWARE / SENSING ＋ MUSIC / MOTION <i>↓</i> <b>ROBOT MOTION</b></p>
  </div>;
}

function ContributionStage() {
  return <div data-robot-copy className={styles.contributionStage}>
    <header className={styles.contributionHeader}>
      <p className={styles.label}>MY CONTRIBUTION / INDIVIDUAL SCOPE</p>
      <h2 id="robot-role-title" className={styles.title}>我實際負責的部分。<br /><span className="text-muted">My Contribution</span></h2>
      <p className={styles.text}>從機構與硬體配置，到音樂特徵研究與專題協調；以下內容聚焦我的個人工作範圍。</p>
    </header>
    <ol className={styles.contributionGrid}>{robotContributionGroups.map(group => <li key={group.number} data-contribution-item><span>{group.number}</span><div><strong>{group.title}</strong><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div></li>)}</ol>
    <div className={styles.scopeDivider}>
      <div><span>INDIVIDUAL SCOPE</span><strong>Mechanical Design · Hardware Layout · Music Feature Research · Project Coordination</strong></div>
      <div><span>PROJECT / TEAM SYSTEM</span><strong>ROS · RViz · Gazebo · Reinforcement Learning research</strong></div>
      <p>團隊系統技術不代表全部由我個人獨立完成。<br />Team-level technologies do not imply individual ownership of every subsystem.</p>
    </div>
  </div>;
}

function SystemMap() {
  return <div data-robot-copy className={styles.systemStage}>
    <header className={styles.systemHeader}>
      <p className={styles.label}>07 / PROJECT / TEAM SYSTEM</p>
      <h2 id="robot-system-title" className={styles.title}>專題系統架構<br /><span className="text-muted">Project / Team System</span></h2>
      <p className={styles.systemKicker}>How the subsystems connect.</p>
    </header>
    <div className={styles.systemMap}>
      {robotSystemGroups.map(group => <article key={group.id} data-system-group data-group={group.id} className={styles.systemGroup}>
        <div className={styles.systemGroupHead}><span>{group.number}</span><h3>{group.title}</h3></div>
        <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
        <p>{group.annotation}</p>
      </article>)}
      <div data-system-core className={styles.systemCore} aria-label="System convergence: Robot Motion">
        <span>MECHANICAL · SENSING · CONTROL · AI</span>
        <strong>ROBOT MOTION</strong>
      </div>
    </div>
    <aside className={styles.systemScope}>
      <p>TEAM / SYSTEM SCOPE</p>
      <strong>此區呈現整體專題系統架構，個人實際負責內容另列於 My Contribution。</strong>
      <span>The technologies shown here represent the overall project system. My individual responsibilities are listed separately in “My Contribution”.</span>
    </aside>
  </div>;
}

function ResultStage() {
  return <div data-robot-copy className={styles.resultStage}>
    <header className={styles.resultHeader}>
      <p className={styles.label}>08 / RESULT / CURRENT STAGE</p>
      <h2 id="robot-result-title" className={styles.title}>成果與目前階段<br /><span className="text-muted">Result / Current Stage</span></h2>
      <p className={styles.text}>完成多自由度機器人機構設計、實體製作與專題系統架構整合，並建立感測、模擬與控制研究基礎。</p>
      <p className={styles.text}>AI 舞蹈生成目前仍屬研究與探索階段，主要系統以預先規劃動作序列為主，並持續探索音樂特徵、動作對應與動態平衡。</p>
      <div className={styles.resultTags}><span>Research Prototype</span><span>System Integration</span><span>Motion Exploration</span><span>AI / Music Mapping Research</span></div>
    </header>
    <div className={styles.outcomeGrid}>{robotOutcomes.map(item => <article key={item.number} data-stage-card className={styles.outcomeCard}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
  </div>;
}

function LearningStage() {
  return <div data-robot-copy className={styles.learningStage}>
    <header className={styles.learningHeader}>
      <p className={styles.label}>09 / ENGINEERING LEARNING</p>
      <h2 id="robot-learning-title" className={styles.title}>工程學習<br /><span className="text-muted">Engineering Learning</span></h2>
    </header>
    <div className={styles.learningGrid}>{robotLearnings.map(item => <article key={item.number} data-stage-card className={styles.learningCard}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    <div className={styles.finalMessage}>
      <p>這個專題讓我第一次真正接觸跨領域系統整合，也讓我從單純的機構設計，開始思考資料、控制與機械系統之間的關係。</p>
      <p>This project expanded my perspective from mechanical design to interdisciplinary system integration across sensing, control, data, and robotics.</p>
    </div>
  </div>;
}

export function RobotStory() {
  const reduced = useReducedMotion();
  const entrance = useSpring({ opacity: 1, immediate: true, config: { tension: 80, friction: 26 } });
  const root = useRef<HTMLDivElement>(null);
  const motion = useRef<RobotPose>({ ...robotStart });
  const invalidate = useRef<(() => void) | null>(null);
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 768px)" }, match => {
        if (!match.conditions?.motion) return;
        const desktop = Boolean(match.conditions.desktop);
        const pages = gsap.utils.toArray<HTMLElement>("[data-robot-page]", element);
        const overviewPage = element.querySelector<HTMLElement>("#robot-overview");
        const contributionPage = element.querySelector<HTMLElement>("#robot-responsibilities");
        const mechanicalPage = element.querySelector<HTMLElement>("#robot-mechanical");
        const canvas = element.querySelector<HTMLElement>(`.${styles.canvas}`);
        const storyPoses = [robotHero, robotStart, { ...robotStart, scale: .82 }, ...robotStages.slice(1).map(stage => stage.pose)];
        const poses = desktop ? storyPoses : storyPoses.map(pose => ({ ...pose, x: pose.x * .12, y: pose.y * .25, scale: Math.min(pose.scale, 1.02), rx: pose.rx * .5, yaw: pose.yaw * .55, rz: pose.rz * .4, cx: 3.4, cy: 1.75, cz: Math.max(pose.cz, 8.45), ty: pose.ty * .25 }));
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
        if (canvas && overviewPage && mechanicalPage) {
          gsap.to(canvas, { autoAlpha: 0, scrollTrigger: { trigger: overviewPage, start: "top 76%", end: "top 44%", scrub: .25, invalidateOnRefresh: true } });
          gsap.to(canvas, { autoAlpha: 1, scrollTrigger: { trigger: mechanicalPage, start: "top 74%", end: "top 46%", scrub: .25, invalidateOnRefresh: true } });
        }
        if (canvas && contributionPage && mechanicalPage) {
          gsap.to(canvas, { autoAlpha: 0, scrollTrigger: { trigger: contributionPage, start: "top 74%", end: "top 46%", scrub: .25, invalidateOnRefresh: true } });
          gsap.to(canvas, { autoAlpha: 1, scrollTrigger: { trigger: mechanicalPage, start: "top 74%", end: "top 46%", scrub: .25, invalidateOnRefresh: true } });
        }
        timeline.to({}, { duration: .25 }, pages.length - 1);
        pages.forEach((page, index) => {
          const copy = page.querySelector<HTMLElement>("[data-robot-copy]");
          if (!copy) return;
          if (index > 0) timeline.fromTo(copy, { opacity: .15, y: 28 }, { opacity: 1, y: 0, duration: .4 }, index - .55);
          if (index < pages.length - 1) timeline.to(copy, { opacity: .15, y: -20, duration: .35 }, index + .35);
          page.querySelectorAll<HTMLElement>("[data-music-node]").forEach((node, nodeIndex) => { timeline.fromTo(node, { opacity: .2, x: -18 }, { opacity: 1, x: 0, duration: .25 }, index - .35 + nodeIndex * .1); });
          page.querySelectorAll<HTMLElement>("[data-system-group]").forEach((node, nodeIndex) => { timeline.fromTo(node, { opacity: .12, y: 18, scale: .98 }, { opacity: 1, y: 0, scale: 1, duration: .3 }, index - .4 + nodeIndex * .09); });
          const systemCore = page.querySelector<HTMLElement>("[data-system-core]");
          if (systemCore) timeline.fromTo(systemCore, { opacity: .1, scale: .9 }, { opacity: 1, scale: 1, duration: .45 }, index - .12);
          page.querySelectorAll<HTMLElement>("[data-stage-card]").forEach((card, cardIndex) => { timeline.fromTo(card, { opacity: .12, y: 22 }, { opacity: 1, y: 0, duration: .32 }, index - .28 + cardIndex * .1); });
          page.querySelectorAll<HTMLElement>("[data-contribution-item]").forEach((item, itemIndex) => { timeline.fromTo(item, { opacity: .15, y: 16 }, { opacity: 1, y: 0, duration: .25 }, index - .35 + itemIndex * .07); });
        });
        return () => { timeline.scrollTrigger?.kill(); timeline.kill(); };
      });
    }, element);
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    let resizeFrame = 0;
    const refreshOnResize = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(() => ScrollTrigger.refresh()); };
    window.addEventListener("resize", refreshOnResize, { passive: true });
    return () => { cancelAnimationFrame(refresh); cancelAnimationFrame(resizeFrame); window.removeEventListener("resize", refreshOnResize); media.revert(); context.revert(); invalidate.current = null; };
  }, []);
  return <div ref={root} className={styles.story} id="robot-story">
    <div className={styles.viewport} aria-label="AI Dancing Robot 3D 展示">
      <animated.div className={styles.canvas} style={entrance}>
        <RobotBoundary><Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [3.2, 1.8, 7.5], fov: 35, near: .01, far: 100 }} gl={{ alpha: true, antialias: true }} onCreated={state => { invalidate.current = state.invalidate; state.gl.setClearAlpha(0); }} fallback={<p className={styles.status}>此瀏覽器無法顯示 WebGL 模型，請繼續閱讀專案。</p>}>
          <ambientLight intensity={0.78} /><hemisphereLight groundColor="#aeb5ba" color="#fffaf1" intensity={1.08} /><directionalLight position={[5, 8, 5]} intensity={3.35} /><directionalLight position={[-4, 4, -2]} intensity={1.5} /><pointLight position={[-3, 4, 4]} intensity={0.82} color="#8aaec0" distance={12} />
          <Suspense fallback={<Html center><span className="text-sm text-muted">Loading Robot…</span></Html>}><RobotModel motion={motion} renderFrameRef={invalidate} /></Suspense>
        </Canvas></RobotBoundary>
      </animated.div>
    </div>
    <div className={styles.pages}>
      <header data-robot-page className={`${styles.page} ${styles.heroPage}`}>
        <div data-robot-copy className={styles.copy}>
          <Link href="/#projects" className="mb-8 inline-block text-sm text-muted">← Back to Projects</Link>
          <p className={styles.label}>01 / PROJECT HERO · W / 03</p>
          <h1 className={styles.heroTitle}>AI 跳舞機器人</h1><p className={styles.text}>AI Dancing Robot</p>
          <p className={styles.label}>ROBOTICS / MECHANICAL DESIGN / AI EXPLORATION</p>
          <div className={styles.tags}>{robotTags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <Link href="#robot-overview" className={styles.link}>Scroll to explore ↓</Link>
        </div>
      </header>
      <section id="robot-overview" data-robot-page className={styles.page} aria-labelledby="robot-overview-title"><OverviewStage /></section>
      <section id="robot-responsibilities" data-robot-page className={styles.page} aria-labelledby="robot-role-title"><ContributionStage /></section>
      {robotStages.slice(1).map(stage => <section key={stage.id} id={`robot-${stage.id}`} data-robot-page className={styles.page} aria-labelledby={`robot-${stage.id}-title`}>
        {stage.id === "result" ? <ResultStage /> : stage.id === "learning" ? <LearningStage /> : stage.id === "system" ? <SystemMap /> : stage.id === "music" ? <div data-robot-copy className={`${styles.copy} ${styles.musicStage}`} data-side={stage.side}><p className={styles.label}>{stage.label}</p><h2 id={`robot-${stage.id}-title`} className={styles.title}>音樂與 AI 探索<br /><span className="text-muted">Music / AI Exploration</span></h2><p className={styles.musicKicker}>FROM SOUND TO MOTION</p><p className={styles.text}>{stage.text}</p><div className={styles.musicResearchFlow}><article data-music-node><b>01 / SOUND</b><strong>Music Input<br />Audio Feature Extraction</strong></article><i>→</i><article data-music-node><b>02 / SPECTRAL REPRESENTATION</b><strong>Spectrogram</strong></article><i>→</i><article data-music-node><b>03 / RHYTHM FEATURES</b><strong>Beat / Tempo / Rhythm</strong></article><i>→</i><article data-music-node><b>04 / MOTION EXPLORATION</b><strong>Feature Analysis<br />Motion Mapping Exploration<br />Robot Motion</strong></article></div><p className={styles.researchBoundary}>Research / Exploration · 主要系統以預先規劃動作序列為主；音樂特徵與動作對應仍持續研究。</p></div> : stage.id === "hardware" ? <div data-robot-copy className={styles.copy} data-side={stage.side}><p className={styles.label}>{stage.label}</p><h2 id={`robot-${stage.id}-title`} className={styles.title}>硬體整合<br /><span className="text-muted">Hardware Integration</span></h2><p className={styles.text}>{stage.text}</p><div className={styles.hardwareCallouts}>{["Controller", "Sensors", "Servo Motors", "Power", "Mechanical Structure"].map((item, index) => <span key={item} className={`${styles.hardwareCallout} ${styles[`callout${index + 1}`]}`}>{item}</span>)}</div><p className="mt-5 text-xs text-muted">工程配置示意，不代表未提供的實際型號或尺寸。</p></div> : stage.id === "sensor" ? <div data-robot-copy className={styles.copy} data-side={stage.side}><p className={styles.label}>{stage.label}</p><h2 id={`robot-${stage.id}-title`} className={styles.title}>感測與平衡<br /><span className="text-muted">Sensor &amp; Balance</span></h2><p className={styles.text}>{stage.text}</p><div className={styles.sensorGrid}><Flow title="ATTITUDE" steps={["IMU", "Robot Attitude"]} /><Flow title="PRESSURE / BALANCE" steps={["FSR-402", "Foot Pressure", "Center of Pressure (COP)"]} /></div><p className="mt-5 text-xs leading-relaxed text-muted">Project / Team System · 感測與平衡資訊屬於整體系統研究，不代表全部由我個人獨立完成。</p><div className={styles.footCallout} aria-hidden="true">FOOT / COP</div></div> : <div data-robot-copy className={styles.copy} data-side={stage.side}>
          <p className={styles.label}>{stage.label}</p><h2 id={`robot-${stage.id}-title`} className={styles.title}>{stage.title}</h2>
          <p className={styles.text}>{stage.text}</p>
          {stage.items && <ul className={styles.list}>{stage.items.map(item => <li key={item}>{item}</li>)}</ul>}
        </div>}
      </section>)}
    </div>
  </div>;
}
