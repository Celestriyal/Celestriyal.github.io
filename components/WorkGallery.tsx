'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    id: '01',
    title: 'SYNC',
    category: 'Android Ecosystem',
    year: '2024',
    description: 'Real-time social & educational platform built with Kotlin & Jetpack Compose.',
    link: '/projects/sync'
  },
  {
    id: '02',
    title: 'NEXUS',
    category: 'Web Platform',
    year: '2025',
    description: 'Next-gen collaborative workspace for remote teams.',
    link: '#'
  },
  {
    id: '03',
    title: 'AURA',
    category: 'Generative Art',
    year: '2025',
    description: 'WebGL-based visualizer reacting to audio input.',
    link: '#'
  }
];

export default function WorkGallery() {
  return (
    <div className="w-full flex flex-col gap-32">
      {projects.map((project, i) => (
        <motion.div 
          key={project.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          className="group relative border-t border-white/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4">
            <h3 className="text-[12vw] md:text-[8vw] font-black leading-none text-transparent stroke-white stroke-2 group-hover:text-white transition-colors duration-500 mix-blend-overlay">
              {project.title}
            </h3>
            <span className="font-mono text-sm md:text-xl text-white/60 mb-2 md:mb-4">
              ({project.category})
            </span>
          </div>
          
          <div className="flex justify-between items-end">
            <p className="max-w-md text-white/80 text-lg md:text-xl font-light">
              {project.description}
            </p>
            <Link 
              href={project.link}
              className="hidden md:inline-flex px-6 py-3 border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 font-mono text-sm uppercase tracking-widest"
            >
              View Case Study
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
