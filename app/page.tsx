'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import ArtisticBackground from '../components/ArtisticBackground';
import FluidBackground from '../components/FluidBackground';
import SkillsSystem from '../components/SkillsSystem';
import ProjectsSystem from '../components/ProjectsSystem';
import ContactSection from '../components/ContactSection';
import Starfield from '../components/Starfield';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgShift, setBgShift] = useState(0);
  const [blackout, setBlackout] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Fluid Background Opacity: Visible at start, fades out completely before Skills section (approx 0.36)
  const fluidOpacity = useTransform(scrollYProgress, [0.2, 0.35], [1, 0]);

  // Dynamic Background Engine
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 1. Initial Color Shift (Hero -> Philosophy)
    const shift = Math.min(Math.max(latest * 3.3, 0), 1);
    setBgShift(shift);

    // 2. Fade to Black (Philosophy -> Skills)
    const fade = Math.min(Math.max((latest - 0.25) * 4, 0), 1);
    setBlackout(fade);
  });

  return (
    <main ref={containerRef} className="relative min-h-[500vh] font-sans selection:bg-white selection:text-black">
      
      {/* BACKGROUND LAYERS */}
      <motion.div style={{ opacity: fluidOpacity }}>
        <FluidBackground scrollProgress={scrollYProgress} />
      </motion.div>
      <ArtisticBackground shift={bgShift} blackout={blackout} />
      <Starfield opacity={blackout} />
      
      {/* Fixed UI Elements */}
      <div className="fixed top-8 left-8 z-50 flex items-center gap-3 mix-blend-difference text-white font-mono text-xs tracking-widest">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={32} 
          height={32} 
          className="rounded-full overflow-hidden object-cover"
        />
        <span className="md:hidden">ASHFAQ</span>
        <span className="hidden md:inline">ASHFAQ — PORTFOLIO ©2026</span>
      </div>

      {/* Navigation Buttons */}
      <motion.div 
        style={{ opacity: heroOpacity }}
        className="fixed top-8 right-8 z-50 flex gap-4 md:gap-8 mix-blend-difference text-white font-mono text-xs tracking-widest"
      >
        <button 
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="hover:opacity-70 transition-opacity"
        >
          PROJECTS
        </button>
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="hover:opacity-70 transition-opacity"
        >
          CONTACT
        </button>
      </motion.div>
      
      {/* HERO SECTION */}
      <motion.section 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <h1 className="text-[18vw] font-black leading-none tracking-tighter text-white mix-blend-overlay">
          ASHFAQ
        </h1>
        
        <div className="mt-2 text-center text-sm md:text-3xl font-light tracking-[0.2em] md:tracking-[0.3em] text-white mix-blend-difference uppercase px-4">
          Artist • Developer • Creator
        </div>

        <div className="absolute bottom-12 flex flex-col md:flex-row justify-between items-center w-[90vw] gap-2 md:gap-0 mix-blend-difference text-white font-mono text-[10px] md:text-sm uppercase opacity-70">
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
        <div id="projects">
          <ProjectsSystem />
        </div>

        {/* CONTACT SECTION */}
        <div id="contact">
          <ContactSection />
        </div>

      </div>
    </main>
  );
}