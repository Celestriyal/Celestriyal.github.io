'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import ArtisticBackground from '../components/ArtisticBackground';
import MotionGraphics from '../components/MotionGraphics';
import SkillsSystem from '../components/SkillsSystem';
import ProjectsSystem from '../components/ProjectsSystem';
import ContactSection from '../components/ContactSection';
import Starfield from '../components/Starfield';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgShift, setBgShift] = useState(0);
  const [blackout, setBlackout] = useState(0);
  const [gridOpacity, setGridOpacity] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Dynamic Background Engine
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 1. Initial Color Shift (Hero -> Philosophy)
    const shift = Math.min(Math.max(latest * 3.3, 0), 1);
    setBgShift(shift);

    // 2. Fade to Black (Philosophy -> Skills)
    const fade = Math.min(Math.max((latest - 0.25) * 4, 0), 1);
    setBlackout(fade);

    // 3. Cyber Grid Reveal (Projects -> Contact)
    // Starts appearing at 70% scroll
    const grid = Math.min(Math.max((latest - 0.7) * 10, 0), 1);
    setGridOpacity(grid);
  });

  return (
    <main ref={containerRef} className="relative min-h-[500vh] font-sans selection:bg-white selection:text-black bg-black">
      
      {/* BACKGROUND LAYERS */}
      <ArtisticBackground shift={bgShift} blackout={blackout} />
      <Starfield opacity={blackout * (1 - gridOpacity)} />
      <MotionGraphics opacity={gridOpacity} />
      
      {/* Fixed UI Elements */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference text-white font-mono text-xs tracking-widest">
        ASHFAQ — PORTFOLIO ©2026
      </div>
      
      {/* HERO SECTION */}
      <motion.section 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <h1 className="text-[18vw] font-black leading-none tracking-tighter text-white mix-blend-overlay">
          ASHFAQ
        </h1>
        
        <div className="mt-2 text-xl md:text-3xl font-light tracking-[0.3em] text-white mix-blend-difference uppercase">
          Artist • Developer • Creator
        </div>

        <div className="absolute bottom-12 flex justify-between w-[90vw] mix-blend-difference text-white font-mono text-xs md:text-sm uppercase opacity-70">
          <span>Based in India</span>
          <span>Scroll to Explore</span>
        </div>
      </motion.section>

      {/* SCROLLABLE CONTENT */}
      <div className="relative z-20 w-full pt-[100vh]">
        
        {/* PHILOSOPHY */}
        <section className="min-h-[80vh] flex items-center justify-center px-6 md:px-24">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-7xl font-bold leading-tight text-white mix-blend-overlay">
              "I don't just write code. I sculpt <span className="italic">digital experiences</span> that live at the intersection of logic and pure chaos."
            </h2>
          </div>
        </section>

        {/* SKILLS SYSTEM */}
        <SkillsSystem />

        {/* PROJECTS SYSTEM */}
        <ProjectsSystem />

        {/* CONTACT SECTION */}
        <ContactSection />

      </div>
    </main>
  );
}