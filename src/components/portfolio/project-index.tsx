"use client";
import { useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "@react-spring/web";
import { Spring } from "@/components/animation/springs/spring";
import { SocketProjectPreview } from "./socket-project-preview";
import { brand } from "@/data/portfolio";
export interface ProjectIndexItem { slug: string; number: string; title: string; english: string; description: string; tech: string[]; }
interface ProjectIndexProps { projects: ProjectIndexItem[] }
function IndexRow({ project, total }: { project: ProjectIndexItem; total: number }) {
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();
  return <li className="relative border-b border-line">
    <Link href={`/projects/${project.slug}/`} className="group relative block py-8 md:py-10"
      onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
      <div className="grid grid-cols-12 gap-x-4 gap-y-5">
        <span className="col-span-2 pt-1 font-mono text-sm text-accent md:col-span-1">{project.number} / {String(total).padStart(2, "0")}</span>
        <Spring tag="section" mode="always" from={{ x: 0 }} to={{ x: active && !reduceMotion ? 7 : 0 }} className="col-span-10 min-w-0 md:col-span-7">
          <h3 className="text-2xl leading-relaxed font-medium md:text-3xl">{project.title}</h3>
          <p className="mt-1 text-sm text-muted md:text-base">{project.english}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{project.description}</p>
          <ul aria-label="技術棧" className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted">
            {project.tech.map(tech => <li key={tech}>{tech}</li>)}
          </ul>
        </Spring>
        <span className="col-span-10 col-start-3 flex items-center gap-6 self-start py-2 text-sm md:col-span-4 md:justify-end">{brand.labels.view}<span aria-hidden="true" className="text-2xl">↗</span></span>
      </div>
      {project.slug === "socket-automation" && <Spring tag="aside" aria-hidden="true" mode="always"
        from={{ opacity: 0, scale: 0.96, y: 8 }} to={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.96, y: active && !reduceMotion ? 0 : 8 }}
        className="pointer-events-none absolute top-16 right-16 z-20 hidden w-64 origin-bottom-right shadow-xl lg:block"><SocketProjectPreview active={active} reduceMotion={Boolean(reduceMotion)} />
      </Spring>}
    </Link>
  </li>;
}
export function ProjectIndex({ projects }: ProjectIndexProps) {
  return <ol>{projects.map(project => <IndexRow key={project.slug} project={project} total={projects.length} />)}</ol>;
}
