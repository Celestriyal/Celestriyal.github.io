import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import PixelBlast from '../components/PixelBlast'; // Import PixelBlast
import GradientText from '../components/GradientText';
import ContactSection from '../components/ContactSection'; // Import ContactSection

export default function Home() {
  return (
    <>
      <section id="home" className="relative flex items-center justify-center h-screen bg-dark overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <PixelBlast
            color="#4079ff" // Theme Primary (Bright Blue)
            variant="square"
            pixelSize={3}
            patternScale={2}
            patternDensity={1}
            enableRipples={true}
            rippleIntensityScale={0.8}
            rippleSpeed={0.5}
            edgeFade={0.5}
            transparent={false}
            className=""
            style={{}}
          />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl md:text-9xl font-extrabold leading-tight text-white mb-6 tracking-tighter">
            Hi, I&apos;m <GradientText>Ashfaq</GradientText>
          </h1>
          <p className="text-2xl md:text-4xl text-gray-100 font-medium mb-10 max-w-3xl mx-auto">
            A <span className="text-secondary">Student</span> aspiring to build amazing things.
          </p>
          <div className="space-x-4">
            <a
              href="#projects"
              className="inline-block px-8 py-3 text-black text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(64,255,170,0.5)]"
              style={{
                backgroundImage: 'linear-gradient(135deg, #40ffaa, #4079ff)',
              }}
            >
              View My Work
            </a>
          </div>
        </div>
      </section>
      
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
      
      