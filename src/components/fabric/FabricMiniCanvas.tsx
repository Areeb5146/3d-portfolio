'use client';

import { useEffect, useRef } from 'react';
import { Canvas as FabricCanvas, Rect, Circle, FabricText } from 'fabric';

export default function FabricMiniCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const animFrameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!canvasElRef.current || !containerRef.current) return;

    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;

    const canvas = new FabricCanvas(canvasElRef.current, {
      width: w,
      height: h,
      backgroundColor: '#0a0a0a',
      selection: false,
    });
    fabricRef.current = canvas;

    const accent = '#4fffb0';

    // Draw animated shapes
    const rect = new Rect({
      left: w * 0.15,
      top: h * 0.25,
      width: 0,
      height: 0,
      fill: 'transparent',
      stroke: accent,
      strokeWidth: 1.5,
      rx: 6,
      ry: 6,
      selectable: false,
      evented: false,
    });

    const circle = new Circle({
      left: w * 0.55,
      top: h * 0.35,
      radius: 0,
      fill: 'transparent',
      stroke: accent,
      strokeWidth: 1.5,
      selectable: false,
      evented: false,
      opacity: 0.6,
    });

    const text = new FabricText('Designs Lab', {
      left: w * 0.15,
      top: h * 0.7,
      fill: accent,
      fontSize: 14,
      fontFamily: 'Space Mono, monospace',
      selectable: false,
      evented: false,
      opacity: 0,
    });

    canvas.add(rect, circle, text);

    let frame = 0;
    animFrameRef.current = setInterval(() => {
      frame++;

      const maxSize = Math.min(w * 0.3, 80);
      const currentSize = Math.min(frame * 2, maxSize);
      rect.set({ width: currentSize, height: currentSize * 0.8 });

      const maxRadius = Math.min(w * 0.12, 35);
      const currentRadius = Math.min(frame * 1.2, maxRadius);
      circle.set({ radius: currentRadius });

      if (frame > 30) {
        text.set({ opacity: Math.min((frame - 30) * 0.05, 0.8) });
      }

      // Reset animation loop
      if (frame > 120) {
        frame = 0;
        rect.set({ width: 0, height: 0 });
        circle.set({ radius: 0 });
        text.set({ opacity: 0 });
      }

      canvas.renderAll();
    }, 30);

    const observer = new ResizeObserver(() => {
      if (!containerRef.current) return;
      canvas.setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) clearInterval(animFrameRef.current);
      canvas.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <canvas ref={canvasElRef} />
    </div>
  );
}
