'use client';

import { useEffect, useRef } from 'react';
import { Canvas, Rect, Circle, FabricText } from 'fabric';

interface FabricCanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function FabricCanvas({
  width = 800,
  height = 600,
  className = ''
}: FabricCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric canvas
    const canvas = new Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#1e1e2e',
    });

    fabricRef.current = canvas;

    // Add sample shapes
    const rect = new Rect({
      left: 100,
      top: 100,
      fill: '#6366f1',
      width: 100,
      height: 100,
      rx: 10,
      ry: 10,
    });

    const circle = new Circle({
      left: 250,
      top: 100,
      fill: '#f472b6',
      radius: 50,
    });

    const text = new FabricText('Fabric.js Canvas', {
      left: 100,
      top: 250,
      fill: '#ffffff',
      fontSize: 24,
      fontFamily: 'Arial',
    });

    canvas.add(rect, circle, text);
    canvas.renderAll();

    // Cleanup
    return () => {
      canvas.dispose();
    };
  }, [width, height]);

  return (
    <div className={`fabric-canvas-container ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
}
