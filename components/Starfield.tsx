'use client';

import { useEffect, useRef } from 'react';

export default function Starfield({ opacity = 0 }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const opacityRef = useRef<number>(opacity);
  const syncLoopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const starCount = width < 768 ? 110 : 200;
    const stars = Array.from({ length: starCount }).map(() => ({
      nx: Math.random(),
      ny: Math.random(),
      size: Math.random() * 1.8 + 0.3,
      speed: (Math.random() * 0.5 + 0.1) / Math.max(height, 600),
      alpha: Math.random(),
    }));

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    let frameId = 0;
    let isRunning = false;
    let disposed = false;

    const renderFrame = () => {
      const currentOpacity = opacityRef.current;
      canvas.style.opacity = String(currentOpacity);
      ctx.clearRect(0, 0, width, height);
      if (currentOpacity <= 0.01) return;

      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!prefersReducedMotion) {
          star.ny -= star.speed;
          if (star.ny < 0) star.ny = 1;
        }
        ctx.globalAlpha = star.alpha * currentOpacity;
        ctx.beginPath();
        ctx.arc(star.nx * width, star.ny * height, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      if (disposed) return;

      if (opacityRef.current <= 0.01) {
        isRunning = false;
        canvas.style.opacity = '0';
        ctx.clearRect(0, 0, width, height);
        return;
      }

      renderFrame();
      if (!prefersReducedMotion) {
        frameId = requestAnimationFrame(draw);
      } else {
        isRunning = false;
      }
    };

    const ensureLoop = () => {
      if (disposed) return;
      canvas.style.opacity = String(opacityRef.current);

      if (opacityRef.current <= 0.01) {
        if (isRunning) {
          cancelAnimationFrame(frameId);
          isRunning = false;
        }
        ctx.clearRect(0, 0, width, height);
        return;
      }

      if (prefersReducedMotion) {
        renderFrame();
        return;
      }

      if (!isRunning) {
        isRunning = true;
        frameId = requestAnimationFrame(draw);
      }
    };

    syncLoopRef.current = ensureLoop;

    const handleResize = () => {
      resizeCanvas();
      if (prefersReducedMotion && opacityRef.current > 0.01) {
        renderFrame();
      }
    };

    window.addEventListener('resize', handleResize);
    ensureLoop();

    return () => {
      disposed = true;
      syncLoopRef.current = null;
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    opacityRef.current = opacity;
    syncLoopRef.current?.();
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-40 pointer-events-none"
      style={{ opacity }}
    />
  );
}
