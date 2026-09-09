"use client";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
export const scrollSpeed = { current: 1 };
export function ScrollLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const setLenis = useScroll(state => state.setLenis);
  const enabled = useScroll(state => state.isEnableScroll);
  const lenis = useScroll(state => state.lenis);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | null = null;
    const tick = (time: number) => instance?.raf(time * 1000);
    const configure = () => {
      gsap.ticker.remove(tick);
      instance?.destroy();
      instance = media.matches ? null : new Lenis({ smoothWheel: true, anchors: true });
      setLenis(instance);
      if (instance) { instance.on("scroll", ScrollTrigger.update); gsap.ticker.add(tick); }
    };
    configure();
    media.addEventListener("change", configure);
    return () => { media.removeEventListener("change", configure); gsap.ticker.remove(tick); instance?.destroy(); setLenis(null); };
  }, [setLenis]);
  useEffect(() => { if (enabled) lenis?.start(); else lenis?.stop(); }, [enabled, lenis]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
      if (target) { if (lenis) lenis.scrollTo(target, { immediate: true }); else target.scrollIntoView(); }
      // Next Link retains responsibility for regular route/back scroll restoration.
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, lenis]);
  return <>{children}</>;
}
