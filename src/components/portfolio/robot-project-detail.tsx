import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { RobotStory } from "./robot-story";

export function RobotProjectDetail({ previous, next }: { previous: Project; next: Project }) {
  return <main id="main">
    <RobotStory />
    <div className="mx-auto max-w-content px-gutter">
      <section className="border-t border-line py-16" aria-labelledby="robot-technologies"><p className="mb-5 font-mono text-xs text-accent">TECHNOLOGIES / 我的設計與研究範圍</p><h2 id="robot-technologies" className="text-heading">Design meets research.</h2><p className="mt-6 max-w-2xl leading-loose text-muted">SolidWorks · Mechanical / Assembly Design · Hardware Placement · Spectrogram · Beat / Tempo / Rhythm Research</p><p className="mt-5 text-sm text-muted">整體團隊系統的元件與工具，請見上方 Project System / Team Components。</p></section>
      <section className="border-t border-line py-16" aria-labelledby="robot-learning"><p className="mb-5 font-mono text-xs text-accent">RESULT / LEARNING</p><h2 id="robot-learning" className="text-heading">在跨領域之間，建立連結。</h2><p className="mt-6 max-w-2xl leading-loose text-muted">這段參與涵蓋機構與組裝設計、硬體配置，以及音樂特徵與節奏研究。頁面呈現設計與探索的範圍；完整系統的整合與驗證屬於團隊專題工作。</p></section>
      <nav aria-label="專案切換" className="grid border-t border-foreground py-10 md:grid-cols-2"><Link href={`/projects/${previous.slug}/`} className="py-5 md:pr-8"><span className="text-sm text-muted">← Previous Project</span><p className="mt-4 text-xl">{previous.title}</p></Link><Link href={`/projects/${next.slug}/`} className="border-t border-line py-5 md:border-t-0 md:border-l md:pl-8 md:text-right"><span className="text-sm text-muted">Next Project →</span><p className="mt-4 text-xl">{next.title}</p></Link></nav>
      <Link href="/#projects" className="mb-16 inline-block border-b border-foreground py-3 text-sm">← Back to Projects</Link>
    </div>
  </main>;
}