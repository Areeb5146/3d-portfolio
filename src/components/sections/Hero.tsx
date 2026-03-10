'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';

const MatrixRain = dynamic(() => import('@/components/ui/MatrixRain'), {
  ssr: false,
});

const TITLE_CHARS = 'AREEB AFZAL'.split('');
const SUBTITLE_TEXT = 'Frontend Engineer \u00b7 WebGL \u00b7 Canvas \u00b7 3D';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll('.char');
      if (!chars) return;

      gsap.fromTo(
        chars,
        { y: 120, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          delay: 1.2,
          ease: 'power4.out',
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.5, ease: 'power3.out' }
      );

      gsap.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 3.0 }
      );

      gsap.to(scrollRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        delay: 3.0,
        ease: 'sine.inOut',
      });

      const handleScroll = () => {
        if (scrollRef.current) {
          const opacity = Math.max(0, 1 - window.scrollY / 200);
          scrollRef.current.style.opacity = String(opacity);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex py-0! h-screen items-center justify-center overflow-hidden"
    >
      <MatrixRain />

      <div className="section-container relative z-10 text-center">
        <h1
          ref={titleRef}
          className="font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] tracking-wider text-foreground whitespace-nowrap"
          style={{ perspective: '1000px' }}
        >
          {TITLE_CHARS.map((char, i) => (
            <span
              key={i}
              className="char inline-block"
              style={{
                opacity: 0,
                marginRight: char === ' ' ? '0.3em' : '0',
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 font-mono text-sm tracking-[0.3em] uppercase text-accent md:text-base"
          style={{ opacity: 0 }}
        >
          {SUBTITLE_TEXT}
        </p>

        <div
          ref={ctaRef}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ opacity: 0 }}
        >
          <a
            href="#projects"
            onClick={handleScrollToWork}
            className="rounded-full border border-foreground/20 bg-foreground px-4 py-1 font-mono text-xs uppercase tracking-wider text-background transition-all hover:bg-accent hover:text-background"
            data-cursor-hover
          >
            View Work
          </a>
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="rounded-full border border-accent/30 px-4 py-1 font-mono text-xs uppercase tracking-wider text-accent transition-all hover:bg-accent/10"
            data-cursor-hover
          >
            Get In Touch
          </a>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 z-5 w-full"
        style={{
          height: '40%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.4) 30%, rgba(10,10,10,0.85) 70%, #0a0a0a 100%)',
        }}
      />

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}
