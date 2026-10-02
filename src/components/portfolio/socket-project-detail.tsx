import type { Project } from "@/data/portfolio";
import { SocketStory } from "./socket-story";

interface SocketProjectDetailProps { project: Project; previous: Project; next: Project; }

export function SocketProjectDetail({ project, previous, next }: SocketProjectDetailProps) {
  return <SocketStory project={project} previous={previous} next={next} />;
}
