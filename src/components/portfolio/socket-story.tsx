"use client";

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
const requirementFlow = ["客戶需求", "測試條件／產品類別", "工程分類", "工程輸入", "針款選擇", "Socket 與 Lid 結構"];
const blueprintFlow = ["案件資料", "工程輸入", "探針／Device", "工程計算", "CAD 自動化", "驗證", "輸出"];
const summaryFlow = ["需求", "工程輸入", "人工確認", "工程計算", "CAD 自動化", "驗證", "輸出"];
const contributionItems = [
  ["01", "流程定義", "工程需求與自動化流程拆解"],
  ["02", "工程邏輯", "將可標準化的工程判斷整理為系統流程"],
  ["03", "自動化整合", "整合 UI、計算流程與 CAD Automation"],
  ["04", "CAD 自動化", "SolidWorks 自動化流程與模型更新整合"],
  ["05", "驗證", "流程驗證、錯誤處理與結果確認"],
  ["06", "系統整合", "讓工程資料、計算與 CAD 成為連續工作流程"],
] as const;

function RealUISlot() {
  const isDevelopment = process.env.NODE_ENV !== "production";
  return <div className={styles.uiFrame} aria-label="自動化操作介面預留區">
    {isDevelopment && <span>REAL AUTOMATION UI — TO BE ADDED</span>}
  </div>;
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
    media.add({ desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)", mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      const reduce = Boolean(context.conditions?.reduced);
      const ctx = gsap.context(() => {
        const hero = element.querySelector<HTMLElement>("[data-chapter='hero']");
        const cad = element.querySelector<HTMLElement>("[data-chapter='cad']");
        const output = element.querySelector<HTMLElement>("[data-chapter='output']");
        if (!hero || !cad || !output) return;
        Object.assign(motion.current, socketStart);
        gsap.set(shell, { autoAlpha: 1 });
        gsap.set(labels.current, { autoAlpha: 0, y: 12 });

        if (!reduce) {
          gsap.to(motion.current, { ry: 0.14, rx: -0.02, duration: 1, ease: "none", onUpdate: () => invalidateRef.current(), scrollTrigger: { trigger: hero, start: "top bottom", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true } });
          gsap.to(shell, { autoAlpha: 0, duration: 0.2, scrollTrigger: { trigger: hero, start: "bottom 58%", toggleActions: "play none none reverse" } });
          gsap.to(shell, { autoAlpha: 1, duration: 0.25, scrollTrigger: { trigger: cad, start: "top 65%", toggleActions: "play none none reverse" } });
          gsap.to(motion.current, { ...socketStoryPoses.cad, duration: 1, ease: "sine.inOut", onUpdate: () => invalidateRef.current(), scrollTrigger: { trigger: cad, start: "top 72%", end: "center center", scrub: 0.7, invalidateOnRefresh: true } });
          gsap.to(motion.current, { ...socketStoryPoses.assembled, duration: 1, ease: "sine.inOut", onUpdate: () => invalidateRef.current(), scrollTrigger: { trigger: output, start: "top 75%", end: "top 35%", scrub: 0.7, invalidateOnRefresh: true } });
          const explode = gsap.timeline({ onUpdate: () => invalidateRef.current(), scrollTrigger: { trigger: output, start: "top 35%", end: "bottom 30%", scrub: 0.8, invalidateOnRefresh: true } });
          explode.to(motion.current, { ...socketStoryPoses.horizontal, duration: 1, ease: "none" })
            .to(motion.current, { ...socketStoryPoses.vertical, duration: 1, ease: "none" })
            .to(labels.current, { autoAlpha: 1, y: 0, duration: 0.22 }, 1.72);
          gsap.to(shell, { autoAlpha: 0, duration: 0.2, scrollTrigger: { trigger: output, start: "bottom 26%", toggleActions: "play none none reverse" } });
        } else {
          Object.assign(motion.current, socketStoryPoses.vertical);
          gsap.set(labels.current, { autoAlpha: 1, y: 0 });
        }
      }, element);
      return () => ctx.revert();
    });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(frame); media.revert(); invalidateRef.current = () => undefined; };
  }, []);

  return <main id="main" ref={root} className={styles.story}>
    <div ref={modelShell} className={styles.modelShell} aria-label="Socket 組合件 3D 模型"><SocketModelViewer motion={motion} invalidateRef={invalidateRef} /></div>

    <section data-chapter="hero" className={`${styles.section} ${styles.hero}`}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div><p className={styles.eyebrow}>01 ／ SOCKET 設計自動化系統</p><h1>Socket Design<br />Automation System</h1><p className={styles.chinese}>{project.title}</p><p className={styles.lead}>From engineering input<br />to validated CAD output.</p><Link href="#requirement" className={styles.textLink}>查看工程流程 ↓</Link></div>
        <div aria-hidden="true" />
      </div>
    </section>

    <section id="requirement" className={styles.section}>
      <div className={styles.container}><p className={styles.eyebrow}>02 ／ 從需求到設計輸入</p><h2>FROM REQUIREMENT<br />TO DESIGN INPUT</h2><p className={styles.sectionIntro}>Socket 設計並不是從 CAD 開始，而是從測試需求與工程條件逐步轉換為設計輸入。</p><div className={styles.requirementFlow}>{requirementFlow.map((item, index) => <div key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span>{index < requirementFlow.length - 1 && <i>→</i>}</div>)}</div><div className={styles.blueprint}><p>公開版系統藍圖</p>{blueprintFlow.map((item, index) => <span key={item}>{item}{index < blueprintFlow.length - 1 && <i>→</i>}</span>)}</div></div>
    </section>

    <section className={`${styles.section} ${styles.loopSection}`}>
      <div className={styles.container}><p className={styles.eyebrow}>03 ／ 工程師確認</p><h2>ENGINEER IN THE LOOP</h2><p className={styles.sectionIntro}>工程師確認案件資料、探針、POD／Device 與 Final Value 後，才進入計算與 CAD 自動化。</p><div className={styles.uiStory}><RealUISlot /><div className={styles.uiAnnotations}><span><b>01</b>案件資料</span><span><b>02</b>探針</span><span><b>03</b>POD／Device</span><span><b>04</b>工程師確認</span></div></div><div className={styles.uiActions}><span><b>F4</b>確認</span><span><b>F5</b>計算</span><span><b>F6</b>套用至 SolidWorks</span></div><p className={styles.caption}>Engineer reviews the engineering inputs before calculation and CAD automation.</p></div>
    </section>

    <section className={styles.section}>
      <div className={styles.container}><p className={styles.eyebrow}>04 ／ 工程計算</p><h2>ENGINEERING CALCULATION</h2><p className={styles.sectionIntro}>工程輸入轉換為設計參數。</p><div className={styles.calculationFlow}><div><b>輸入</b><span>Probe</span><span>POD</span><span>Device</span></div><i>→</i><strong>工程計算<br />引擎</strong><i>→</i><div><b>輸出</b><span>GP</span><span>MP</span><span>RT</span><span>Device</span></div></div><div className={styles.fiveLogic}><b>F5</b><span>工程計算</span><i>↓</i><span>UI 輸入</span><i>↓</i><span>Excel-based Calculation Engine</span><i>↓</i><span>Full Recalculation</span><i>↓</i><span>工程結果</span></div><p className={styles.caption}>Engineering formulas and internal parameters are intentionally abstracted.</p></div>
    </section>

    <section data-chapter="cad" className={`${styles.section} ${styles.cadSection}`}>
      <div className={styles.container}><div className={styles.cadCopy}><p className={styles.eyebrow}>05 ／ CAD 自動化</p><h2>FROM CALCULATION<br />TO PHYSICAL GEOMETRY</h2><p className={styles.sectionIntro}>計算結果透過 SolidWorks 自動化，更新模型並重建組合件。</p></div><div className={styles.cadPath}><b>F6</b><i>↓</i><span>SolidWorks Automation</span><i>↓</i><span>DEVICE</span><i>↓</i><span>GP</span><i>↓</i><span>MP</span><i>↓</i><span>RT</span><i>↓</i><span>Assembly Refresh／Rebuild／Save／Validate</span></div><div className={styles.moduleLine}><span>DEVICE</span><span>GP</span><span>MP</span><span>RT</span></div></div>
    </section>

    <section data-chapter="output" className={`${styles.section} ${styles.outputSection}`}>
      <div className={`${styles.container} ${styles.outputSticky}`}><div className={styles.outputCopy}><p className={styles.eyebrow}>06 ／ 工程輸出</p><h2>ENGINEERING OUTPUT</h2><p className={styles.sectionIntro}>From calculated parameters to a rebuilt 3D assembly.</p><div className={styles.rebuilt}><b>ASSEMBLY REBUILT</b>{["DEVICE", "GP", "MP", "RT", "ASSEMBLY"].map(item => <span key={item}>{item}<i>✓</i></span>)}</div></div><div className={styles.explodeNote}><span>完整組合</span><i>→</i><span>水平展開</span><i>→</i><span>垂直爆炸視圖</span></div><div ref={labels} className={styles.partLabels}>{socketPartLabels.map((label, index) => <span key={label}><b>{String(index + 1).padStart(2, "0")}</b>{label}<i /></span>)}</div><div className={styles.validationLogic}><b>驗證</b><span>通過<small>封存</small></span><span>失敗<small>紀錄</small></span></div></div>
    </section>

    <section className={`${styles.section} ${styles.summarySection}`}>
      <div className={styles.container}><p className={styles.eyebrow}>07 ／ 系統總結與責任範圍</p><h2>FROM REQUIREMENT<br />TO OUTPUT</h2><div className={styles.summaryFlow}>{summaryFlow.map((item, index) => <span key={item}>{item}{index < summaryFlow.length - 1 && <i>→</i>}</span>)}</div><p className={styles.conclusion}>FROM ENGINEERING REQUIREMENTS<br />TO A REPEATABLE DESIGN WORKFLOW.</p><p className={styles.chineseConclusion}>把工程需求，轉化成可管理、可自動化、可落地的設計流程。</p><div className={styles.contributionGrid}>{contributionItems.map(([number, title, description]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{description}</p></article>)}</div></div>
    </section>

    <nav aria-label="專案切換" className={styles.projectNav}><Link href={`/projects/${previous.slug}/`}><small>← {brand.labels.previous}</small><strong>{previous.title}</strong></Link><Link href={`/projects/${next.slug}/`}><small>{brand.labels.next} →</small><strong>{next.title}</strong></Link></nav>
    <div className={styles.back}><Link href="/#projects">← {brand.labels.back}</Link></div>
  </main>;
}

// TODO: SOLIDWORKS_BEFORE_IMAGE
// TODO: SOLIDWORKS_AFTER_IMAGE
// TODO: TODO_OUTPUT_LOG_EVIDENCE
// TODO: TODO_MY_CONTRIBUTION
