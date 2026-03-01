'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FluidBackgroundProps {
  opacity?: number;
  scrollProgress?: MotionValue<number>;
}

export default function FluidBackground({ opacity = 1, scrollProgress }: FluidBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  // Default motion value if none provided (fallback)
  const defaultProgress = useTransform(() => 0);
  const progress = scrollProgress || defaultProgress;

  // Majestic Cosmic Palette
  // Deep Indigo -> Midnight Purple
  const color1 = useTransform(progress, [0, 0.25], ["hsla(230, 85%, 55%, 0.35)", "hsla(260, 80%, 45%, 0.4)"]); 
  // Aurora Teal -> Deep Emerald
  const color2 = useTransform(progress, [0, 0.25], ["hsla(175, 90%, 50%, 0.25)", "hsla(160, 100%, 35%, 0.3)"]);
  // Royal Amethyst -> Cosmic Crimson
  const color3 = useTransform(progress, [0, 0.25], ["hsla(285, 80%, 60%, 0.3)", "hsla(320, 90%, 45%, 0.3)"]);
  // Ether Gold -> Sunburst Amber
  const color4 = useTransform(progress, [0, 0.25], ["hsla(45, 100%, 65%, 0.2)", "hsla(30, 100%, 55%, 0.25)"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-0 z-[-1] overflow-hidden transition-opacity duration-300 pointer-events-none"
      style={{ opacity }}
    >
      <div className="absolute inset-0 opacity-40 filter blur-[120px]">
        {/* Blob 1 - Primary Blue -> Red */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vh] rounded-full mix-blend-screen"
          style={{ backgroundColor: color1 }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 2 - Secondary Mint -> Orange */}
        <motion.div
          className="absolute top-[20%] right-[-10%] h-[60vh] w-[60vh] rounded-full mix-blend-screen"
          style={{ backgroundColor: color2 }}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Blob 3 - Purple -> Yellow */}
        <motion.div
          className="absolute bottom-[-10%] left-[20%] h-[50vh] w-[50vh] rounded-full mix-blend-screen"
          style={{ backgroundColor: color3 }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Blob 4 - Blue -> Hot Pink */}
        <motion.div
          className="absolute bottom-[10%] right-[10%] h-[40vh] w-[40vh] rounded-full mix-blend-screen"
          style={{ backgroundColor: color4 }}
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
    </div>
  );
}
