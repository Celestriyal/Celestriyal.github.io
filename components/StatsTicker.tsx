'use client';

import { motion } from 'framer-motion';

export default function StatsTicker() {
  const items = [
    "SYS.ONLINE", "LATENCY: 12ms", "REGION: ASIA-SOUTH", "BUILD: v2.4.0", 
    "REACT", "NEXT.JS", "KOTLIN", "THREE.JS", "WEBGL", "FIREBASE", 
    "DESIGN", "ARCH", "DEPLOY", "SCALE", "SECURE"
  ];

  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-black/20 backdrop-blur-sm py-4 select-none">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 font-mono text-xs md:text-sm text-white/60 tracking-widest">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
