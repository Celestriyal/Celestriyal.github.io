'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Github, AppWindow } from 'lucide-react';
import Link from 'next/link';
import SpotlightCard from './SpotlightCard';

const ProjectCard = ({ 
  title, 
  year, 
  description, 
  tags, 
  link, 
  className, 
  color,
  isLarge = false 
}: { 
  title: string, 
  year: string, 
  description: string, 
  tags: string[], 
  link: string, 
  className?: string, 
  color: string,
  isLarge?: boolean
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Link href={link} className="block h-full group">
        <SpotlightCard 
          className="h-full flex flex-col justify-between relative overflow-hidden bg-white/[0.02] border-white/5 backdrop-blur-3xl p-0" 
          spotlightColor={color}
        >
          {/* Inner Content Padding */}
          <div className="p-8 md:p-10 flex flex-col h-full justify-between relative z-10">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em]">
                  {year}
                </span>
                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:border-white transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-black transition-colors" />
                </div>
              </div>

              <h3 className={`${isLarge ? 'text-4xl md:text-7xl' : 'text-3xl md:text-5xl'} font-black text-white tracking-tighter uppercase leading-[0.85] mb-6 transition-transform group-hover:translate-x-1`}>
                {title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono text-white/20 border border-white/10 px-2 py-1 rounded uppercase tracking-widest group-hover:border-white/30 group-hover:text-white/40 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-base md:text-lg text-white/40 font-light leading-relaxed max-w-sm group-hover:text-white/60 transition-colors italic">
              {description}
            </p>
          </div>

          {/* Majestic Background Glows */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors"></div>
        </SpotlightCard>
      </Link>
    </motion.div>
  );
};

export default function ProjectsBento() {
  return (
    <section className="relative w-full py-32 px-6 md:px-24 max-w-7xl mx-auto">
      
      <div className="mb-20">
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="flex flex-col gap-2"
        >
          <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.8em]">Selected Works</span>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            Curated <br/> <span className="italic text-white/20">Portfolio</span>
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
        {/* SYNC - The Flagship */}
        <ProjectCard 
          title="SYNC"
          year="2025"
          description="A cloud-native Android ecosystem for seamless academic and social collaboration."
          tags={["Kotlin", "Firebase", "Design"]}
          link="https://celestriyal.tech/sync"
          color="rgba(80, 200, 120, 0.1)"
          className="md:col-span-4 md:row-span-2"
          isLarge={true}
        />

        {/* VIBE WIRE - The Social */}
        <ProjectCard 
          title="VIBE WIRE"
          year="2026"
          description="Ephemeral chat room"
          tags={["Next.js", "GLSL"]}
          link="https://ashfaqcode.me/Vibe-Wire"
          color="rgba(64, 121, 255, 0.1)"
          className="md:col-span-2 md:row-span-1"
        />

        {/* CORE - The Engine */}
        <ProjectCard 
          title="CORE"
          year="2025"
          description="Interactive physics and UI bridge."
          tags={["Three.js", "React"]}
          link="#"
          color="rgba(255, 100, 100, 0.1)"
          className="md:col-span-2 md:row-span-1"
        />

        {/* FUTURE - Placeholder */}
        <div className="md:col-span-3 md:row-span-1 border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center group hover:bg-white/5 transition-colors">
            <span className="text-white/10 font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4 group-hover:text-white/20">Mystery</span>
            <p className="text-white/20 text-xs font-mono uppercase tracking-widest group-hover:text-white/40 underline underline-offset-8">Coming late 2026</p>
        </div>

        {/* CONNECT - Link to more */}
        <div className="md:col-span-3 md:row-span-1 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] border border-white/5 p-12 flex flex-col justify-between group">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white transition-all">
                <Github className="w-6 h-6 text-white group-hover:text-black transition-colors" />
            </div>
            <div>
                <h4 className="text-2xl font-bold text-white mb-2">Open Source</h4>
                <p className="text-white/40 text-sm leading-relaxed mb-6">Explore the mechanics behind my projects on GitHub.</p>
                <a href="https://github.com/Celestriyal" target="_blank" className="text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                    View Repositories <ArrowUpRight className="w-3 h-3" />
                </a>
            </div>
        </div>
      </div>
    </section>
  );
}
