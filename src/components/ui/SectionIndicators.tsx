'use client';

import { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'about', label: 'ABOUT', number: '01' },
  { id: 'experience', label: 'EXPERIENCE', number: '02' },
  { id: 'projects', label: 'PROJECTS', number: '03' },
  { id: 'skills', label: 'SKILLS', number: '04' },
  { id: 'contact', label: 'CONTACT', number: '05' },
];

export default function SectionIndicators() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleEntries = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleEntries, {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    });

    const observeSections = () => {
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) observerRef.current?.observe(el);
      }
    };

    // Defer to ensure dynamically imported sections are in the DOM
    const timer = setTimeout(observeSections, 200);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start gap-1 xl:flex">
      {SECTIONS.map((section) => {
        const isActive = activeId === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 px-3 py-2"
            data-cursor-hover
          >
            <span
              className={`h-px transition-all duration-300 ${
                isActive ? 'w-6 bg-accent' : 'w-3 bg-foreground/20 group-hover:w-4 group-hover:bg-foreground/40'
              }`}
            />
            <span
              className={`whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                isActive ? 'text-accent' : 'text-foreground/20 group-hover:text-foreground/40'
              }`}
            >
              {section.number}
            </span>
          </a>
        );
      })}
    </div>
  );
}
