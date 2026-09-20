import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, brand } from "@/data/portfolio";
import { CaseMotion } from "@/components/portfolio/case-motion";
import { ProjectVisual } from "@/components/portfolio/project-visual";
import { RobotProjectDetail } from "@/components/portfolio/robot-project-detail";
import { SocketProjectDetail } from "@/components/portfolio/socket-project-detail";
import { ProbeProjectDetail } from "@/components/portfolio/probe-project-detail";
import { CaseSection, WorkflowSection } from "@/components/portfolio/case-sections";
import { siteConfig } from "@/lib/site";
export const projectParams = () => projects.map(project => ({ slug: project.slug }));
export async function projectMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return { title: "Project not found | WELU" };
  const url = siteConfig.url + "/projects/" + slug + "/";
  return { title: project.title + " | WELU", description: project.description, alternates: { canonical: url }, openGraph: { title: project.title + " | WELU", description: project.description, url, type: "article", locale: "zh_TW" } };
}
export async function ProjectView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex(item => item.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const isSocketProject = project.slug === "socket-automation";
  const previous = projects[(index + projects.length - 1) % projects.length];
  const next = projects[(index + 1) % projects.length];
  if (project.slug === "ai-dancing-robot") {
    const featuredProjects = projects.filter(item => item.slug !== "device-automation");
    const featuredIndex = featuredProjects.findIndex(item => item.slug === project.slug);
    const featuredPrevious = featuredProjects[(featuredIndex + featuredProjects.length - 1) % featuredProjects.length];
    const featuredNext = featuredProjects[(featuredIndex + 1) % featuredProjects.length];
    return <RobotProjectDetail previous={featuredPrevious} next={featuredNext} />;
  }
  if (project.slug === "probe-automation") return <ProbeProjectDetail project={project} />;
  if (isSocketProject) return <SocketProjectDetail project={project} previous={previous} next={next} />;
  return <main id="main"><CaseMotion>
    <header className="mx-auto max-w-content px-gutter pt-10 pb-16 md:pt-16 md:pb-20">
      <Link className="inline-block py-3 text-sm text-muted hover:text-accent" href="/#projects">← {brand.labels.back}</Link>
      <div className="mt-10 flex flex-wrap justify-between gap-4 font-mono text-xs tracking-widest text-muted"><p>CASE STUDY / {project.number}</p><p>{project.category}</p></div>
      <h1 className="mt-8 max-w-5xl text-title leading-relaxed tracking-tight">{project.title}</h1>
      <p className="mt-4 text-lg text-muted">{project.english}</p>
      <div className="mt-10 grid gap-6 border-t border-line pt-6 md:grid-cols-2"><p className="max-w-xl leading-loose">{project.description}</p><Link href="#workflow" className="justify-self-start py-2 text-sm md:justify-self-end">Explore the workflow ↓</Link></div>
    </header>
    <section data-scene aria-label="Project Visual" className="flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-surface px-gutter py-16">
      <div className="flex w-full max-w-2xl justify-between gap-4 font-mono text-xs text-muted"><span>02—03 / PROJECT VISUAL</span><span>SCROLL TO EXPLORE ↓</span></div>
      <div className="w-full max-w-2xl perspective-[var(--perspective)]"><div data-visual><ProjectVisual project={project} /></div></div>
      <p className="max-w-2xl text-sm text-muted">視覺佔位示意 · 非實際模型或機密圖面</p>
    </section>
    <div className="mx-auto max-w-content px-gutter">
      <section data-reveal className="py-12 md:py-16" aria-labelledby="overview-title"><h2 id="overview-title" className="mb-5 text-sm text-muted">Overview / 專案背景</h2><p className="max-w-3xl text-xl leading-loose">{project.overview}</p></section>
      <CaseSection number="04" title="Technology"><ul className="flex flex-wrap gap-3">{project.tech.map(tech => <li className="border border-line px-5 py-2 text-sm" key={tech}>{tech}</li>)}</ul></CaseSection>
      <WorkflowSection project={project} />
      <CaseSection number="06" title={project.system.length ? "My Role / My Responsibilities" : "My Role"}><ul className="space-y-3">{project.role.map(role => <li className="border-b border-line pb-3" key={role}>{role}</li>)}</ul></CaseSection>
      {project.system.length > 0 && <CaseSection number="TEAM" title="Project System / Team Components"><p className="mb-6 border-l-2 border-accent pl-5">以下為整體 Project System，不代表全部都是我個人獨立完成。</p><ul className="flex flex-wrap gap-x-6 gap-y-2 text-muted">{project.system.map(tech => <li key={tech}>{tech}</li>)}</ul></CaseSection>}
      <CaseSection number="07" title="Engineering Challenge"><p>{project.challenge}</p></CaseSection>
      <CaseSection number="08" title="Solution / Approach"><p>{project.approach}</p></CaseSection>
      <section className="border-t border-line py-12 md:py-16"><h2 className="mb-8 text-heading leading-display">Visual Gallery</h2><div className="grid gap-6 md:grid-cols-2">{["模型與結構", "流程與驗證"].map((caption, i) => <figure data-reveal key={caption}><ProjectVisual project={project} compact /><figcaption className="mt-4 flex justify-between text-sm text-muted"><span>0{i + 1} / {caption}</span><span>圖片待補</span></figcaption></figure>)}</div></section>
      <CaseSection number="10" title="Result / Learning"><p>{project.learning}</p></CaseSection>
      <nav aria-label="專案切換" className="grid border-t border-foreground py-10 md:grid-cols-2">
        <Link href={`/projects/${previous.slug}/`} className="py-5 md:pr-8"><span className="text-sm text-muted">← {brand.labels.previous}</span><p className="mt-4 text-xl">{previous.title}</p></Link>
        <Link href={`/projects/${next.slug}/`} className="border-t border-line py-5 md:border-t-0 md:border-l md:pl-8 md:text-right"><span className="text-sm text-muted">{brand.labels.next} →</span><p className="mt-4 text-xl">{next.title}</p></Link>
      </nav>
      <Link className="mb-16 inline-block border-b border-foreground py-3 text-sm" href="/#projects">← {brand.labels.back}</Link>
    </div>
  </CaseMotion></main>;
}
