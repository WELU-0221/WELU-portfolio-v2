import type { ReactNode } from "react";
import { PageEntry } from "@/components/portfolio/page-entry";
export default function Template({ children }: { children: ReactNode }) { return <PageEntry>{children}</PageEntry>; }
