import { useEffect, useState } from 'react';
import { GrapletLocalStorage, Project } from './scripts/storage'; 

const ProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div>
    {projects.map(project => (
      <div key={project.id}>
        <a href={`/editor/#${project.id}`}>{project.name}</a>
      </div>
    ))}
  </div>
);

function App() {
  const [projects, setProjects] = useState<Array<Project>>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await GrapletLocalStorage.getAllProjects();
        setProjects(allProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="app-container">
      <h3>Welcome to the Graplet homepage!</h3>
      <p>Go see the action at the <a href="/editor/">editor page</a></p>
      <p>Want to contribute? Message me @heliacer on Discord 😊</p>
      <p>If you save a project locally, it will appear here below:</p>
      <ProjectList projects={projects} />
    </div>
  );
}

export default App;
