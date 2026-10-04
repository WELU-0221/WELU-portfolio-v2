import Link from "next/link";
import type { OtherWork } from "@/data/other-projects";

const groupTitles: Record<OtherWork["group"], string> = { "AUTOMATION MODULES": "Automation Modules", "ENGINEERING TOOLS": "Engineering Tools", "PROJECT / DEVELOPMENT": "Project / Development", "EARLY WORK": "Early Work" };

function OtherProjectCard({ project, index }: { project: OtherWork; index: number }) {
  return <li className="border-t border-line py-7 md:px-5">
    <article className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 font-mono text-xs tracking-widest"><span className="text-accent">{String(index + 1).padStart(2, "0")}</span><span className="text-right text-muted">{project.type}</span></div>
      <h3 className="mt-6 text-xl leading-relaxed font-medium">{project.title}</h3>
      <p className="mt-1 text-sm text-muted">{project.english}</p>
      <p className="mt-5 text-sm leading-relaxed text-muted">{project.description}</p>
      {project.parent && <p className="mt-4 font-mono text-[.65rem] tracking-widest text-accent">{project.parent}</p>}
      <div className="mt-5 border-y border-line py-3 font-mono text-[.62rem] leading-loose tracking-wide text-muted">{project.process.map((step, stepIndex) => <span key={step}>{step}{stepIndex < project.process.length - 1 && <i className="px-1 not-italic text-accent">→</i>}</span>)}</div>
      {project.tech && <ul aria-label="技術棧" className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-muted">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>}
      {project.note && <p className="mt-4 text-xs leading-relaxed text-muted">{project.note}</p>}
      {project.href ? <Link href={project.href} className="mt-auto inline-flex items-center gap-3 pt-8 text-sm transition-transform duration-300 hover:translate-x-1 hover:text-accent">{project.linkLabel ?? "View Details"} <span aria-hidden="true" className="text-xl">↗</span></Link> : <span className="mt-auto inline-flex items-center gap-3 pt-8 text-sm text-muted">Project Overview <span aria-hidden="true" className="text-xl">↗</span></span>}
    </article>
  </li>;
}

export function OtherProjects({ projects }: { projects: OtherWork[] }) {
  const groups = Array.from(new Set(projects.map(project => project.group)));
  return <div className="mt-8">{groups.map(group => { const entries = projects.filter(project => project.group === group); return <section key={group} className="border-b border-line py-8 first:pt-0"><p className="font-mono text-xs tracking-widest text-accent">{groupTitles[group]}</p><ul className="mt-5 md:grid md:grid-cols-2">{entries.map((project, index) => <OtherProjectCard key={project.id} project={project} index={index} />)}</ul></section>; })}</div>;
}
