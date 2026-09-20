import type { OtherProject } from "@/data/other-projects";

function OtherProjectCard({ project }: { project: OtherProject }) {
  return <li className="border-t border-line py-7 first:border-t-0 md:border-t md:px-5 md:first:border-t">
    <article className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 font-mono text-xs tracking-widest text-accent"><span>{project.number}</span>{project.tag && <span className="text-right text-muted">{project.tag}</span>}</div>
      <h3 className="mt-8 text-xl leading-relaxed font-medium">{project.title}</h3>
      <p className="mt-1 text-sm text-muted">{project.english}</p>
      <p className="mt-5 text-sm leading-relaxed text-muted">{project.description}</p>
      <ul aria-label="技術棧" className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-muted">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <span className="mt-auto inline-flex items-center gap-3 pt-8 text-sm">View Details <span aria-hidden="true" className="text-xl">↗</span></span>
    </article>
  </li>;
}

export function OtherProjects({ projects }: { projects: OtherProject[] }) {
  return <div className="mt-8 border-b border-line md:grid md:grid-cols-2">{projects.map(project => <OtherProjectCard key={project.number} project={project} />)}</div>;
}