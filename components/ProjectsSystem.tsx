'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const ProjectBox = ({ title, description, year, link, className, delay, comingSoon }: { title: string, description: string, year: string, link: string, className?: string, delay: number, comingSoon?: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-white/30 transition-all duration-500 group ${className}`}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
          {title}
        </h3>
        <span className="font-mono text-xs text-white/40">{year}</span>
      </div>
      
      <p className="text-lg text-white/60 font-light mb-8 leading-relaxed">
        {description}
      </p>

      {comingSoon ? (
        <span className="font-mono text-xs text-white/20 uppercase tracking-widest">In Development</span>
      ) : (
        <Link 
          href={link}
          className="inline-flex items-center gap-2 font-mono text-xs text-white group-hover:text-white transition-colors uppercase tracking-[0.2em]"
        >
          View Project
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      )}
    </motion.div>
  );
};

export default function ProjectsSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full z-20 bg-transparent py-32 px-6 md:px-24">
      
      {/* HEADER */}
      <div className="text-center mb-24">
        <h2 className="text-6xl md:text-8xl font-black text-white mix-blend-overlay tracking-tighter">
          MY PROJECTS
        </h2>
        <div className="w-24 h-[1px] bg-white/30 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* ABSTRACT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
        
        {/* SYNC - Main Project */}
        <div className="flex flex-col justify-start pt-0 md:pt-12">
          <ProjectBox 
            title="SYNC" 
            year="2024"
            description="A comprehensive Android social ecosystem featuring real-time messaging and cloud integration."
            link="/projects/sync"
            delay={0.1}
            className="md:scale-110 z-10 border-white/20"
          />
        </div>

        {/* COMING SOON 1 - Offset Down */}
        <div className="flex flex-col justify-center pt-0 md:pt-32">
          <ProjectBox 
            title="IN DEVELOPMENT" 
            year="2025"
            description=""
            link="#"
            delay={0.2}
            comingSoon={true}
          />
        </div>

        {/* COMING SOON 2 - Aligned Top */}
        <div className="flex flex-col justify-start">
          <ProjectBox 
            title="IN DEVELOPMENT" 
            year="2025"
            description=""
            link="#"
            delay={0.3}
            comingSoon={true}
          />
        </div>

      </div>

    </section>
  );
}
