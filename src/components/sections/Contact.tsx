'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/areebafzal' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/areebafzal' },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/areebafzal' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact">
      <div className="section-container flex max-w-4xl flex-col items-center text-center">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          05 / Contact
        </div>

        <h2
          ref={headingRef}
          className="font-display text-6xl tracking-wider text-foreground md:text-[8rem] md:leading-[0.9]"
          style={{ opacity: 0 }}
        >
          LET&apos;S
          <br />
          <span className="text-accent">BUILD</span>
        </h2>

        <div ref={contentRef} style={{ opacity: 0 }}>
          <p className="mx-auto mt-8 max-w-lg text-lg text-muted">
            Got a project in mind? Looking for a frontend engineer who lives and
            breathes WebGL and canvas? Let&apos;s talk.
          </p>

          <a
            href="mailto:iareebafzal1122@gmail.com"
            className="mt-10 inline-block font-mono text-lg tracking-wider text-foreground underline decoration-accent/30 underline-offset-4 transition-all hover:text-accent hover:decoration-accent md:text-2xl"
            data-cursor-hover
          >
            iareebafzal1122@gmail.com
          </a>

          <div className="mt-12 flex items-center justify-center gap-8">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 border-t border-foreground/5 pb-12 pt-8">
        <div className="section-container flex flex-col items-center justify-between gap-4 md:flex-row">
          <span className="font-display text-lg tracking-wider text-foreground/30">AA.</span>
          <span className="font-mono text-xs text-muted">
            &copy; {new Date().getFullYear()} Areeb Afzal. Built with Next.js, Three.js &amp; Fabric.js.
          </span>
          <span className="font-mono text-xs text-foreground/20">
            Rawalpindi, Pakistan
          </span>
        </div>
      </div>
    </section>
  );
}
