import Link from "next/link";
import type { OtherProject } from "@/data/other-projects";
import { CaseMotion } from "./case-motion";
import { CaseSection } from "./case-sections";

function EngineeringProcess({ stages }: { stages: OtherProject["process"] }) {
  return <section className="border-t border-line py-12 md:py-16" aria-labelledby="engineering-process-title">
    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3"><h2 id="engineering-process-title" className="text-heading leading-display tracking-tight">Engineering Process</h2><span className="font-mono text-xs tracking-widest text-accent">02 / PROJECT PROCESS</span></div>
    <ol className={`grid gap-0 ${stages.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
      {stages.map((stage, index) => <li key={stage.label} className="relative border-t border-line py-5 md:min-h-44 md:pr-6">
        <span className="font-mono text-xs tracking-widest text-accent">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-5 text-sm tracking-wide">{stage.label}</h3><p className="mt-3 max-w-xs text-sm leading-loose text-muted">{stage.detail}</p>
        {index < stages.length - 1 && <i aria-hidden="true" className="absolute right-0 top-6 hidden translate-x-1/2 bg-background px-2 text-xs not-italic text-secondary md:block">→</i>}
        {index < stages.length - 1 && <i aria-hidden="true" className="mt-5 block font-normal not-italic text-secondary md:hidden">↓</i>}
      </li>)}
    </ol>
  </section>;
}

function Contribution({ items }: { items: OtherProject["contribution"] }) {
  return <section className="border-t border-line py-12 md:py-16" aria-labelledby="contribution-title">
    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3"><h2 id="contribution-title" className="text-heading leading-display tracking-tight">我的貢獻<br /><span className="text-muted">My Contribution</span></h2><span className="font-mono text-xs tracking-widest text-accent">04 / RESPONSIBILITY</span></div>
    <ol className={`grid border-t border-foreground ${items.length === 2 ? "md:grid-cols-2" : items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
      {items.map((item, index) => <li key={item.title} className="min-h-40 border-b border-line py-5 md:pr-5 [&+li]:md:border-l [&+li]:md:border-line [&+li]:md:pl-5"><span className="font-mono text-xs tracking-widest text-accent">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-5 text-sm tracking-wide">{item.title}</h3><p className="mt-3 max-w-xs text-sm leading-loose text-muted">{item.detail}</p></li>)}
    </ol>
  </section>;
}

export function OtherProjectDetail({ project, previous, next }: { project: OtherProject; previous: OtherProject; next: OtherProject }) {
  return <main id="main"><CaseMotion>
    <header className="mx-auto max-w-content px-gutter pt-10 pb-16 md:pt-16 md:pb-20">
      <Link className="inline-block py-3 text-sm text-muted hover:text-accent" href="/#other-projects">← Back to Other Projects</Link>
      <div className="mt-10 flex flex-wrap justify-between gap-4 font-mono text-xs tracking-widest text-muted"><p>OTHER PROJECT / {project.number}</p>{project.tag && <p>{project.tag}</p>}</div>
      <h1 className="mt-8 max-w-5xl text-title leading-relaxed tracking-tight">{project.title}</h1>
      <p className="mt-4 text-lg text-muted">{project.english}</p>
      <p className="mt-10 max-w-2xl leading-loose">{project.description}</p>
    </header>
    <section data-scene className="flex min-h-[62svh] items-center justify-center overflow-hidden bg-surface px-gutter py-16" aria-label={`${project.title} project visual`}>
      <div data-visual className="grid aspect-[16/9] w-full max-w-4xl place-items-center border border-line bg-[linear-gradient(135deg,transparent_49.8%,var(--line)_50%,transparent_50.2%)]">
        <div className="text-center"><p className="font-mono text-xs tracking-[.25em] text-accent">{project.number}</p><p className="mt-5 text-heading tracking-tight">{project.english}</p><p className="mt-4 font-mono text-xs tracking-widest text-muted">PROJECT VISUAL / PUBLIC SCOPE</p></div>
      </div>
    </section>
    <div className="mx-auto max-w-content px-gutter">
      <CaseSection number="01" title="Overview / 專案概要"><p>{project.detail}</p></CaseSection>
      <EngineeringProcess stages={project.process} />
      <CaseSection number="03" title="Technology"><ul className="flex flex-wrap gap-3">{project.tech.map(tech => <li className="border border-line px-5 py-2 text-sm" key={tech}>{tech}</li>)}</ul></CaseSection>
      <Contribution items={project.contribution} />
      <CaseSection number="04" title="Public Project Scope"><p>此頁僅呈現可公開的工具範圍與工程角色；未列出內部資料、客戶資訊、尺寸、規格值或專案機密。</p></CaseSection>
      <CaseSection number="05" title="Details / 待補內容"><p className="text-muted">工程流程、畫面紀錄與可公開成果將依專案資料逐步補充。</p></CaseSection>
      <nav aria-label="其他專案切換" className="grid border-t border-foreground py-10 md:grid-cols-2">
        <Link href={`/projects/${previous.slug}/`} className="py-5 transition-colors hover:text-accent md:pr-8"><span className="text-sm text-muted">← Previous Project</span><p className="mt-4 text-xl">{previous.title}</p><p className="mt-1 text-sm text-muted">{previous.english}</p></Link>
        <Link href={`/projects/${next.slug}/`} className="border-t border-line py-5 transition-colors hover:text-accent md:border-t-0 md:border-l md:pl-8 md:text-right"><span className="text-sm text-muted">Next Project →</span><p className="mt-4 text-xl">{next.title}</p><p className="mt-1 text-sm text-muted">{next.english}</p></Link>
      </nav>
      <Link className="mb-16 inline-block border-b border-foreground py-3 text-sm" href="/#other-projects">← Back to Other Projects</Link>
    </div>
  </CaseMotion></main>;
}
