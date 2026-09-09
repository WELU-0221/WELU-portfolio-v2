"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
interface CaseMotionProps { children: ReactNode }
export function CaseMotion({ children }: CaseMotionProps) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 1024px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (!context.conditions?.motion || !root.current) return;
      const scene = root.current.querySelector<HTMLElement>("[data-scene]");
      const visual = root.current.querySelector<HTMLElement>("[data-visual]");
      if (context.conditions.desktop && scene && visual) {
        gsap.timeline({ scrollTrigger: { trigger: scene, start: "top top", end: () => "+=" + Math.round(window.innerHeight * 1.4), pin: true, scrub: 0.8, invalidateOnRefresh: true } })
          .fromTo(visual, { rotationY: -14, rotationX: 8, scale: 0.86, xPercent: -6 }, { rotationY: 12, rotationX: -5, scale: 1, xPercent: 5, ease: "none", duration: 1 })
          .to(visual, { rotationY: 0, rotationX: 0, scale: 0.94, xPercent: 0, ease: "none", duration: 1 });
      }
      root.current.querySelectorAll<HTMLElement>("[data-reveal]").forEach(element => {
        gsap.fromTo(element, { y: 24, opacity: 0.25 }, { y: 0, opacity: 1, duration: 0.65, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 92%", toggleActions: "play none none reverse" } });
      });
      root.current.querySelectorAll<HTMLElement>("[data-workflow]").forEach(lane => {
        const steps = lane.querySelectorAll("[data-step]");
        gsap.fromTo(steps, { opacity: 0.3, x: -10 }, { opacity: 1, x: 0, stagger: 0.18, ease: "none", scrollTrigger: { trigger: lane, start: "top 82%", end: "bottom 70%", scrub: 0.4 } });
      });
      const convergence = root.current.querySelector("[data-convergence]");
      if (convergence) gsap.fromTo(convergence, { scaleX: 0.75, opacity: 0.25 }, { scaleX: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: convergence, start: "top 92%", end: "top 65%", scrub: 0.4 } });
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts.ready.then(() => { if (root.current) refresh(); });
    return () => { window.removeEventListener("load", refresh); media.revert(); };
  }, []);
  return <div ref={root}>{children}</div>;
}
