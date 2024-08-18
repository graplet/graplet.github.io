import { useEffect, useState } from 'react';
import { GrapletLocalStorage, Project } from './scripts/models/storage'; // Adjust the import path as necessary

function App() {
  const [projects, setProjects] = useState<Array<Project>>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await GrapletLocalStorage.getAllProjects(); // Assuming this method exists
        setProjects(allProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <h3>Welcome to the Graplet homepage!</h3>
      <label>Go see the demo at the </label><a href="/editor/">editor page</a>
      <p>If you save a Project locally, it will appear here.</p>
      <p>Want to contribute? Message me @heliacer on Discord 😊</p>
      {projects.map(project => (
        <div key={project.id}>
          <a href={`/editor/#${project.id}`}>{project.name}</a>
        </div>
      ))}
    </>
  );
}

export default App;
