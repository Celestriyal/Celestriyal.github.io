'use client';

import { motion } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Smartphone, 
  Layers, 
  Palette, 
  Binary,
  Globe
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const SkillTile = ({ 
  title, 
  skills, 
  className, 
  delay, 
  icon: Icon,
  accentColor = "rgba(255, 255, 255, 0.05)"
}: { 
  title: string, 
  skills: string[], 
  className?: string, 
  delay: number,
  icon: any,
  accentColor?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <SpotlightCard 
        className="h-full flex flex-col justify-between group relative overflow-hidden border-white/5 bg-white/[0.03]"
        spotlightColor={accentColor}
      >
        <div className="relative z-10">
          <div className="mb-3 sm:mb-4 inline-flex p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-500">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/50 group-hover:text-white transition-colors" />
          </div>
          
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
            {title}
          </h3>
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((skill) => (
              <span 
                key={skill} 
                className="px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest bg-white/5 text-white/40 rounded-full border border-white/5 group-hover:text-white/80 group-hover:border-white/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Static decorative element */}
        <div className="absolute -bottom-2 -right-2 opacity-5 transition-opacity group-hover:opacity-10">
          <Icon className="w-16 h-16 sm:w-24 sm:h-24 text-white rotate-12" />
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default function SkillsBento() {
  return (
    <section className="relative w-full py-20 md:py-32 px-4 sm:px-6 md:px-24 max-w-7xl mx-auto overflow-visible">
      
      {/* Background Majestic Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="text-center mb-14 md:mb-24 relative">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-white/30 font-mono text-xs uppercase tracking-[0.5em] mb-4 block"
        >
          My Capabilities
        </motion.span>
        <h2 className="text-4xl sm:text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none">
          Stack <span className="text-white/10">&</span> <br/> 
          <span className="italic text-white/50">Expertise</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6 auto-rows-auto md:auto-rows-[240px]">
        {/* Full Stack */}
        <SkillTile 
          title="Engineering" 
          icon={Globe}
          skills={["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"]}
          className="col-span-2 md:col-span-2 md:row-span-2"
          delay={0.1}
          accentColor="rgba(59, 130, 246, 0.1)"
        />

        {/* 3D & Vision */}
        <SkillTile 
          title="Visual Art" 
          icon={Layers}
          skills={["UE5", "Blender", "Three.js", "Shaders"]}
          className="col-span-2 md:col-span-2 md:row-span-1"
          delay={0.2}
          accentColor="rgba(168, 85, 247, 0.1)"
        />

        {/* Mobile */}
        <SkillTile 
          title="Mobile" 
          icon={Smartphone}
          skills={["Kotlin", "Firebase", "Room DB"]}
          className="col-span-1 md:col-span-1 md:row-span-1"
          delay={0.3}
          accentColor="rgba(34, 211, 238, 0.1)"
        />

        {/* IoT */}
        <SkillTile 
          title="IoT" 
          icon={Cpu}
          skills={["Arduino", "ESP32", "C++"]}
          className="col-span-1 md:col-span-1 md:row-span-2"
          delay={0.4}
          accentColor="rgba(245, 158, 11, 0.1)"
        />

        {/* Design */}
        <SkillTile 
          title="Design" 
          icon={Palette}
          skills={["Figma", "UI/UX", "Motion Graphics"]}
          className="col-span-2 md:col-span-2 md:row-span-1"
          delay={0.5}
          accentColor="rgba(236, 72, 153, 0.1)"
        />
      </div>
    </section>
  );
}
