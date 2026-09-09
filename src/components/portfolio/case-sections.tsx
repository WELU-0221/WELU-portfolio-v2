import type { ReactNode } from "react";
import type { Project } from "@/data/portfolio";
export function CaseSection({ number, title, children, id }: { number: string; title: string; children: ReactNode; id?: string }) {
  return <section id={id} data-reveal className="grid gap-6 border-t border-line py-12 md:grid-cols-3 md:gap-12 md:py-16">
    <h2 className="text-sm leading-loose"><span className="mr-4 font-mono text-accent">{number}</span>{title}</h2>
    <div className="min-w-0 text-base leading-loose md:col-span-2">{children}</div>
  </section>;
}
export function WorkflowSection({ project }: { project: Project }) {
  const dual = project.workflows.length > 1;
  return <section id="workflow" className="border-t border-line py-12 md:py-16">
    <div className="mb-10 flex flex-wrap justify-between gap-4"><h2 className="text-heading leading-display tracking-tight">Engineering Workflow</h2><span className="font-mono text-sm text-accent">05 / PROCESS</span></div>
    <div className={dual ? "grid gap-8 md:grid-cols-2" : ""}>
      {project.workflows.map(lane => <div key={lane.name} data-workflow>
        <h3 className="mb-5 border-b border-line pb-4 text-sm">{lane.name}</h3>
        <ol className="flex flex-col">
          {lane.steps.map((step, index) => <li key={step} data-step className="flex flex-col">
            <div className="flex min-h-16 items-center gap-5 border border-line bg-surface p-4"><span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span><span>{step}</span></div>
            {index < lane.steps.length - 1 && <span aria-hidden="true" className="py-2 text-center text-secondary">↓</span>}
          </li>)}
        </ol>
      </div>)}
    </div>
    {dual && <div data-convergence className="mt-5"><div aria-hidden="true" className="grid grid-cols-2 py-3 text-center text-2xl text-secondary"><span>↘</span><span>↙</span></div><div className="bg-foreground px-6 py-8 text-center text-2xl text-inverse">Robot System</div><p className="mt-4 text-sm leading-loose text-muted">兩條流程在整體系統中匯合；此流程不代表每個模組皆由個人獨立完成。</p></div>}
  </section>;
}
