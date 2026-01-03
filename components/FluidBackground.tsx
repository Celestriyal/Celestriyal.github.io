'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FluidBackground({ opacity = 1 }: { opacity?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-0 z-[-1] overflow-hidden transition-opacity duration-300 pointer-events-none"
      style={{ opacity }}
    >
      <div className="absolute inset-0 opacity-50 filter blur-[80px]">
        {/* Blob 1 - Primary Blue */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vh] rounded-full bg-primary/40 mix-blend-screen"
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

        {/* Blob 2 - Secondary Mint */}
        <motion.div
          className="absolute top-[20%] right-[-10%] h-[60vh] w-[60vh] rounded-full bg-secondary/30 mix-blend-screen"
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

        {/* Blob 3 - Accent/Purple */}
        <motion.div
          className="absolute bottom-[-10%] left-[20%] h-[50vh] w-[50vh] rounded-full bg-purple-600/30 mix-blend-screen"
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

        {/* Blob 4 - Cyan/Blue */}
        <motion.div
          className="absolute bottom-[10%] right-[10%] h-[40vh] w-[40vh] rounded-full bg-blue-500/30 mix-blend-screen"
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
