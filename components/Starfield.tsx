'use client';

import { useEffect, useRef } from 'react';

export default function Starfield({ opacity = 0 }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random()
    }));

    let frameId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      if (opacity <= 0.01) return; // Don't draw if invisible

      ctx.fillStyle = '#ffffff';

      stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) star.y = height;

        ctx.globalAlpha = star.opacity * opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [opacity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-40 pointer-events-none transition-opacity duration-1000"
      style={{ opacity }}
    />
  );
}
