'use client';

import { motion } from 'framer-motion';
import { 
  Camera, 
  Monitor, 
  Layers, 
  Sparkles, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import './gold.css';
import GoldBackground from '../../components/celestriyal/GoldBackground';
import SmokeSequence from '../../components/celestriyal/SmokeSequence';
import SpotlightCard from '../../components/SpotlightCard';

const ShowcaseItem = ({ src, title, delay }: { src: string, title: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
    className="group relative overflow-hidden rounded-[3rem] border border-white/5 h-[400px] md:h-[600px]"
  >
    <Image 
      src={src} 
      alt={title} 
      fill 
      className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
    <div className="absolute bottom-10 left-10 z-10">
      <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h4>
      <div className="mt-2 w-12 h-[1px] bg-[#f6e27a]"></div>
    </div>
  </motion.div>
);

const ServiceTile = ({ 
  title, 
  desc, 
  icon: Icon, 
  className 
}: { 
  title: string, 
  desc: string, 
  icon: any, 
  className?: string 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={className}
  >
    <SpotlightCard 
      className="h-full group bg-white/[0.01] border-white/5 hover:border-[#f6e27a]/30 transition-all p-8 md:p-12 rounded-[2.5rem]"
      spotlightColor="rgba(246, 226, 122, 0.08)"
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 w-fit group-hover:scale-110 transition-transform">
            <Icon className="w-8 h-8 text-[#f6e27a]" />
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-gold-liquid transition-colors">
            {title}
          </h3>
          <p className="text-white/40 font-light leading-relaxed italic">
            {desc}
          </p>
        </div>
        
        <div className="mt-8 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 group-hover:text-[#f6e27a] transition-colors">
          Capability — 01 <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </SpotlightCard>
  </motion.div>
);

export default function CelestriyalPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-[#f6e27a] selection:text-black overflow-x-hidden">
      
      <GoldBackground />

      {/* LUXURY NAV BAR */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-xl font-bold tracking-[0.3em] uppercase">
          Ashfaq — 
        </Link>
        <Link href="/celestriyal" className="text-xl font-black tracking-[0.3em] uppercase text-[#f6e27a] hover:text-gold-liquid transition-all">
          Celestriyal
        </Link>
        <div className="hidden md:flex gap-12 font-mono text-[10px] tracking-[0.5em] uppercase text-white/60">
          <Link href="#services" className="hover:text-[#f6e27a] transition-colors">Capabilities</Link>
          <Link href="#contact" className="hover:text-[#f6e27a] transition-colors">Inquiry</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col items-center justify-center px-6 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="text-center z-10"
        >
          <motion.h1 
            className="text-[12vw] font-black leading-none tracking-tighter uppercase text-gold-liquid gold-glint-pro px-12 pb-4"
          >
            Celestriyal
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
            className="mt-6 text-sm md:text-2xl font-light tracking-[0.5em] uppercase text-white/80"
          >
            Digital Couture <span className="mx-4">•</span> Cinematic Realism
          </motion.div>
        </motion.div>

        {/* Floating Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#f6e27a]/5 rounded-full blur-[150px] -z-10 animate-pulse"></div>
      </section>

      {/* MANIFESTO SECTION WITH SMOKE */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <SmokeSequence />
        </div>
        
        <div className="relative z-10 py-48 px-6 md:px-24">
          <div className="max-w-6xl mx-auto border-t border-white/10 pt-24 grid grid-cols-1 md:grid-cols-2 gap-20 bg-black/20 backdrop-blur-sm rounded-[4rem] p-12 md:p-24 border border-white/5">
            <div className="space-y-12">
              <span className="text-[#f6e27a] font-mono text-xs uppercase tracking-[0.5em]">The Manifesto</span>
              <h2 className="text-4xl md:text-7xl font-bold leading-[0.9] text-white uppercase tracking-tighter">
                We bridge the gap <br/> 
                between <span className="italic text-white/20 underline decoration-1 underline-offset-[12px]">physical reality</span> <br/>
                and digital dreams.
              </h2>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-md italic">
                "Founded on the principle of aesthetic precision, Celestriyal creates high-fidelity CGI, cinematic VFX, and architectural web experiences for the bold."
              </p>
              <div className="mt-12 w-24 h-[1px] bg-[#f6e27a]/50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* THE SHOWCASE (NEW IMAGES) */}
      <section className="py-32 px-6 md:px-24 max-w-7xl mx-auto">
        <div className="mb-24 text-center">
           <h3 className="text-white/20 font-mono text-xs uppercase tracking-[1em] mb-6">Visual Portfolio</h3>
           <h2 className="text-5xl md:text-8xl font-black text-gold-liquid uppercase tracking-tighter">The Showcase</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <ShowcaseItem src="/newme/0056.png" title="Hyper-Real Renders" delay={0.1} />
           <ShowcaseItem src="/newme/0075.png" title="Cinematic Environments" delay={0.2} />
           <div className="md:col-span-2">
             <ShowcaseItem src="/newme/0348.png" title="Atmospheric Motion" delay={0.3} />
           </div>
        </div>
      </section>

      {/* CAPABILITIES (BENTO GRID) */}
      <section id="services" className="py-32 px-6 md:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[400px]">
          <ServiceTile 
            title="CGI & MOTION" 
            desc="Hyper-realistic 3D visualizations and high-fidelity product motion graphics in Unreal Engine 5."
            icon={Camera}
            className="md:col-span-2"
          />
          <ServiceTile 
            title="WEB ARCH" 
            desc="Architecting digital flagships. We build high-performance, immersive websites with React and GLSL."
            icon={Monitor}
            className="md:col-span-2"
          />
          <ServiceTile 
            title="VFX & POST" 
            desc="Seamless visual effects integration and cinematic color grading for high-end digital media."
            icon={Layers}
            className="md:col-span-2"
          />
          <ServiceTile 
            title="STRATEGY" 
            desc="Conceptual branding and technical creative direction for forward-thinking industries."
            icon={Sparkles}
            className="md:col-span-2"
          />
        </div>
      </section>

      {/* CONTACT SECTION (HIGH END) */}
      <section id="contact" className="py-48 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-12">
           <h3 className="text-white/20 font-mono text-xs uppercase tracking-[1em]">Inquiry</h3>
           <h2 className="text-5xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none">
             Elevate <br/> Your <span className="italic text-gold-master">Vision</span>
           </h2>
           <div className="pt-12">
              <a 
                href="mailto:ashfaq072025@gmail.com" 
                className="group relative inline-flex items-center gap-8 px-12 py-6 rounded-full border border-[#f6e27a]/30 hover:border-[#f6e27a] transition-all duration-700 overflow-hidden gold-glint-pro"
              >
                <span className="text-lg md:text-2xl font-bold uppercase tracking-widest relative z-10 group-hover:text-black transition-colors">Commission Us</span>
                <ArrowRight className="w-8 h-8 relative z-10 group-hover:translate-x-2 transition-transform group-hover:text-black" />
                <div className="absolute inset-0 bg-gold-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </a>
           </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center px-6">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">
            ©2026 Celestriyal Studio — A Subsidiary of Ashfaq Global
          </p>
      </footer>

    </main>
  );
}
