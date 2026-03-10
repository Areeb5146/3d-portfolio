'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: 'Top Rated', label: 'Upwork Status' },
  { value: '100%', label: 'Job Success Score' },
  { value: '10+', label: 'Projects Delivered' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      const statEls = statsRef.current?.querySelectorAll('.stat-card');
      if (statEls) {
        gsap.fromTo(
          statEls,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about">
      <div className="section-container">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          01 / About
        </div>
        <h2
          ref={headingRef}
          className="font-display text-5xl tracking-wide text-foreground md:text-7xl"
          style={{ opacity: 0 }}
        >
          BUILDING THE
          <br />
          <span className="text-accent">FUTURE OF WEB</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div ref={textRef} style={{ opacity: 0 }}>
            <p className="text-lg leading-relaxed text-muted">
              I&apos;m a frontend engineer with a deep focus on WebGL, canvas, and 3D
              interfaces. I build immersive web experiences that blur the line between
              application and art.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              From government-scale platforms at the Ministry of Energy to AI-powered
              creative tools at ImagineArt (Vyro), I&apos;ve shipped production code that
              serves millions. My weapon of choice: Three.js, Fabric.js, React, and
              TypeScript — combined to create interfaces people remember.
            </p>
            <p className="mb-8 mt-6 text-lg leading-relaxed text-muted">
              Top Rated on Upwork with a 100% Job Success Score. I don&apos;t just write
              code — I craft experiences.
            </p>

            <div ref={statsRef} className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#1e1e1e]">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card bg-[#080808] p-8"
                >
                  <div className="font-display text-3xl text-accent">{stat.value}</div>
                  <div className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start justify-center max-lg:order-first lg:-mt-12">
            <div className="group relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl border border-[#1e1e1e] transition-shadow duration-500 hover:shadow-[0_0_40px_#4fffb015] lg:max-w-none">
              <Image
                src="/images/areeb.png"
                alt="Areeb Afzal"
                fill
                sizes="(max-width: 1024px) 280px, 50vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-[#0d0d0d]/90 px-3 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                  Available for work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
