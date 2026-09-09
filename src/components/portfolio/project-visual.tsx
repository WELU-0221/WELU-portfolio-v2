import type { Project } from "@/data/portfolio";
interface ProjectVisualProps { project: Project; compact?: boolean }
export function ProjectVisual({ project, compact = false }: ProjectVisualProps) {
  return <div className={`relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden bg-foreground text-inverse ${compact ? "p-5" : "p-7 md:p-10"}`} role="img" aria-label={project.title + "：專案圖片預留區，非實際設計圖"}>
    <div className="flex justify-between gap-4 border-b border-inverse/25 pb-4 font-mono text-xs tracking-widest">
      <span>W / {project.number}</span><span>PROJECT VISUAL</span>
    </div>
    <div className="flex items-end justify-between gap-4 py-4" aria-hidden="true">
      <span className={`font-light leading-display tracking-display ${compact ? "text-7xl" : "text-8xl md:text-9xl"}`}>{project.number}</span>
      <span className="text-5xl text-inverse/45">↗</span>
    </div>
    <div className="border-t border-inverse/25 pt-4">
      <p className={compact ? "text-sm" : "text-lg"}>{project.english}</p>
      <p className="mt-2 font-mono text-xs text-inverse/65">IMAGE PLACEHOLDER · 圖片待補</p>
    </div>
  </div>;
}
