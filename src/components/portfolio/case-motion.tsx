"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
interface CaseMotionProps { children: ReactNode }
export function CaseMotion({ children }: CaseMotionProps) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const rootElement = root.current;
    if (!rootElement) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add({ desktop: "(min-width: 768px)" }, conditions => {
        const scene = rootElement.querySelector<HTMLElement>("[data-scene]");
        const visual = rootElement.querySelector<HTMLElement>("[data-visual]");
        if (conditions.conditions?.desktop && scene && visual) {
          gsap.timeline({ scrollTrigger: { trigger: scene, start: "top top", end: () => "+=" + Math.round(window.innerHeight * 1.4), pin: true, scrub: 0.8, invalidateOnRefresh: true } })
            .fromTo(visual, { rotationY: -14, rotationX: 8, scale: 0.86, xPercent: -6 }, { rotationY: 12, rotationX: -5, scale: 1, xPercent: 5, ease: "none", duration: 1 })
            .to(visual, { rotationY: 0, rotationX: 0, scale: 0.94, xPercent: 0, ease: "none", duration: 1 });
        }
        rootElement.querySelectorAll<HTMLElement>("[data-reveal]").forEach(element => {
          gsap.fromTo(element, { y: 24, opacity: 0.25 }, { y: 0, opacity: 1, duration: 0.65, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 92%", toggleActions: "play none none reverse" } });
        });
        rootElement.querySelectorAll<HTMLElement>("[data-workflow]").forEach(lane => {
          const steps = lane.querySelectorAll("[data-step]");
          gsap.fromTo(steps, { opacity: 0.3, x: -10 }, { opacity: 1, x: 0, stagger: 0.18, ease: "none", scrollTrigger: { trigger: lane, start: "top 82%", end: "bottom 70%", scrub: 0.4 } });
        });
        const convergence = rootElement.querySelector("[data-convergence]");
        if (convergence) gsap.fromTo(convergence, { scaleX: 0.75, opacity: 0.25 }, { scaleX: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: convergence, start: "top 92%", end: "top 65%", scrub: 0.4 } });
      });
    }, rootElement);
    let disposed = false;
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts.ready.then(() => { if (!disposed) refresh(); });
    return () => {
      disposed = true;
      window.removeEventListener("load", refresh);
      media.revert();
      context.revert();
    };
  }, []);
  return <div ref={root}>{children}</div>;
}
