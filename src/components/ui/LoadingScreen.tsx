'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: 'power3.out' }
    )
      .to(logoRef.current, { opacity: 0, scale: 1.1, duration: 0.3, delay: 0.4 })
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: 'power4.inOut',
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
    >
      <div ref={logoRef} className="text-center" style={{ opacity: 0 }}>
        <div className="font-display text-5xl tracking-wider text-foreground">AA.</div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
          Loading
        </div>
      </div>
    </div>
  );
}
