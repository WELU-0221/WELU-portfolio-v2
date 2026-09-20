import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { brand } from "@/data/portfolio";
import { CaseMotion } from "@/components/portfolio/case-motion";
import { SocketModelViewer } from "@/components/portfolio/socket-model-viewer";

interface SocketProjectDetailProps { project: Project; previous: Project; next: Project }

export function SocketProjectDetail({ project, previous, next }: SocketProjectDetailProps) {
  return <main id="main"><CaseMotion>
    <header className="mx-auto flex min-h-[68svh] max-w-content flex-col justify-center px-gutter py-12 md:min-h-[72svh]">
      <Link className="mb-12 inline-block py-3 text-sm text-muted hover:text-accent" href="/#projects">← {brand.labels.back}</Link>
      <div data-reveal>
        <p className="font-mono text-xs tracking-widest text-accent">CASE STUDY / 01</p>
        <h1 className="mt-6 max-w-5xl text-title leading-relaxed tracking-tight">{project.title}</h1>
        <p className="mt-4 text-lg text-muted">{project.english}</p>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">為工程師的實際操作，設計自動化流程。</p>
        <Link href="#socket-assembly" className="mt-10 inline-flex items-center gap-3 border-b border-foreground py-3 text-sm">
          進入互動展示 <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </header>

    <section id="socket-assembly" aria-label="Socket Assembly 沉浸式流程展示" className="border-y border-line">
      <div data-socket-scene className="relative h-svh overflow-hidden bg-surface">
        <SocketModelViewer />
      </div>
    </section>

    <section className="mx-auto max-w-content px-gutter">
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-line py-8">
        <p className="max-w-2xl text-sm leading-relaxed text-muted">工程師掌握最終判斷，自動化負責串起案件、計算與模型。</p>
        <p className="font-mono text-xs tracking-wide text-muted">C# · WinForms · EXCEL · SOLIDWORKS API</p>
      </div>
      <section aria-labelledby="socket-modules-title" className="border-b border-line py-10">
        <div className="grid gap-5 md:grid-cols-3"><div><p className="font-mono text-xs tracking-widest text-accent">CORE MODULES</p><h2 id="socket-modules-title" className="mt-3 text-xl">Socket 工程自動化模組</h2></div><p className="text-sm leading-loose text-muted md:col-span-2">Device 設計自動化、BS 自動化模組，以及 Socket Design Rule / Formula Engine 都屬於本系統的子模組，並非獨立的主要專案。</p></div>
        <ul className="mt-7 grid gap-3 text-sm md:grid-cols-3"><li className="border-t border-line pt-3">Device 設計自動化</li><li className="border-t border-line pt-3">BS 自動化模組</li><li className="border-t border-line pt-3">Socket Design Rule / Formula Engine</li></ul>
      </section>      <nav aria-label="專案切換" className="grid border-b border-foreground py-8 md:grid-cols-2">
        <Link href={`/projects/${previous.slug}/`} className="py-4 md:pr-8">
          <span className="text-sm text-muted">← {brand.labels.previous}</span>
          <p className="mt-3 text-lg">{previous.title}</p>
        </Link>
        <Link href={`/projects/${next.slug}/`} className="border-t border-line py-4 md:border-t-0 md:border-l md:pl-8 md:text-right">
          <span className="text-sm text-muted">{brand.labels.next} →</span>
          <p className="mt-3 text-lg">{next.title}</p>
        </Link>
      </nav>
      <Link className="mb-12 inline-block border-b border-foreground py-3 text-sm" href="/#projects">← {brand.labels.back}</Link>
    </section>
  </CaseMotion></main>;
}