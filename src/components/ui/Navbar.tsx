'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1.8, ease: 'power3.out' }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 z-50 w-full py-4 transition-colors duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ opacity: 0 }}
    >
      <div className="section-container flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl tracking-wider text-foreground"
          data-cursor-hover
        >
          AA.
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
                data-cursor-hover
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:iareebafzal1122@gmail.com"
          className="hidden rounded-full border border-accent/30 px-4 py-1 font-mono text-xs uppercase tracking-wider text-accent transition-all hover:bg-accent/10 md:block"
          data-cursor-hover
        >
          Get In Touch
        </a>
      </div>
    </nav>
  );
}
