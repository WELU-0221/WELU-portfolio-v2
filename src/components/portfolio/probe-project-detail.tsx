import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/data/portfolio";

function DetailSection({ number, title, english, children }: { number: string; title: string; english: string; children: ReactNode }) {
  const id = `probe-${number}`;
  return <section id={id} aria-labelledby={`${id}-title`} className="grid gap-8 border-t border-line py-14 md:grid-cols-12 md:gap-10 md:py-20">
    <p className="font-mono text-xs tracking-widest text-accent md:col-span-2">{number}</p>
    <header className="md:col-span-4"><h2 id={`${id}-title`} className="text-3xl leading-tight tracking-tight md:text-4xl">{title}</h2><p className="mt-3 text-sm text-muted">{english}</p></header>
    <div className="md:col-span-6">{children}</div>
  </section>;
}

function PlaceholderList({ items }: { items: string[] }) {
  return <ul className="border-b border-line">{items.map((item, index) => <li key={item} className="grid grid-cols-[2rem_1fr] gap-4 border-t border-line py-4 text-sm text-muted"><span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span><span>{item}</span></li>)}</ul>;
}

export function ProbeProjectDetail({ project }: { project: Project }) {
  return <main id="main">
    <header className="mx-auto flex min-h-[70svh] max-w-content flex-col justify-center px-gutter py-14">
      <Link href="/#projects" className="w-fit py-3 text-sm text-muted transition-colors hover:text-accent">← Back to Projects</Link>
      <div className="mt-12 flex flex-wrap justify-between gap-4 border-b border-line pb-5 font-mono text-xs tracking-widest text-muted"><p>01 / PROJECT HERO</p><p>ENGINEERING AUTOMATION</p></div>
      <h1 className="mt-8 max-w-5xl text-title leading-relaxed tracking-tight">{project.title}</h1>
      <p className="mt-4 text-xl text-muted">{project.english}</p>
      <div className="mt-12 grid gap-6 border-t border-line pt-6 md:grid-cols-2"><p className="max-w-xl leading-loose">{project.description}</p><p className="font-mono text-xs leading-loose tracking-wider text-muted md:text-right">INFORMATION ARCHITECTURE / CONTENT PENDING</p></div>
    </header>

    <div className="mx-auto max-w-content px-gutter">
      <DetailSection number="02" title="專案概述" english="Project Overview"><div className="space-y-5 leading-loose text-muted"><p>此頁將整理探針自動化系統的輸入、工程邏輯、自動化流程，以及輸出與驗證方式。</p><p>[待補：Project background and automation objective]</p><p>[待補：Public project scope]</p></div></DetailSection>

      <DetailSection number="03" title="工程挑戰" english="Engineering Challenge"><PlaceholderList items={["[待補：Engineering problem]", "[待補：Design constraints]", "[待補：Current manual process or limitation]"]} /></DetailSection>

      <DetailSection number="04" title="我的角色" english="My Role"><div><p className="mb-6 border-l-2 border-accent pl-5 text-sm leading-loose">此區只會列出個人實際負責內容；尚未確認的工作範圍不會先行宣稱。</p><PlaceholderList items={["[待補：My responsibilities]", "[待補：Design / development scope]", "[待補：Collaboration boundary]"]} /></div></DetailSection>

      <DetailSection number="05" title="輸入與資料流" english="Input / Data Flow"><div><p className="mb-7 text-sm leading-loose text-muted">資料來源、格式與確認方式尚待整理。</p><div className="grid border-y border-line md:grid-cols-3">{["[待補：Probe input data]", "[待補：Data source / format]", "[待補：Input validation rules]"].map((item, index) => <div key={item} className="relative min-h-28 border-t border-line p-5 first:border-t-0 md:border-t-0 md:border-l md:first:border-l-0"><span className="font-mono text-xs text-accent">0{index + 1}</span><p className="mt-5 text-sm text-muted">{item}</p>{index < 2 && <span aria-hidden="true" className="absolute right-3 bottom-3 text-accent">→</span>}</div>)}</div></div></DetailSection>

      <DetailSection number="06" title="工程邏輯" english="Engineering Logic"><PlaceholderList items={["[待補：Calculation logic]", "[待補：Engineering rules]", "[待補：Manual confirmation points]", "[待補：Exception handling logic]"]} /></DetailSection>

      <DetailSection number="07" title="自動化流程" english="Automation Workflow"><div><p className="mb-7 text-sm leading-loose text-muted">流程節點會在實際操作方式確認後補充。</p><PlaceholderList items={["[待補：Automation trigger]", "[待補：Processing steps]", "[待補：System interaction]", "[待補：Completion condition]"]} /></div></DetailSection>

      <DetailSection number="08" title="輸出與驗證" english="Output / Validation"><PlaceholderList items={["[待補：Output format]", "[待補：Validation method]", "[待補：Pass / fail criteria]", "[待補：Error log or traceability]"]} /></DetailSection>

      <DetailSection number="09" title="技術棧" english="Tech Stack"><div className="flex flex-wrap gap-3">{["[待補：Programming language]", "[待補：UI / application framework]", "[待補：Data source]", "[待補：Engineering software / API]"].map(item => <span key={item} className="border border-line px-4 py-3 text-sm text-muted">{item}</span>)}</div></DetailSection>

      <DetailSection number="10" title="成果與學習" english="Result / Learning"><div className="space-y-5 leading-loose text-muted"><p>[待補：Verified project result]</p><p>[待補：Engineering learning]</p><p className="border-l-2 border-line pl-5 text-sm">本頁目前不列出尚未確認的效率、成功率、精度或其他量化成果。</p></div></DetailSection>

      <div className="border-t border-foreground py-12"><Link href="/#projects" className="inline-block border-b border-foreground py-3 text-sm transition-colors hover:text-accent">← Back to Projects</Link></div>
    </div>
  </main>;
}
