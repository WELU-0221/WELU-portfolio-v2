"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

type FlowStep = { title: string; note?: string };

function Step({ step, index, isLast, state, reducedMotion, variant }: { step: FlowStep; index: number; isLast: boolean; state: "current" | "past" | "next"; reducedMotion: boolean; variant: "map" | "numbered" }) {
  const spring = useSpring({
    opacity: state === "current" ? 1 : state === "past" ? 0.78 : 0.72,
    x: state === "current" && !reducedMotion ? 8 : 0,
    width: state === "next" ? "0%" : "100%",
    immediate: reducedMotion,
    config: { tension: 210, friction: 28 },
  });

  return <li data-probe-step className="relative border-t border-line py-5 first:border-t-0">
    <animated.div style={{ opacity: spring.opacity, x: spring.x }} className="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-4 md:grid-cols-[3.5rem_minmax(0,1fr)]">
      <span className="pt-1 font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
      <div className="min-w-0">
        <h3 className="break-words text-base leading-snug md:text-lg">{step.title}</h3>
        {step.note && <p className="mt-2 text-sm leading-relaxed text-muted">{step.note}</p>}
        {variant === "map" && <span className="mt-3 block font-mono text-xs text-muted">MODULE / {String(index + 1).padStart(2, "0")}</span>}
      </div>
    </animated.div>
    <animated.div aria-hidden="true" style={{ width: spring.width }} className="absolute bottom-0 left-0 h-px bg-accent" />
    {!isLast && <span aria-hidden="true" className="absolute -bottom-2 left-4 z-10 bg-background px-1 text-xs text-accent">↓</span>}
  </li>;
}

export function ProbeFlow({ steps, label, variant }: { steps: FlowStep[]; label: string; variant: "map" | "numbered" }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);

    let frame = 0;
    const update = () => {
      frame = 0;
      const items = listRef.current?.querySelectorAll<HTMLElement>("[data-probe-step]");
      if (!items?.length) return;
      const focusLine = window.innerHeight * 0.43;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const candidate = Math.abs(rect.top + rect.height / 2 - focusLine);
        if (candidate < distance) { distance = candidate; closest = index; }
      });
      setActive(closest);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", updateMotion);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <ol ref={listRef} aria-label={label} className="border-b border-line">
    {steps.map((step, index) => <Step key={step.title} step={step} index={index} isLast={index === steps.length - 1} state={index === active ? "current" : index < active ? "past" : "next"} reducedMotion={reducedMotion} variant={variant} />)}
  </ol>;
}
