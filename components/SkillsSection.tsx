import SectionContainer from './SectionContainer';
import SpotlightCard from './SpotlightCard';

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

const SkillCategory = ({ title, skills }: SkillCategoryProps) => (
  <SpotlightCard className="h-full">
    <h3 className="text-xl font-bold text-primary mb-6 border-b border-zinc-800 pb-2 inline-block">
      {title}
    </h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1.5 bg-zinc-800/80 text-gray-300 rounded-md text-sm font-medium border border-zinc-700/50 hover:bg-zinc-700 hover:text-white hover:border-zinc-600 transition-all duration-300"
        >
          {skill}
        </span>
      ))}
    </div>
  </SpotlightCard>
);

export default function SkillsSection() {
  const programmingLanguages = [
    "Python", "Java", "JavaScript", "TypeScript", "C++", "Go", "Kotlin"
  ];
  const frameworks = [
    "React", "Next.js", "Vue.js", "Angular", "Node.js", "Express.js", "Spring Boot", "Django", "Flask"
  ];
  const tools = [
    "Git", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "VS Code", "Jira", "Figma"
  ];
  const databases = [
    "PostgreSQL", "MongoDB", "MySQL", "Firebase Firestore", "Redis"
  ];

  return (
    <SectionContainer id="skills">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          My <span className="text-secondary">Skills</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <SkillCategory title="Programming Languages" skills={programmingLanguages} />
        <SkillCategory title="Frameworks & Libraries" skills={frameworks} />
        <SkillCategory title="Tools & Platforms" skills={tools} />
        <SkillCategory title="Databases" skills={databases} />
      </div>
    </SectionContainer>
  );
}
