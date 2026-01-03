import SectionContainer from './SectionContainer';

export default function SkillsSection() {
  const skills = [
    { name: "Kotlin", size: "text-6xl", opacity: "opacity-100", weight: "font-black" },
    { name: "Next.js", size: "text-7xl", opacity: "opacity-90", weight: "font-bold" },
    { name: "React", size: "text-5xl", opacity: "opacity-80", weight: "font-bold" },
    { name: "Python", size: "text-6xl", opacity: "opacity-100", weight: "font-black" },
    { name: "TypeScript", size: "text-4xl", opacity: "opacity-70", weight: "font-medium" },
    { name: "Firebase", size: "text-5xl", opacity: "opacity-90", weight: "font-bold" },
    { name: "Android", size: "text-6xl", opacity: "opacity-80", weight: "font-black" },
    { name: "Java", size: "text-4xl", opacity: "opacity-60", weight: "font-medium" },
    { name: "Tailwind", size: "text-5xl", opacity: "opacity-90", weight: "font-bold" },
    { name: "Node.js", size: "text-4xl", opacity: "opacity-70", weight: "font-medium" },
    { name: "Git", size: "text-3xl", opacity: "opacity-50", weight: "font-normal" },
    { name: "Figma", size: "text-4xl", opacity: "opacity-60", weight: "font-medium" },
    { name: "AWS", size: "text-3xl", opacity: "opacity-50", weight: "font-normal" },
    { name: "SQL", size: "text-4xl", opacity: "opacity-60", weight: "font-bold" },
    { name: "Go", size: "text-5xl", opacity: "opacity-80", weight: "font-bold" },
  ];

  return (
    <SectionContainer id="skills" className="relative py-32 overflow-hidden">
       {/* Giant Watermark */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-cyan-500/5 select-none pointer-events-none z-0 leading-none">
          03
        </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-sm font-mono text-cyan-400 tracking-[1em] mb-12 uppercase">
          Capabilities & Arsenal
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <span 
              key={skill.name} 
              className={`${skill.size} ${skill.opacity} ${skill.weight} text-white tracking-tighter hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-default select-none`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
