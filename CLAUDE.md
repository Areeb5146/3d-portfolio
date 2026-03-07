# CLAUDE.md — Portfolio Project

## Project Context

Personal portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Three.js**, and **Fabric.js**.
Goal: Showcase frontend + WebGL/canvas work. Deployed on Vercel.

---

## Tech Stack & Conventions

- **Framework**: Next.js 14 with App Router (`app/` directory)
- **Language**: TypeScript — strict mode, no `any` unless justified
- **3D**: Three.js (r3f or vanilla) for hero/interactive scenes
- **Canvas**: Fabric.js for 2D canvas sections/demos
- **Styling**: Tailwind CSS — utility-first, no custom CSS unless necessary
- **Animations**: Framer Motion for UI, GSAP for complex canvas/WebGL transitions

### File & Folder Structure

```
app/
  layout.tsx
  page.tsx
  (sections)/
components/
  three/        # Three.js components
  fabric/       # Fabric.js canvas components
  ui/           # Generic reusable UI
lib/
  three/        # Scene setup, helpers, loaders
  fabric/       # Canvas utils
public/
  models/       # .glb / .gltf files
  textures/
```

### Component Rules

- Functional components only, named exports preferred
- Three.js scenes: always dispose geometry, materials, textures on unmount
- Fabric.js canvases: always call `canvas.dispose()` on unmount
- SSR-safe: wrap Three.js/Fabric.js in `dynamic(() => import(...), { ssr: false })`
- Use `useRef` for canvas/renderer refs, never `useState`

---

## Code Style

- **No `any`** — use proper types or generics
- **No inline styles** — Tailwind classes only
- Prefer `const` over `let`, never `var`
- Async: always `async/await`, no raw `.then()` chains
- Imports: absolute paths via `@/` alias
- Keep components under 150 lines — split if larger

### Commit Convention

```
feat: add hero Three.js scene
fix: fabric canvas not disposing on route change
perf: lazy load glb models only on viewport entry
style: adjust hero section spacing for mobile
```

- **Never** include `cat`, `EOF`, `HEREDOC`, or shell syntax artifacts in commit messages

---

## Workflow Principles

### Plan Before Building
- For anything 3+ steps or architectural: think through the approach first
- Write out the component structure before coding
- Ask: "Would a senior engineer approve this?"

### Verification Before Done
- Never call something complete without testing it in the browser
- Check for console errors/warnings (especially Three.js disposal warnings)
- Test on mobile viewport — Three.js canvas must resize correctly
- Confirm TypeScript has zero errors (`tsc --noEmit`)

### Demand Elegance
- If a solution feels hacky, pause — find the clean way
- Avoid over-engineering simple UI sections
- Three.js/Fabric.js code should be modular and reusable across pages

### Simplicity First
- Make every change as small as possible
- Touch only what's needed — don't refactor unrelated code
- No temporary fixes — find the root cause

---

## Common Gotchas (Project-Specific)

- **Three.js + Next.js SSR**: Always dynamic import with `ssr: false`
- **Fabric.js re-renders**: Don't put `fabric.Canvas` in React state — use refs
- **ResizeObserver**: Always clean up on unmount to avoid memory leaks
- **GLTF models**: Load with `useGLTF` (r3f) or `GLTFLoader` with Draco decoder
- **Canvas z-index**: Fabric and Three canvases need explicit `position: absolute` in overlay scenarios

---

## Performance Targets

- Lighthouse Performance: 90+
- Three.js scene: 60fps on mid-range devices
- Bundle: analyze with `next build && next analyze` before deploy
- Images: always use `next/image` with proper `sizes` prop

---

## Out of Scope (Don't Add)

- Backend / API routes (static portfolio only)
- Auth, databases, CMS (unless explicitly added later)
- Unit tests for Three.js scenes (not worth the setup cost here)
