'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string[];
  tech: string[];
  highlight?: boolean;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'Ministry of Energy',
    role: 'Frontend Developer',
    duration: 'Oct 2025 — Present',
    description: [
      'Building government-scale energy monitoring platforms with Angular and React',
      'Developing complex data visualization dashboards for national energy metrics',
      'Leading frontend architecture decisions with TypeScript strict mode',
    ],
    tech: ['Angular', 'React.js', 'TypeScript'],
  },
  {
    company: 'Vyro / ImagineArt',
    role: 'Frontend Developer',
    duration: 'May 2025 — Sep 2025',
    description: [
      'Built AI-powered creative tools serving millions of users globally',
      'Developed advanced Fabric.js canvas features for image editing and generation',
      'Implemented WebGL shaders for real-time image processing pipelines',
    ],
    tech: ['WebGL', 'Fabric.js', 'React.js'],
  },
  {
    company: 'i3a Solutions',
    role: 'Frontend Developer',
    duration: 'May 2024 — May 2025',
    description: [
      'Built enterprise web applications with React and Angular frameworks',
      'Designed and implemented responsive, accessible UI component libraries',
      'Integrated REST APIs and managed complex state with Redux and Context',
    ],
    tech: ['React.js', 'Angular', 'TypeScript'],
  },
  {
    company: 'Stahlen Studios',
    role: 'Frontend Developer',
    duration: 'May 2023 — May 2024',
    description: [
      'Developed production React applications with Redux state management',
      'Built reusable component libraries and design system foundations',
      'Collaborated with design team to implement pixel-perfect interfaces',
    ],
    tech: ['React.js', 'Redux', 'JavaScript'],
  },
  {
    company: 'Upwork',
    role: 'Freelance Frontend Engineer',
    duration: '2023 — Present',
    description: [
      'Top Rated freelancer with 100% Job Success Score',
      'Delivered 10+ projects specializing in Three.js, Fabric.js, and React',
      'Clients include AI startups, creative agencies, and enterprise companies',
    ],
    tech: ['Three.js', 'Fabric.js', 'React', 'Next.js'],
    highlight: true,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      const cards = sectionRef.current?.querySelectorAll('.timeline-card');
      if (cards) {
        cards.forEach((card, i) => {
          const isLeft = i % 2 === 0;
          gsap.fromTo(
            card,
            { opacity: 0, x: isLeft ? -60 : 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%' },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience">
      <div className="section-container">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          02 / Experience
        </div>
        <h2
          ref={headingRef}
          className="font-display text-5xl tracking-wide text-foreground md:text-7xl"
          style={{ opacity: 0 }}
        >
          WHERE I&apos;VE
          <br />
          <span className="text-accent">BUILT THINGS</span>
        </h2>

        <div className="relative mt-12 md:mt-20">
          {/* Center timeline line — hidden on mobile */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-[#1e1e1e] md:left-1/2 md:block md:-translate-x-px" />

          {EXPERIENCES.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={exp.company}
                className="timeline-card relative mb-16"
                style={{ opacity: 0 }}
              >
                {/* Desktop: alternating layout */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-8">
                  {/* Left column */}
                  <div className={isLeft ? '' : 'flex items-start justify-end'}>
                    {isLeft ? (
                      <ExperienceCard exp={exp} />
                    ) : (
                      <div className="pr-8 pt-2 text-right">
                        <span className="font-mono text-xs uppercase tracking-wider text-muted">
                          {exp.duration}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div
                    className="absolute left-1/2 top-3 z-10 -translate-x-1/2"
                  >
                    <div
                      className={`h-3 w-3 rounded-full border-2 ${
                        exp.highlight
                          ? 'border-accent bg-accent shadow-[0_0_12px_#4fffb060]'
                          : 'border-accent/50 bg-background'
                      }`}
                    />
                  </div>

                  {/* Right column */}
                  <div className={isLeft ? 'flex items-start' : ''}>
                    {isLeft ? (
                      <div className="pl-8 pt-2">
                        <span className="font-mono text-xs uppercase tracking-wider text-muted">
                          {exp.duration}
                        </span>
                      </div>
                    ) : (
                      <ExperienceCard exp={exp} />
                    )}
                  </div>
                </div>

                {/* Mobile: stacked layout */}
                <div className="md:hidden">
                  <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">
                    {exp.duration}
                  </div>
                  <ExperienceCard exp={exp} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp }: { exp: ExperienceItem }) {
  return (
    <div
      className={`rounded-xl border p-6 transition-all hover:border-accent/20 md:p-10 ${
        exp.highlight
          ? 'border-accent/30 bg-[#0d0d0d] shadow-[0_0_30px_#4fffb010]'
          : 'border-[#1e1e1e] bg-[#0d0d0d]'
      }`}
    >
      {exp.highlight && (
        <div className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
          Top Rated
        </div>
      )}
      <h3 className="font-display text-2xl tracking-wide text-foreground">
        {exp.company}
      </h3>
      <div className="mt-1 font-mono text-xs text-accent">{exp.role}</div>
      <ul className="mt-4 space-y-2">
        {exp.description.map((desc) => (
          <li key={desc} className="text-sm leading-relaxed text-muted">
            {desc}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {exp.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-foreground/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
