import SectionContainer from './SectionContainer';

export default function AboutSection() {
  return (
    <SectionContainer id="about" className="relative py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Giant Watermark */}
        <div className="absolute top-0 left-0 -translate-y-1/2 text-[30vw] font-black text-cyan-500/5 select-none pointer-events-none z-0 leading-none">
          01
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: The Hook */}
          <div className="md:col-span-5 pt-12">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
              Who is <br/>
              <span className="text-cyan-400">Ashfaq?</span>
            </h2>
            <div className="h-1 w-32 bg-white/20"></div>
          </div>

          {/* Right Column: The Story */}
          <div className="md:col-span-7 space-y-12 text-xl md:text-2xl text-zinc-300 font-light leading-relaxed">
            <p>
              <strong className="text-white font-bold">I don't just write code.</strong> I sculpt digital experiences. 
              As a student and creator, I sit at the intersection of logical architecture and artistic expression.
            </p>
            <p>
              My journey isn't about learning syntax—it's about <span className="text-emerald-400 italic">solving problems with style</span>. 
              Whether it's building complex social platforms like <span className="text-white border-b border-cyan-500/50">Sync</span> or crafting fluid web interfaces, 
              I am obsessed with the details that make software feel human.
            </p>
            <p className="text-lg text-zinc-500">
              // Currently pushing pixels & logic in the pursuit of perfection.
            </p>
          </div>

        </div>
      </div>
    </SectionContainer>
  );
}
