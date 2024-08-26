import { Project } from './storage'
import defaultImage from '/project.svg'

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className='flex items-center'>
    <img className='w-6' src={project.icon ?? defaultImage} alt="" />
    <a href={`/editor/#${project.id}`}>{project.name}</a>
  </div>
)

export const ProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className='flex gap-4'>
    {projects.map(project => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
)
