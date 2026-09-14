

## Socket viewport choreography (2026-09-12)

User explicitly requests GSAP / ScrollTrigger for the Socket case study, overriding the starter spring-only convention for this component. A single pinned Canvas and master timeline own model pose, camera, exploded offsets, text reveals, progress and exit. Lenis remains owned by ScrollLayout. Responsive screen-space composition keeps mobile text above the model. GLTF materials are cloned and darkened only in this detail viewer; the cached scene and homepage remain unchanged. Three existing named meshes receive schematic offsets, without asserting a DEVICE/GP/MP/RT identity mapping. Timeline and media context revert on unmount; materials and scheduled refresh are cleaned up. Stage content and pose targets live in src/data/socket-story.ts.

## 2026-09-14 — AI Dancing Robot detail storytelling

User explicitly requests GSAP/ScrollTrigger for this page, overriding the spring-only default for scroll. Existing Lenis and other project pages remain unchanged. React Spring supplies the Canvas entrance only; one GSAP master timeline owns scroll poses and copy transitions.

- Dedicated `robot-project-detail.tsx`, `robot-story.tsx`, `robot-model.tsx`, `robot-story.module.css`, and `src/data/robot-story.ts`; routing adds only the robot branch.
- One demand-rendered Canvas spans Hero, Overview, My Responsibilities and seven subsequent numbered engineering scenes. Overview is stage 01; stages 02–08 cover mechanism, hardware, music, rhythm, dual workflows, team system, contribution.
- CSS sticky retains the viewer without GSAP pin spacers or DOM reparenting. Unmount reverts the context/matchMedia, kills the owned timeline/trigger, and cancels refresh RAF. No new Lenis instance.
- Mobile limits horizontal movement and yaw, caps scale and keeps the robot below the copy. Reduced-motion disables scroll pose changes and copy fades.
- Original GLB, material colors and material properties retained. Bounding box normalizes CAD units and off-center origin; a quarter-turn aligns the exported side orientation to the camera.
- GLB contains 71 nodes and 66 meshes; full names are in [[robot-model-inventory]]. Original embedded normal image has DDS bytes mislabeled as PNG. A robot loader plugin decodes its 32-bit BGR pixels into an RGBA DataTexture; no source asset rewrite or material substitution.
- Local Draco assets copied from installed Three.js; only this vendor folder is excluded from ESLint.
- Personal responsibilities and Team Components are separate; no unsupported accuracy/performance claims.
- QA: lint, TypeScript and production static build passed. Existing repository hygiene failure lists five previously modified protected Spring engine files, untouched by this change. Desktop/mobile visual checks and client navigation checks performed; see final task report.