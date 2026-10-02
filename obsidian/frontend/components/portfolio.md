---
tags: [frontend, components, portfolio]
updated: 2026-09-22
---

# Portfolio case-study components

`src/components/portfolio/probe-story.tsx` renders the public Probe Automation case study as ten visual stages: Hero, Before Automation, System Transformation, Design Rule, Spring Parameter Search, CAD Automation, Probe Rebirth, Part + Drawing, Validation, and Final Output. The hero line art is conceptual and is labelled as such; it is not a CAD asset. Previous / Next navigation and six compact contribution blocks close the story.

`src/components/portfolio/probe-flow.tsx` renders the three engineering flows. It uses the existing React Spring dependency for scroll-driven node emphasis and connector progress. One scroll listener per flow is removed on unmount, and `prefers-reduced-motion` makes spring updates immediate. The module labels and order come from the user-provided public process; no formulas, dimensions, internal paths, or performance figures are present.
