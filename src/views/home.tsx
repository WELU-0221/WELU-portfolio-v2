import Link from "next/link";
import { brand, projects } from "@/data/portfolio";
import { otherProjects } from "@/data/other-projects";
import { OtherProjects } from "@/components/portfolio/other-projects";
import { ProjectIndex } from "@/components/portfolio/project-index";
export const HomeView = () => <main id="main">
  <section aria-labelledby="brand-title" className="mx-auto max-w-content px-gutter pt-12 pb-16 md:pt-16 md:pb-24">
    <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted"><p>Independent engineering portfolio</p><p>Portfolio index — 01 / 05</p></div>
    <h1 id="brand-title" className="mt-5 text-display leading-display font-bold tracking-display">{brand.name}<span className="text-accent">.</span></h1>
    <div className="grid gap-8 border-t border-line pt-8 md:grid-cols-2">
      <p className="max-w-sm text-sm leading-loose text-muted">{brand.positioning}</p>
      <div><p className="text-2xl leading-relaxed md:text-3xl">{brand.statement.map(line => <span key={line} className="block">{line}</span>)}</p>
        <Link href="#projects" className="mt-8 inline-flex items-center gap-10 border-b border-foreground py-3 text-sm">Explore selected projects <span aria-hidden="true">↓</span></Link>
      </div>
    </div>
  </section>
  <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-content px-gutter pb-section">
    <div className="flex items-end justify-between gap-5 border-b border-foreground pb-6"><h2 id="projects-title" className="text-heading leading-display tracking-tight">{brand.labels.projects}</h2><span className="font-mono text-xs text-muted">INDEX / 05</span></div>
    <ProjectIndex projects={projects.filter(project => project.slug !== "device-automation")} />
  </section>
  <section id="other-projects" aria-labelledby="other-projects-title" className="mx-auto max-w-content px-gutter pb-section">
    <div className="border-b border-foreground pb-6 md:flex md:items-end md:justify-between md:gap-5"><div><p className="font-mono text-xs tracking-widest text-accent">OTHER WORKS</p><h2 id="other-projects-title" className="mt-3 text-heading leading-display tracking-tight">其他專案</h2><p className="mt-4 max-w-xl text-sm leading-loose text-muted">延伸工程工具、查詢系統、專案管理與早期實作。</p></div><p className="mt-5 max-w-xs text-sm leading-loose text-muted md:mt-0 md:text-right">Engineering tools, supporting systems, project management, and early works.</p></div>
    <OtherProjects projects={otherProjects} />
  </section>  <section id="about" aria-labelledby="about-title" className="border-y border-line bg-surface">
    <div className="mx-auto grid max-w-content gap-10 px-gutter py-section md:grid-cols-3">
      <h2 id="about-title" className="text-sm">01 — About</h2>
      <div className="md:col-span-2"><p className="text-heading leading-relaxed tracking-tight">設計不只是一個模型，<br />也是一套思考流程。</p><p className="mt-8 max-w-2xl text-base leading-loose text-muted">{brand.about}</p>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm"><span>Mechanical Design</span><span>Parametric Modeling</span><span>Automation</span></div></div>
    </div>
  </section>
  <section id="contact" aria-labelledby="contact-title" className="mx-auto grid max-w-content gap-10 px-gutter py-section md:grid-cols-3">
    <h2 id="contact-title" className="text-sm">02 — Contact</h2>
    <div className="md:col-span-2"><p className="text-heading leading-relaxed tracking-tight">{brand.contact}</p>
      {brand.email ? <a className="mt-8 inline-block border-b border-foreground py-3" href={`mailto:${brand.email}`}>{brand.email} ↗</a> : <p className="mt-8 text-sm text-muted">公開聯絡方式待補充。</p>}
    </div>
  </section>
</main>;
