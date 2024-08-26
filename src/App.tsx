import { useEffect, useState } from 'react'
import { GrapletLocalStorage, Project } from './scripts/models/storage'
import defaultImage from '/project.svg'
import { HomePage } from './home/App'

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
        if (allProjects.length > 0) {
          document.title = "Graplet | Projects"
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div className="app-container">
      {projects.length > 0 ? (
        <div>
          <h3>Welcome Back!</h3>
          <p>Your saved projects are listed below:</p>
          <ProjectList projects={projects} />
          <br />
          <a href="/editor/">+ create new</a>
        </div>
      ) : (
        <HomePage />
      )}
    </div>
  )
}

export default App
