'use client';

import { useEffect, useRef } from 'react';
import { Canvas as FabricCanvas, Path, Circle } from 'fabric';

export default function FabricSketch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasElRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const canvas = new FabricCanvas(canvasElRef.current, {
      width,
      height,
      backgroundColor: '#111111',
      selection: false,
    });

    fabricRef.current = canvas;

    const accentColor = '#4fffb0';
    const dimColor = '#4fffb030';

    const drawNamePath = () => {
      const pathData =
        'M 60 200 L 90 120 L 120 200 M 75 170 L 105 170 ' +
        'M 140 120 L 140 200 M 140 120 L 170 120 M 140 160 L 165 160 M 140 200 L 170 200';

      const path = new Path(pathData, {
        stroke: accentColor,
        strokeWidth: 2,
        fill: 'transparent',
        selectable: false,
        evented: false,
        opacity: 0,
      });

      canvas.add(path);

      let opacity = 0;
      const fadeIn = setInterval(() => {
        opacity += 0.02;
        path.set({ opacity: Math.min(opacity, 0.8) });
        canvas.renderAll();
        if (opacity >= 0.8) clearInterval(fadeIn);
      }, 16);
    };

    const addFloatingCircles = () => {
      for (let i = 0; i < 12; i++) {
        const circle = new Circle({
          left: Math.random() * width,
          top: Math.random() * height,
          radius: Math.random() * 20 + 5,
          fill: 'transparent',
          stroke: i % 3 === 0 ? accentColor : dimColor,
          strokeWidth: 1,
          selectable: false,
          evented: false,
          opacity: Math.random() * 0.4 + 0.1,
        });

        canvas.add(circle);

        const speed = Math.random() * 0.5 + 0.2;
        const angle = Math.random() * Math.PI * 2;
        let dx = Math.cos(angle) * speed;
        let dy = Math.sin(angle) * speed;

        const animate = () => {
          const left = circle.get('left') ?? 0;
          const top = circle.get('top') ?? 0;

          if (left <= 0 || left >= width) dx = -dx;
          if (top <= 0 || top >= height) dy = -dy;

          circle.set({ left: left + dx, top: top + dy });
          canvas.renderAll();
        };

        const interval = setInterval(animate, 30);
        circle.set({ data: { interval } } as Record<string, unknown>);
      }
    };

    const addMouseTrail = () => {
      const points: Circle[] = [];
      const maxPoints = 20;

      canvas.on('mouse:move', (opt) => {
        const pointer = canvas.getViewportPoint(opt.e);
        const dot = new Circle({
          left: pointer.x - 3,
          top: pointer.y - 3,
          radius: 3,
          fill: accentColor,
          selectable: false,
          evented: false,
          opacity: 0.6,
        });

        canvas.add(dot);
        points.push(dot);

        if (points.length > maxPoints) {
          const old = points.shift();
          if (old) canvas.remove(old);
        }

        points.forEach((p, idx) => {
          p.set({ opacity: (idx / points.length) * 0.6 });
        });

        canvas.renderAll();
      });
    };

    drawNamePath();
    addFloatingCircles();
    addMouseTrail();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      canvas.setDimensions({ width: w, height: h });
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => {
      observer.disconnect();
      canvas.getObjects().forEach((obj) => {
        const data = (obj as unknown as { data?: { interval?: ReturnType<typeof setInterval> } }).data;
        if (data?.interval) clearInterval(data.interval);
      });
      canvas.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <canvas ref={canvasElRef} />
    </div>
  );
}
