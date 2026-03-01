'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SmokeSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(340);
  const totalFrames = 111; // 450 - 340 + 1
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to frame number
  const frameIndex = useTransform(scrollYProgress, [0, 1], [340, 450]);

  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      setCurrentFrame(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [frameIndex]);

  // Preload images for smoothness
  useEffect(() => {
    for (let i = 340; i <= 450; i++) {
      const img = new Image();
      img.src = `/newme/smoke/${i.toString().padStart(4, '0')}.png`;
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <motion.img
          src={`/newme/smoke/${currentFrame.toString().padStart(4, '0')}.png`}
          alt="Smoke Animation"
          className="w-full h-full object-cover opacity-40 mix-blend-screen scale-110"
          style={{
            filter: 'hue-rotate(280deg) brightness(1.2)' // Tint it slightly purple/gold
          }}
        />
      </div>
    </div>
  );
}
