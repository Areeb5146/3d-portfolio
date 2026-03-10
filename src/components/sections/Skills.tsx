'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  title: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Core',
    skills: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    title: '3D / Canvas',
    skills: ['Three.js', 'React Three Fiber', 'WebGL', 'Fabric.js', 'GLSL Shaders', 'Canvas API'],
  },
  {
    title: 'Frameworks',
    skills: ['React.js', 'Next.js', 'Angular', 'Vue.js', 'Redux', 'RxJS'],
  },
  {
    title: 'Tools & Animation',
    skills: ['GSAP', 'Framer Motion', 'Git', 'Figma', 'Webpack', 'Vite'],
  },
];

export default function Skills() {
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

      const categories = sectionRef.current?.querySelectorAll('.skill-category');
      if (categories) {
        categories.forEach((cat) => {
          const tags = cat.querySelectorAll('.skill-tag');
          gsap.fromTo(
            tags,
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              stagger: 0.05,
              ease: 'power3.out',
              scrollTrigger: { trigger: cat, start: 'top 85%' },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills">
      <div className="section-container">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          04 / Skills
        </div>
        <h2
          ref={headingRef}
          className="font-display text-5xl tracking-wide text-foreground md:text-7xl"
          style={{ opacity: 0 }}
        >
          TOOLS OF
          <br />
          <span className="text-accent">THE TRADE</span>
        </h2>

        <div className="mt-20 grid gap-12 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className="skill-category">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag rounded-full border border-foreground/10 bg-surface px-3 py-1 font-mono text-xs tracking-wider text-foreground/80 transition-all hover:border-accent/30 hover:text-accent"
                    style={{ opacity: 0 }}
                    data-cursor-hover
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
