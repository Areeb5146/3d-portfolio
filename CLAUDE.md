# 3D Portfolio - Claude Code Instructions

This file contains project-specific instructions for Claude Code. All conversations will follow these guidelines.

## Project Overview

A 3D interactive portfolio website built with:
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Three.js** via @react-three/fiber and @react-three/drei
- **Fabric.js** for 2D canvas interactions

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main portfolio page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── three/             # Three.js/R3F components
│   │   ├── Scene.tsx      # Main 3D scene wrapper
│   │   ├── Box.tsx        # Interactive 3D box
│   │   └── index.ts       # Barrel exports
│   └── fabric/            # Fabric.js components
│       ├── FabricCanvas.tsx
│       └── index.ts
public/                     # Static assets
```

## Development Rules

### Three.js / React Three Fiber
- Always use `'use client'` directive for R3F components
- Use dynamic imports with `ssr: false` to avoid SSR hydration issues
- Put 3D components inside `<Suspense>` for loading states
- Use `@react-three/drei` helpers (OrbitControls, etc.) when available

### Fabric.js
- Initialize canvas in `useEffect` with proper cleanup via `canvas.dispose()`
- Use `'use client'` directive for Fabric components
- Store canvas instance in a ref for cleanup

### Styling
- Use Tailwind CSS for all styling
- Follow the dark theme aesthetic (slate-900, purple-900 gradients)
- Use backdrop-blur and semi-transparent backgrounds for modern look

### Code Style
- Use TypeScript with proper interfaces for props
- Use functional components with hooks
- Prefer named exports from index.ts barrel files
- Keep components small and focused

### Comments
- Do NOT add AI-style comments (overly explanatory, stating the obvious)
- Only add comments where logic is genuinely complex or non-obvious
- Avoid comments like "// Initialize the canvas" or "// Handle click event"
- Let code be self-documenting with good naming

### Git Commits
- Never use "cat", "claude", "eof", or "heredoc" in commit messages
- Write natural, human-style commit messages
- Keep messages concise and descriptive

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Future Enhancements (Planned)

- Add more 3D models and scenes
- Implement project showcase section
- Add contact form
- Improve mobile responsiveness
- Add loading animations
