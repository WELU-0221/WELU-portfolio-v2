import { ProjectView, projectParams, projectMetadata } from "@/views/project";
export const generateStaticParams = projectParams;
export const generateMetadata = projectMetadata;
export const dynamicParams = false;
export default ProjectView;
