import { useEffect, useState } from 'react'
import { GrapletLocalStorage, Project } from './scripts/models/storage' 
import defaultImage from '/project.svg'

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className='flex items-center'>
    <img className='w-6' src={project.icon ?? defaultImage} alt="" />
    <a href={`/editor/#${project.id}`}>{project.name}</a>
  </div>
)



const ProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className='flex gap-4'>
    {projects.map(project => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
)

function App() {
  const [projects, setProjects] = useState<Array<Project>>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await GrapletLocalStorage.getAllProjects()
        setProjects(allProjects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="app-container">
      <h3>Welcome to the Graplet homepage!</h3>
      <p>Go see the action at the <a href="/editor/">editor page</a></p>
      <p>Want to contribute? Message me @heliacer on Discord 😊</p>
      <p>If you save a project locally, it will appear here below:</p>
      <ProjectList projects={projects} />
    </div>
  )
}

export default App
