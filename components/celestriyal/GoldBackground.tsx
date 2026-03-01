'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GoldBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] bg-[#030303] overflow-hidden pointer-events-none">
      
      {/* Dynamic Golden Aura Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#f6e27a]/20 blur-[2px]"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.3
            }}
            animate={{ 
              y: [null, "-20%"],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            style={{
              width: Math.random() * 4 + "px",
              height: Math.random() * 4 + "px",
            }}
          />
        ))}
      </div>

      {/* Deep Metallic Gradients (Molten Gold) */}
      <div className="absolute inset-0 filter blur-[120px] opacity-20">
        <motion.div
          className="absolute top-[-20%] left-[-10%] h-[80vh] w-[80vh] rounded-full mix-blend-screen bg-gradient-to-br from-[#3a2d0f] via-[#c3a343] to-transparent"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-[-20%] right-[-10%] h-[90vh] w-[90vh] rounded-full mix-blend-screen bg-gradient-to-tr from-[#3a2d0f] via-[#8d743a] to-transparent"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Silk Thread Glimmer (Subtle dynamic lines) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <filter id="goldGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <motion.path
          d="M -100 100 Q 400 300 1200 100"
          stroke="#f6e27a"
          strokeWidth="0.5"
          fill="none"
          filter="url(#goldGlow)"
          animate={{
            d: [
              "M -100 100 Q 400 300 1200 100",
              "M -100 150 Q 500 50 1200 150",
              "M -100 100 Q 400 300 1200 100"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M -100 800 Q 600 600 1200 800"
          stroke="#c3a343"
          strokeWidth="0.5"
          fill="none"
          filter="url(#goldGlow)"
          animate={{
            d: [
              "M -100 800 Q 600 600 1200 800",
              "M -100 750 Q 500 850 1200 750",
              "M -100 800 Q 600 600 1200 800"
            ]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
      </svg>

      {/* Fine Metallic Grain */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none" />
    </div>
  );
}
