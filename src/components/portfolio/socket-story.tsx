"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/portfolio";
import { brand } from "@/data/portfolio";
import { socketPartLabels, socketStart, socketStoryPoses, type SocketPose } from "@/data/socket-story";
import { SocketModelViewer } from "./socket-model-viewer";
import styles from "./socket-story.module.css";

interface Props { project: Project; previous: Project; next: Project; }
const responsibilities = [
  ["01", "ENGINEERING WORKFLOW", "工程需求與自動化流程拆解"],
  ["02", "ENGINEERING LOGIC", "將可標準化的工程判斷整理成系統流程"],
  ["03", "AUTOMATION INTEGRATION", "整合 UI、計算流程與 CAD Automation"],
  ["04", "VALIDATION & INTEGRATION", "流程驗證、例外處理與結果確認"],
] as const;
// These are de-identified derivatives; originals remain outside public assets.
const publicEvidenceAvailable = true;

function EvidenceImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  if (!publicEvidenceAvailable) return null;
  return <figure className={styles.evidence}><Image src={src} alt={alt} width={1600} height={900} priority={priority} sizes="(max-width: 767px) 100vw, min(88vw, 1400px)" /></figure>;
}

export function SocketStory({ project, previous, next }: Props) {
  const root = useRef<HTMLElement>(null);
  const modelShell = useRef<HTMLDivElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const motion = useRef<SocketPose>({ ...socketStart });
  const invalidateRef = useRef<() => void>(() => undefined);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = root.current;
    const shell = modelShell.current;
    if (!element || !shell) return;
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      const reduced = Boolean(context.conditions?.reduced);
      const ctx = gsap.context(() => {
        const contextSection = element.querySelector<HTMLElement>("[data-socket-stage='context']");
        const cadModel = element.querySelector<HTMLElement>("[data-socket-stage='cad-model']");
        const output = element.querySelector<HTMLElement>("[data-socket-stage='output']");
        if (!contextSection || !cadModel || !output) return;
        Object.assign(motion.current, reduced ? socketStoryPoses.vertical : socketStart);
        gsap.set(shell, { autoAlpha: 1 });
        gsap.set(labels.current, { autoAlpha: reduced ? 1 : 0, y: reduced ? 0 : 12 });
        if (reduced) return;
        gsap.to(motion.current, { ry: 0.1, rx: -0.02, duration: 1, ease: "none", onUpdate: () => invalidateRef.current(), scrollTrigger: { trigger: contextSection, start: "top bottom", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true } });
        gsap.to(shell, { autoAlpha: 0, duration: 0.2, scrollTrigger: { trigger: contextSection, start: "bottom 55%", toggleActions: "play none none reverse" } });
        gsap.to(shell, { autoAlpha: 1, duration: 0.28, scrollTrigger: { trigger: cadModel, start: "top 65%", toggleActions: "play none none reverse" } });
        gsap.to(motion.current, { ...socketStoryPoses.cad, duration: 1, ease: "sine.inOut", onUpdate: () => invalidateRef.current(), scrollTrigger: { trigger: cadModel, start: "top 75%", end: "center center", scrub: 0.7, invalidateOnRefresh: true } });
        const explode = gsap.timeline({ onUpdate: () => invalidateRef.current(), scrollTrigger: { trigger: output, start: "top 70%", end: "bottom 25%", scrub: 0.8, invalidateOnRefresh: true } });
        explode.to(motion.current, { ...socketStoryPoses.assembled, duration: 0.45, ease: "none" })
          .to(motion.current, { ...socketStoryPoses.horizontal, duration: 0.85, ease: "none" })
          .to(motion.current, { ...socketStoryPoses.vertical, duration: 0.85, ease: "none" })
          .to(labels.current, { autoAlpha: 1, y: 0, duration: 0.2 }, 1.95);
        gsap.to(shell, { autoAlpha: 0, duration: 0.2, scrollTrigger: { trigger: output, start: "bottom 18%", toggleActions: "play none none reverse" } });
      }, element);
      return () => ctx.revert();
    });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(frame); media.revert(); invalidateRef.current = () => undefined; };
  }, []);

  return <main id="main" ref={root} className={styles.story}>
    <div ref={modelShell} className={styles.modelShell} aria-label="Socket 組合件 3D 模型"><SocketModelViewer motion={motion} invalidateRef={invalidateRef} /></div>

    <section className={`${styles.section} ${styles.hero}`}>
      <div className={`${styles.container} ${styles.heroGrid}`}><div><p className={styles.eyebrow}>SOCKET AUTOMATION CASE STUDY</p><h1>{project.title}</h1><p className={styles.subtitle}>Socket Design Automation System</p><p className={styles.lead}>From engineering input<br />to validated CAD output.</p><p className={styles.discipline}>Engineering Project<br />× Mechanical Design<br />× Automation</p></div><div aria-hidden="true" /></div>
    </section>

    <section data-socket-stage="context" className={`${styles.section} ${styles.contextSection}`}>
      <div className={`${styles.container} ${styles.contextGrid}`}><div><p className={styles.eyebrow}>01 ／ ENGINEERING CONTEXT</p><h2>FROM REQUIREMENT<br />TO DESIGN INPUT</h2><p className={styles.sectionIntro}>Socket 設計並不是從 CAD 開始，而是從測試需求與工程條件逐步轉換為設計輸入。</p><div className={styles.contextFlow}><div><b>REQUIREMENT</b><span>Test Requirement<br />Product / Test Condition</span></div><i>↓</i><div><b>ENGINEERING DECISION</b><span>Engineering Input<br />Probe Selection</span></div><i>↓</i><div><b>PHYSICAL DESIGN</b><span>Socket / Lid Structure</span></div></div></div><div aria-hidden="true" /></div>
    </section>

    <section className={styles.section}>
      <div className={styles.container}><p className={styles.eyebrow}>02 ／ ENGINEER IN THE LOOP</p><h2>ENGINEER IN THE LOOP</h2><p className={styles.sectionIntro}>工程師確認設計輸入後，才進入計算與 CAD 自動化。</p><EvidenceImage src="/images/socket-public/socket-basic-data.png" alt="Socket 自動化系統的基本資料操作介面" priority /><div className={styles.annotations}><span><b>01</b>CASE / BASIC DATA</span><span><b>02</b>DEVICE</span><span><b>03</b>PROBE</span><span><b>04</b>ENGINEER REVIEW</span></div><div className={styles.reviewSequence}><article><p>PROBE PARAMETERS</p><span>Probe geometry and design inputs.</span><EvidenceImage src="/images/socket-public/socket-probe-parameters.png" alt="Socket 探針參數介面" /></article><article><p>POD / DEVICE PARAMETERS</p><span>Device geometry and structural inputs.</span><EvidenceImage src="/images/socket-public/socket-device-parameters.png" alt="Socket Device 參數介面" /></article></div><p className={styles.confirm}><b>F4</b> CONFIRM <span>Engineering inputs reviewed.</span></p></div>
    </section>

    <section className={styles.section}>
      <div className={styles.container}><p className={styles.eyebrow}>03 ／ F5 — ENGINEERING CALCULATION</p><h2>F5<br />ENGINEERING CALCULATION</h2><p className={styles.sectionIntro}>確認後，工程輸入進入計算流程。</p><div className={styles.compactLogic}><span>PROBE</span><i>＋</i><span>DEVICE</span><i>＋</i><span>ENGINEERING INPUT</span><b>↓</b><strong>F5<br />EXCEL-BASED CALCULATION ENGINE</strong><b>↓</b><span>GP / MP / RT / DEVICE</span></div><EvidenceImage src="/images/socket-public/socket-calculation-result.png" alt="Socket 工程計算結果介面" /><p className={styles.evidenceCaption}>CALCULATION RESULT ／ GP / MP / RT / DEVICE ／ PARAMETER → RESULT → CAD TARGET</p></div>
    </section>

    <section className={styles.section}>
      <div className={styles.container}><p className={styles.eyebrow}>04 ／ F6 — CAD AUTOMATION</p><h2>F6<br />CAD AUTOMATION</h2><p className={styles.sectionIntro}>計算結果直接進入 CAD 自動化流程。</p><div className={styles.cadLogic}><span>CALCULATION RESULT</span><i>↓</i><b>F6</b><i>↓</i><span>SOLIDWORKS AUTOMATION</span><i>↓</i><span>CAD UPDATE</span></div><EvidenceImage src="/images/socket-public/socket-cad-integration.png" alt="Socket SolidWorks 與自動化系統整合畫面" /><div className={styles.cadSequence}><span>DEVICE</span><i>→</i><span>GP</span><i>→</i><span>MP</span><i>→</i><span>RT</span><i>→</i><span>ASSEMBLY REBUILD</span><small>REFRESH / REBUILD / SAVE</small></div></div>
    </section>

    <section data-socket-stage="cad-model" className={`${styles.section} ${styles.cadModelStage}`}><div className={styles.container}><p className={styles.eyebrow}>REAL CAD → INTERACTIVE ENGINEERING MODEL</p><h2>FROM CALCULATED PARAMETERS<br />TO PHYSICAL GEOMETRY</h2><p className={styles.sectionIntro}>作品集中的 3D 模型用於說明組合件結構與自動化結果，不代表另一套設計。</p></div></section>

    <section data-socket-stage="output" className={`${styles.section} ${styles.outputSection}`}><div className={`${styles.container} ${styles.outputSticky}`}><div><p className={styles.eyebrow}>05 ／ ENGINEERING OUTPUT</p><h2>ENGINEERING OUTPUT</h2><p className={styles.sectionIntro}>From calculated parameters to a rebuilt assembly.</p><p className={styles.assembled}>ASSEMBLED STATE</p></div><div className={styles.explodeSteps}><span>ASSEMBLED</span><i>↓</i><span>HORIZONTAL EXPLODED VIEW</span><i>↓</i><span>VERTICAL EXPLODED VIEW</span></div><div ref={labels} className={styles.partLabels}>{socketPartLabels.map((label, index) => <span key={label}><b>{String(index + 1).padStart(2, "0")}</b>{label}<i /></span>)}</div><div className={styles.validation}><b>VALIDATION</b><span>PASS<small>✓ Archive</small></span><span>FAIL<small>→ Error Log</small></span></div></div></section>

    <section className={`${styles.section} ${styles.contributionSection}`}><div className={styles.container}><p className={styles.eyebrow}>06 ／ MY CONTRIBUTION</p><h2>MY CONTRIBUTION</h2><p className={styles.contributionLead}>FROM ENGINEERING LOGIC<br />TO AN INTEGRATED DESIGN WORKFLOW.</p><div className={styles.responsibilities}>{responsibilities.map(([number, title, description]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

    <nav aria-label="專案切換" className={styles.projectNav}><Link href={`/projects/${previous.slug}/`}><small>← {brand.labels.previous}</small><strong>{previous.title}</strong></Link><Link href={`/projects/${next.slug}/`}><small>{brand.labels.next} →</small><strong>{next.title}</strong></Link></nav><div className={styles.back}><Link href="/#projects">← {brand.labels.back}</Link></div>
  </main>;
}
