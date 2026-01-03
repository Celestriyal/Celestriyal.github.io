'use client';

import Link from 'next/link';
import SpotlightCard from './SpotlightCard';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  comingSoon?: boolean; // New prop to indicate coming soon status
}

export default function ProjectCard({ title, description, tags, link = '#', comingSoon = false }: ProjectCardProps) {
  return (
    <SpotlightCard className="h-full flex flex-col relative">
      {comingSoon && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-xl z-20">
          <span className="text-white text-3xl font-bold opacity-70 rotate-[-20deg] select-none">
            COMING SOON
          </span>
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800/50 text-gray-200 border border-zinc-700/50"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link 
        href={comingSoon ? '#' : link} // Disable link if comingSoon
        className={`inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors mt-auto ${comingSoon ? 'pointer-events-none opacity-50' : ''}`}
        onClick={(e) => comingSoon && e.preventDefault()} // Prevent navigation
      >
        View Project 
        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </SpotlightCard>
  );
}
