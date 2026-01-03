import SectionContainer from './SectionContainer';

export default function AboutSection() {
  return (
    <SectionContainer id="about" className="bg-dark text-white relative">
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-6xl mx-auto">
        
        {/* Profile Image / Abstract Visual */}
        <div className="md:w-1/3 flex justify-center order-first md:order-last">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="relative w-full h-full bg-zinc-900 border-2 border-zinc-800 rounded-full flex items-center justify-center overflow-hidden shadow-2xl">
               <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                 A
               </span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Me</span>
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
            <p>
              Hi, I&apos;m <span className="text-white font-semibold">Ashfaq</span>. I&apos;m not just a student; I&apos;m a creator at heart. My passion lies in navigating the complexities of software development to build intuitive, high-performance applications.
            </p>
            <p>
              From crafting sleek user interfaces with <span className="text-primary">Next.js</span> to architecting robust backend systems, I thrive on turning abstract ideas into tangible digital realities. I am constantly pushing my boundaries, learning new technologies, and seeking the next big challenge.
            </p>
          </div>
        </div>

      </div>
    </SectionContainer>
  );
}
