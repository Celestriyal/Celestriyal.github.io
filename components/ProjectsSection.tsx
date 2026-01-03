import SectionContainer from './SectionContainer';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "Sync",
    description: "An advanced Android social/educational app featuring real-time chat, in-app updates, role-based class management, offline-first data, image sharing, and robust Firebase integration for a secure and dynamic user experience.",
    tags: ["Kotlin", "Android", "Firebase", "Firestore", "Jetpack Compose", "Realtime Chat"],
    link: "/projects/sync" // Updated link to the new details page
  }
];

export default function ProjectsSection() {
  return (
    <SectionContainer id="projects">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-secondary rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </SectionContainer>
  );
}
