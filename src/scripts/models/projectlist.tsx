import { Project } from './storage'
import defaultImage from '/project.svg'

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <a href={`/editor/#${project.id}`} className='project-card'>
    <img className='w-6 h-6 rounded-full' src={project.icon ?? defaultImage} alt="" /> {project.name}
  </a>
)

export const ProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className='flex flex-wrap gap-4 items-baseline'>
    {projects.map(project => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
)