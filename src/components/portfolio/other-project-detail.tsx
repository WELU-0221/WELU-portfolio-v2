import Link from "next/link";
import type { OtherProject } from "@/data/other-projects";
import { CaseMotion } from "./case-motion";
import { CaseSection } from "./case-sections";

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
      <CaseSection number="02" title="Technology"><ul className="flex flex-wrap gap-3">{project.tech.map(tech => <li className="border border-line px-5 py-2 text-sm" key={tech}>{tech}</li>)}</ul></CaseSection>
      <CaseSection number="03" title="Public Project Scope"><p>此頁僅呈現可公開的工具範圍與工程角色；未列出內部資料、客戶資訊、尺寸、規格值或專案機密。</p></CaseSection>
      <CaseSection number="04" title="Details / 待補內容"><p className="text-muted">工程流程、畫面紀錄與可公開成果將依專案資料逐步補充。</p></CaseSection>
      <nav aria-label="其他專案切換" className="grid border-t border-foreground py-10 md:grid-cols-2">
        <Link href={`/projects/${previous.slug}/`} className="py-5 transition-colors hover:text-accent md:pr-8"><span className="text-sm text-muted">← Previous Project</span><p className="mt-4 text-xl">{previous.title}</p><p className="mt-1 text-sm text-muted">{previous.english}</p></Link>
        <Link href={`/projects/${next.slug}/`} className="border-t border-line py-5 transition-colors hover:text-accent md:border-t-0 md:border-l md:pl-8 md:text-right"><span className="text-sm text-muted">Next Project →</span><p className="mt-4 text-xl">{next.title}</p><p className="mt-1 text-sm text-muted">{next.english}</p></Link>
      </nav>
      <Link className="mb-16 inline-block border-b border-foreground py-3 text-sm" href="/#other-projects">← Back to Other Projects</Link>
    </div>
  </CaseMotion></main>;
}
