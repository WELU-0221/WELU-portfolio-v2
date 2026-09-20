import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { RobotStory } from "./robot-story";

export function RobotProjectDetail({ previous, next }: { previous: Project; next: Project }) {
  return <main id="main">
    <RobotStory />
    <div className="mx-auto max-w-content px-gutter">
      <section className="border-t border-line py-16" aria-labelledby="robot-technologies"><p className="mb-5 font-mono text-xs text-accent">TECHNOLOGIES / 我的設計與研究範圍</p><h2 id="robot-technologies" className="text-heading">Design meets research.</h2><p className="mt-6 max-w-2xl leading-loose text-muted">SolidWorks · Mechanical / Assembly Design · Hardware Placement · Spectrogram · Beat / Tempo / Rhythm Research</p><p className="mt-5 text-sm text-muted">整體團隊系統的元件與工具，請見上方 Project System / Team Components。</p></section>
      <nav aria-label="專案切換" className="grid border-t border-foreground py-10 md:grid-cols-2">
        <Link href={`/projects/${previous.slug}/`} className="group py-6 md:pr-10"><span className="inline-block font-mono text-xs tracking-widest text-muted transition-transform duration-300 group-hover:-translate-x-1">← Previous Project</span><p className="mt-5 text-xl transition-transform duration-300 group-hover:translate-x-1">{previous.title}</p><p className="mt-2 text-sm text-muted">{previous.english}</p></Link>
        <Link href={`/projects/${next.slug}/`} className="group border-t border-line py-6 md:border-t-0 md:border-l md:pl-10 md:text-right"><span className="inline-block font-mono text-xs tracking-widest text-muted transition-transform duration-300 group-hover:translate-x-1">Next Project →</span><p className="mt-5 text-xl transition-transform duration-300 group-hover:-translate-x-1">{next.title}</p><p className="mt-2 text-sm text-muted">{next.english}</p></Link>
      </nav>
      <Link href="/#projects" className="mb-16 inline-block border-b border-foreground py-3 text-sm">← Back to Projects</Link>
    </div>
  </main>;
}
