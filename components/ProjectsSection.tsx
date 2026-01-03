import SectionContainer from './SectionContainer';
import Link from 'next/link';

export default function ProjectsSection() {
  return (
    <SectionContainer id="projects" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Giant Watermark */}
        <div className="absolute top-0 right-0 -translate-y-1/2 text-[30vw] font-black text-cyan-500/5 select-none pointer-events-none z-0 leading-none">
          02
        </div>

        <div className="relative z-10 mb-20">
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
            SELECTED <br/> <span className="text-cyan-400">WORKS</span>
          </h2>
        </div>

        {/* PROJECT: SYNC */}
        <div className="relative z-10 group">
          <div className="border-t border-white/20 pt-12 pb-12 transition-all duration-500 hover:border-cyan-500/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Title & Meta */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-5xl md:text-7xl font-bold text-white mb-2 group-hover:pl-4 transition-all duration-300">
                    Sync
                  </h3>
                  <p className="text-xl text-zinc-400 font-mono">2024 — Android Application</p>
                </div>
                
                <div className="mt-12 flex flex-wrap gap-2">
                  {["Kotlin", "Jetpack Compose", "Firebase", "Realtime"].map((tag) => (
                    <span key={tag} className="px-4 py-1 rounded-full border border-white/10 text-sm text-zinc-300 bg-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description & Action */}
              <div className="flex flex-col justify-between items-start md:items-end text-left md:text-right">
                <p className="text-xl text-zinc-300 max-w-md leading-relaxed mb-8">
                  An advanced social/educational ecosystem. Featuring real-time messaging, offline-first architecture, and role-based class management. 
                  <span className="block mt-4 text-cyan-400 italic">Redefining how students connect.</span>
                </p>
                
                <Link href="/projects/sync" className="inline-flex items-center text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                  View Case Study
                  <svg className="w-8 h-8 ml-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </SectionContainer>
  );
}
