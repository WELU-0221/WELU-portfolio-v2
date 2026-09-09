"use client";
import { Spring } from "@/components/animation/springs/spring";
import type { ReactNode } from "react";
export function PageEntry({ children }: { children: ReactNode }) {
  return <Spring tag="section" aria-label="頁面內容" mode="once" from={{ opacity: 0.65 }} to={{ opacity: 1 }} config={{ tension: 180, friction: 28 }}>{children}</Spring>;
}
