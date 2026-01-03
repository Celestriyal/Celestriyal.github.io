'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const SkillBox = ({ title, skills, className, delay }: { title: string, skills: string[], className?: string, delay: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-white/30 transition-all duration-500 group ${className}`}
    >
      <h3 className="text-2xl font-bold text-white mb-6 tracking-wide group-hover:text-white transition-colors">
        {title}
      </h3>
      <ul className="space-y-3">
        {skills.map((skill) => (
          <li key={skill} className="text-lg text-white/70 font-light border-b border-white/5 pb-2 last:border-0 group-hover:text-white/90 transition-colors">
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function SkillsSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full z-20 bg-transparent py-32 px-6 md:px-24">
      
      {/* HEADER */}
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-8xl font-black text-white mix-blend-overlay tracking-tighter">
          MY SKILLS
        </h2>
        <div className="w-24 h-[1px] bg-white/30 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* ABSTRACT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
        
        {/* 3D ARTIST - Aligned Top */}
        <div className="flex flex-col justify-start">
          <SkillBox 
            title="3D ARTIST" 
            skills={["Unreal Engine 5", "Blender", "Real-time Rendering", "Procedural Gen"]} 
            delay={0.1}
          />
        </div>

        {/* FULL STACK - Offset Down */}
        <div className="flex flex-col justify-center pt-0 md:pt-24">
          <SkillBox 
            title="FULL STACK" 
            skills={["Next.js / React", "Kotlin / Android Studio", "Figma / UI Design", "Node.js / Backend"]} 
            delay={0.2}
            className="md:scale-110 z-10 border-white/20 shadow-2xl shadow-white/5" 
          />
        </div>

        {/* IOT - Aligned Top (or slight offset) */}
        <div className="flex flex-col justify-start pt-0 md:pt-12">
          <SkillBox 
            title="HARDWARE & IoT" 
            skills={["Arduino", "ESP32", "Embedded C++", "Circuit Design", "Automation"]} 
            delay={0.3}
          />
        </div>

      </div>

    </section>
  );
}