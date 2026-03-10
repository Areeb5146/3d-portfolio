'use client';

import { useEffect, useRef } from 'react';

const CODE_SNIPPETS = [
  'void main() {',
  'vec4 pos = modelViewMatrix * vec4(position, 1.0);',
  'gl_Position = projectionMatrix * pos;',
  'vUv = uv;',
  '}',
  'uniform float uTime;',
  'uniform vec2 uResolution;',
  'varying vec2 vUv;',
  'vec3 color = mix(vec3(0.31, 1.0, 0.69), vec3(0.0), dist);',
  'float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);',
  'gl_FragColor = vec4(color * intensity, 1.0);',
  'mat4 rotationMatrix = mat4(cos(a), -sin(a), 0.0, 0.0,',
  'float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);',
  'vec3 lightDir = normalize(uLightPos - worldPos.xyz);',
  'float diffuse = max(dot(normal, lightDir), 0.0);',
  'float spec = pow(max(dot(viewDir, reflect), 0.0), 32.0);',
  'const geometry = new THREE.BufferGeometry();',
  'const material = new THREE.ShaderMaterial({',
  'uniforms: { uTime: { value: 0 } },',
  'transparent: true, blending: THREE.AdditiveBlending,',
  '});',
  'renderer.setPixelRatio(Math.min(devicePixelRatio, 2));',
  'const particles = new Float32Array(count * 3);',
  'for (let i = 0; i < count; i++) {',
  'particles[i * 3] = (Math.random() - 0.5) * 10;',
  '}',
  'scene.add(new THREE.Mesh(geometry, material));',
  'camera.position.set(0, 0, 5);',
  'requestAnimationFrame(function render(t) {',
  'material.uniforms.uTime.value = t * 0.001;',
  'renderer.render(scene, camera);',
  '});',
  'precision highp float;',
  'attribute vec3 position;',
  'attribute vec2 uv;',
  'uniform mat4 projectionMatrix;',
  'uniform mat4 modelViewMatrix;',
  '#define PI 3.14159265359',
  'float sdSphere(vec3 p, float r) { return length(p) - r; }',
  'vec3 rayMarch(vec3 ro, vec3 rd) {',
  'float t = 0.0;',
  'for (int i = 0; i < 64; i++) {',
  'vec3 p = ro + rd * t;',
  'float d = sdSphere(p, 1.0);',
  'if (d < 0.001) break;',
  't += d;',
  'return ro + rd * t;',
];

// Build a long vertical string of code chars for each column to pick from
function buildCharPool(): string {
  const full = CODE_SNIPPETS.join('  ');
  // repeat it so columns never run out
  return full + full + full;
}

const CHAR_POOL = buildCharPool();

interface Column {
  x: number;
  y: number;
  speed: number;
  brightness: number;
  charOffset: number;   // position in CHAR_POOL to pick chars from
  trailLength: number;  // how many chars in the trail
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<Column[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const FONT_SIZE = 14;
    const TRAIL_MAX = 25;

    const initColumns = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const colCount = Math.ceil(w / FONT_SIZE);
      const cols: Column[] = [];

      for (let i = 0; i < colCount; i++) {
        cols.push({
          x: i * FONT_SIZE,
          y: Math.random() * h * -1,
          speed: Math.random() * 0.7 + 0.3,
          brightness: Math.random(),
          charOffset: Math.floor(Math.random() * CHAR_POOL.length),
          trailLength: Math.floor(Math.random() * 15) + 10,
        });
      }

      columnsRef.current = cols;
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Clear fully — no ghosting/shading artifacts
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${FONT_SIZE}px "JetBrains Mono", "Space Mono", monospace`;
      ctx.textBaseline = 'top';

      for (const col of columnsRef.current) {
        const trail = Math.min(col.trailLength, TRAIL_MAX);

        for (let j = 0; j < trail; j++) {
          const charY = col.y - j * FONT_SIZE;
          if (charY < -FONT_SIZE || charY > h) continue;

          const charIdx = (col.charOffset + j) % CHAR_POOL.length;
          const char = CHAR_POOL[charIdx];

          // Skip spaces for cleaner look
          if (char === ' ') continue;

          if (j === 0) {
            // Leading character — white
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.95;
          } else if (j === 1) {
            // Second char — bright mint
            ctx.fillStyle = '#4fffb0';
            ctx.globalAlpha = 0.9;
          } else {
            // Trail fades out
            const fade = 1 - j / trail;
            ctx.globalAlpha = fade * 0.6;
            if (col.brightness > 0.5) {
              ctx.fillStyle = '#4fffb0';
            } else {
              ctx.fillStyle = '#00aa55';
            }
          }

          ctx.fillText(char, col.x, charY);
        }

        ctx.globalAlpha = 1;

        // Move column down
        col.y += FONT_SIZE * col.speed;

        // Reset when trail fully exits viewport
        if (col.y - col.trailLength * FONT_SIZE > h) {
          col.y = Math.random() * -200 - 50;
          col.speed = Math.random() * 0.7 + 0.3;
          col.brightness = Math.random();
          col.charOffset = Math.floor(Math.random() * CHAR_POOL.length);
          col.trailLength = Math.floor(Math.random() * 15) + 10;
        }
      }
    };

    initColumns();

    // ~30fps
    intervalRef.current = setInterval(draw, 33);

    const handleResize = () => {
      initColumns();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.5) 45%, rgba(10,10,10,0.15) 100%)',
        }}
      />
    </>
  );
}
