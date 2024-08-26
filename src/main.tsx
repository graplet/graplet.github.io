import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './scripts/models/themeprovider'
import { GrapletLocalStorage, Project } from './scripts/models/storage'

async function initApp() {
  let projects: Project[] = [];

  try {
    // Preload projects
    const hasProjects = await GrapletLocalStorage.hasAnyProjects();
    if (hasProjects) {
      projects = await GrapletLocalStorage.getAllProjects();
      document.title = "Graplet | Projects";
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }

  // Render the App component with preloaded projects
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider>
        <App projects={projects} />
      </ThemeProvider>
    </React.StrictMode>,
  );
}

initApp();
