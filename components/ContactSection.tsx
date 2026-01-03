'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight } from 'lucide-react';
import SectionContainer from './SectionContainer';
import SpotlightCard from './SpotlightCard';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "ashfaq072025@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionContainer id="contact" className="relative py-24 md:py-32">
      
      {/* Header Content */}
      <div className="max-w-5xl mx-auto px-6 mb-16 md:mb-24 text-center">
        <h2 className="text-sm md:text-base font-mono text-cyan-400 mb-6 tracking-widest uppercase">
          What's Next?
        </h2>
        <h3 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Let's work together.
        </h3>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          Currently open to new opportunities, collaborations, and building the future of the web. 
          Have an idea? Let's bring it to life.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        {/* Email Card - Click to Copy */}
        <div onClick={handleCopy} className="cursor-pointer group">
          <SpotlightCard className="h-full flex flex-col items-start justify-between min-h-[200px]" spotlightColor="rgba(34, 211, 238, 0.15)">
            <div className="mb-8 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50 group-hover:border-cyan-500/30 transition-colors">
              <Mail className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 text-sm font-mono uppercase tracking-wider">Email</span>
                {copied ? (
                  <span className="flex items-center text-emerald-400 text-xs font-bold gap-1 bg-emerald-400/10 px-2 py-1 rounded">
                    <Check className="w-3 h-3" /> COPIED
                  </span>
                ) : (
                  <Copy className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                )}
              </div>
              <p className="text-xl md:text-2xl font-semibold text-white truncate w-full">
                {email}
              </p>
            </div>
          </SpotlightCard>
        </div>

        {/* LinkedIn Card */}
        <a 
          href="https://www.linkedin.com/in/mohammed-ashfaq120/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group block"
        >
          <SpotlightCard className="h-full flex flex-col items-start justify-between min-h-[200px]" spotlightColor="rgba(59, 130, 246, 0.15)">
            <div className="mb-8 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50 group-hover:border-blue-500/30 transition-colors">
              <Linkedin className="w-6 h-6 text-blue-400" />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 text-sm font-mono uppercase tracking-wider">Connect</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="text-xl md:text-2xl font-semibold text-white">
                LinkedIn
              </p>
            </div>
          </SpotlightCard>
        </a>

        {/* GitHub Card */}
        <a 
          href="https://github.com/Celestriyal" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group block"
        >
          <SpotlightCard className="h-full flex flex-col items-start justify-between min-h-[200px]" spotlightColor="rgba(168, 85, 247, 0.15)">
            <div className="mb-8 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50 group-hover:border-purple-500/30 transition-colors">
              <Github className="w-6 h-6 text-purple-400" />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 text-sm font-mono uppercase tracking-wider">Code</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-purple-400 transition-colors" />
              </div>
              <p className="text-xl md:text-2xl font-semibold text-white">
                GitHub
              </p>
            </div>
          </SpotlightCard>
        </a>

      </div>

      {/* Footer / Copyright */}
      <div className="mt-32 border-t border-zinc-800/50 pt-12 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="text-2xl font-bold text-white tracking-tighter">ASHFAQ</span>
            <span className="text-zinc-500 text-sm hidden md:inline">|</span>
            <span className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} All Rights Reserved.
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-zinc-500 font-mono">
            <span>Next.js</span>
            <span>•</span>
            <span>Tailwind</span>
            <span>•</span>
            <span>Framer Motion</span>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
