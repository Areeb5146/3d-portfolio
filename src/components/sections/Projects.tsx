'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tech: string[];
  url: string;
  image?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Shirt Lab',
    description:
      'Full-stack 3D shirt customization platform. Upload designs, apply them to a photorealistic 3D model in real-time. Three.js + Fabric.js working together.',
    tech: ['Next.js', 'Three.js', 'Fabric.js', 'TypeScript'],
    url: 'https://shirt-lab.vercel.app',
    image: '/images/shirt-lab.png',
  },
  {
    title: 'Designs Lab',
    description:
      'Professional-grade canvas design tool. Layer management, filters, text effects, export — all built with Fabric.js from scratch.',
    tech: ['Next.js', 'Fabric.js', 'TypeScript', 'Tailwind'],
    url: 'https://designs-lab.vercel.app',
    image: '/images/design-lab.png',
  },
  {
    title: 'PMIS Portal',
    description:
      'Pakistan\'s national mineral information system — a large-scale government web portal built for the Ministry of Energy with multiple data modules, interactive dashboards, and real-time mineral production statistics.',
    tech: ['Angular', 'React.js', 'TypeScript', 'GitHub Actions', 'CI/CD'],
    url: 'https://mineral.gov.pk/trial',
    image: '/images/pmis.png',
  },
];

export default function Projects() {
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

      const cards = sectionRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: cards[0], start: 'top 85%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative">
      <div
        ref={headingRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ opacity: 0 }}
      >
        <span className="whitespace-nowrap font-display text-[12rem] leading-none tracking-wider text-foreground/3 md:text-[20rem]">
          FEATURED WORK
        </span>
      </div>

      <div className="section-container relative z-10">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          // PROJECTS
        </div>

        <div className="mt-16">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrowserMockup({ url, children }: { url: string; children: React.ReactNode }) {
  const displayUrl = url.replace(/^https?:\/\//, '');
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d]">
      <div className="flex items-center gap-2 border-b border-[#1e1e1e] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-2 flex-1 rounded-md bg-[#1a1a1a] px-3 py-1">
          <span className="font-mono text-[10px] text-muted/50">{displayUrl}</span>
        </div>
      </div>
      <div className="relative aspect-[16/9]">
        {children}
      </div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isReversed = index % 2 !== 0;

  const handleMouseEnter = () => {
    if (rowRef.current) {
      gsap.to(rowRef.current, {
        y: -4,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (rowRef.current) {
      gsap.to(rowRef.current, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={rowRef}
      className="project-card border-b border-[#1e1e1e] py-16"
      style={{ opacity: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
          isReversed ? 'lg:[direction:rtl]' : ''
        }`}
      >
        <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="mt-3 font-display text-5xl tracking-wide text-foreground md:text-6xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-foreground/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          {project.url !== '#' && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-foreground"
              data-cursor-hover
            >
              View Project
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
        </div>

        <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
          <BrowserMockup url={project.url === '#' ? 'localhost:3000' : project.url}>
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#0d0d0d]">
                <div className="relative">
                  <div className="font-display text-7xl tracking-wider text-foreground/5">AA.</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full border border-accent/20" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full border border-accent/10" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-44 w-44 rounded-full border border-accent/5" />
                  </div>
                </div>
              </div>
            )}
          </BrowserMockup>
        </div>
      </div>
    </div>
  );
}
