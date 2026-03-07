'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ── Config ── */
const RING_CONFIG = [
  { radius: 2.2, speed: 0.25, labels: ['TypeScript', 'React', 'Next.js', 'Three.js'] },
  { radius: 3.6, speed: -0.18, labels: ['WebGL', 'GSAP', 'Tailwind', 'Fabric.js'] },
  { radius: 5.0, speed: 0.12, labels: ['Angular', 'Vue.js', 'GLSL', 'Node.js'] },
];

interface TextPhase {
  enterStart: number;
  enterEnd: number;
  exitStart: number;
  exitEnd: number;
}

const TEXT_PHASES: TextPhase[] = [
  { enterStart: 0.04, enterEnd: 0.12, exitStart: 0.20, exitEnd: 0.28 },
  { enterStart: 0.22, enterEnd: 0.32, exitStart: 0.42, exitEnd: 0.50 },
  { enterStart: 0.46, enterEnd: 0.56, exitStart: 0.72, exitEnd: 0.80 },
];

/* ── Helpers ── */
function smoothstep(a: number, b: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/* ── Three.js sprite creators ── */
function createSkillLabel(text: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#4fffb0';
  ctx.font = '36px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({
    map: texture, transparent: true, opacity: 0,
    depthTest: false, depthWrite: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(2, 0.5, 1);
  sprite.visible = false;
  return sprite;
}

function createSunSprite(): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 250);
  g.addColorStop(0, 'rgba(79,255,176,0.2)');
  g.addColorStop(0.4, 'rgba(79,255,176,0.06)');
  g.addColorStop(1, 'rgba(79,255,176,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(79,255,176,0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(256, 256, 70, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(79,255,176,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(256, 256, 100, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#4fffb0';
  ctx.font = 'bold 64px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ME', 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({
    map: texture, transparent: true, opacity: 0,
    depthTest: false, depthWrite: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(3.5, 3.5, 1);
  sprite.visible = false;
  return sprite;
}

function createOrbitRing(radius: number): THREE.Line {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 128; i++) {
    const a = (i / 128) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({
    color: 0x4fffb0, transparent: true, opacity: 0, depthTest: false,
  });
  const line = new THREE.Line(geo, mat);
  line.visible = false;
  return line;
}

export default function ScrollParticles() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const textContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef(0);

  /* ── Character-level text animation ── */
  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrollRef.current / total : 0;

      // sides[0]='right', sides[1]='left', sides[2]='right'
      // Exit slides toward the opposite side
      const exitDir = ['-100vw', '100vw', '-100vw'];

      TEXT_PHASES.forEach((phase, idx) => {
        const container = textContainersRef.current[idx];
        if (!container) return;

        const chars = container.querySelectorAll<HTMLSpanElement>('.wm-char');
        const charCount = chars.length;

        let isVisible = false;

        if (progress >= phase.enterStart && progress <= phase.enterEnd) {
          // Entering: chars fly up + slide in from side
          isVisible = true;
          const p = smoothstep(phase.enterStart, phase.enterEnd, progress);
          container.style.transform = `translateY(-50%) translateX(0)`;
          chars.forEach((span, i) => {
            const delay = i / charCount;
            const cp = smoothstep(delay * 0.6, delay * 0.6 + 0.5, p);
            span.style.transform = `translateY(${(1 - cp) * 50}px)`;
            span.style.opacity = String(cp * 0.12);
          });
        } else if (progress > phase.enterEnd && progress < phase.exitStart) {
          // Holding
          isVisible = true;
          container.style.transform = `translateY(-50%) translateX(0)`;
          chars.forEach((span) => {
            span.style.transform = 'translateY(0)';
            span.style.opacity = '0.12';
          });
        } else if (progress >= phase.exitStart && progress <= phase.exitEnd) {
          // Exiting: whole container slides toward opposite side + chars stagger out
          isVisible = true;
          const p = smoothstep(phase.exitStart, phase.exitEnd, progress);
          container.style.transform = `translateY(-50%) translateX(calc(${exitDir[idx]} * ${p}))`;
          chars.forEach((span, i) => {
            const delay = i / charCount;
            const cp = smoothstep(delay * 0.4, delay * 0.4 + 0.5, p);
            span.style.transform = `translateY(${cp * -30}px)`;
            span.style.opacity = String((1 - cp) * 0.12);
          });
        }

        container.style.visibility = isVisible ? 'visible' : 'hidden';
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* ── Three.js: solar system + ambient dust ── */
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50, window.innerWidth / window.innerHeight, 0.1, 100,
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Ambient dust ──
    const dustCount = 100;
    const dPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dPos[i * 3] = (Math.random() - 0.5) * 30;
      dPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      dPos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    const dMat = new THREE.PointsMaterial({
      color: 0x4fffb0, size: 1.5, transparent: true, opacity: 0.08,
      depthTest: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    scene.add(new THREE.Points(dGeo, dMat));

    // ── Solar system group ──
    const solarGroup = new THREE.Group();
    solarGroup.rotation.x = 0.55;
    scene.add(solarGroup);

    const sunSprite = createSunSprite();
    solarGroup.add(sunSprite);

    const orbitLines = RING_CONFIG.map(r => {
      const line = createOrbitRing(r.radius);
      solarGroup.add(line);
      return line;
    });

    const skillSprites: THREE.Sprite[] = [];
    const skillMeta: { ring: number; idx: number; total: number }[] = [];
    RING_CONFIG.forEach((ring, ri) => {
      ring.labels.forEach((label, li) => {
        const sprite = createSkillLabel(label);
        solarGroup.add(sprite);
        skillSprites.push(sprite);
        skillMeta.push({ ring: ri, idx: li, total: ring.labels.length });
      });
    });

    // ── Events ──
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let raf: number;
    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const animate = (time: number) => {
      raf = requestAnimationFrame(animate);
      const t = time * 0.001;
      const total = maxScroll();
      const progress = total > 0 ? scrollRef.current / total : 0;

      // ── Solar system (0.65 → 1.0) ──
      const solarAlpha = smoothstep(0.78, 0.88, progress);
      const showSolar = solarAlpha > 0.01;

      sunSprite.visible = showSolar;
      if (showSolar) {
        const pulse = 1 + Math.sin(t * 1.5) * 0.08;
        sunSprite.scale.set(3.5 * pulse, 3.5 * pulse, 1);
        (sunSprite.material as THREE.SpriteMaterial).opacity = solarAlpha;
      }

      for (const line of orbitLines) {
        line.visible = showSolar;
        (line.material as THREE.LineBasicMaterial).opacity = solarAlpha * 0.12;
      }

      for (let i = 0; i < skillSprites.length; i++) {
        const sprite = skillSprites[i];
        const meta = skillMeta[i];
        const ring = RING_CONFIG[meta.ring];

        sprite.visible = showSolar;
        if (showSolar) {
          const baseAngle = (meta.idx / meta.total) * Math.PI * 2;
          const angle = baseAngle + t * ring.speed;
          sprite.position.set(
            Math.cos(angle) * ring.radius,
            0,
            Math.sin(angle) * ring.radius,
          );
          (sprite.material as THREE.SpriteMaterial).opacity = solarAlpha;
        }
      }

      if (showSolar) {
        solarGroup.rotation.y = t * 0.05;
      }

      camera.position.z = 12 - Math.sin(progress * Math.PI) * 2;
      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);

      (sunSprite.material as THREE.SpriteMaterial).map?.dispose();
      (sunSprite.material as THREE.SpriteMaterial).dispose();
      for (const s of skillSprites) {
        (s.material as THREE.SpriteMaterial).map?.dispose();
        (s.material as THREE.SpriteMaterial).dispose();
      }
      for (const line of orbitLines) {
        line.geometry.dispose();
        (line.material as THREE.LineBasicMaterial).dispose();
      }
      dGeo.dispose();
      dMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const texts = ['WHAT I DO?', 'MY EXPERIENCE', 'MY WORKS'];
  // right=text anchored to right side, left=anchored to left side
  const sideClasses = [
    'right-[5%] text-right',
    'left-[5%] text-left',
    'right-[5%] text-right',
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* Three.js canvas */}
      <div ref={canvasRef} className="absolute inset-0" />

      {/* Text watermarks — character-by-character with lateral slide */}
      {texts.map((text, idx) => {
        const words = text.split(' ');
        return (
          <div
            key={text}
            ref={el => { textContainersRef.current[idx] = el; }}
            className={`fixed top-1/2 font-display leading-none tracking-wider text-accent ${sideClasses[idx]}`}
            style={{ visibility: 'hidden', fontSize: 'clamp(4rem, 10vw, 10rem)', transform: 'translateY(-50%)' }}
          >
            {words.map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split('').map((char, ci) => (
                  <span
                    key={ci}
                    className="wm-char inline-block"
                    style={{ opacity: 0 }}
                  >
                    {char}
                  </span>
                ))}
                {wi < words.length - 1 && (
                  <span className="wm-char inline-block" style={{ opacity: 0 }}>{'\u00A0'}</span>
                )}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}
