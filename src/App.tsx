import { Project } from './scripts/models/storage'
import { HomePage } from './home/App'
import { ProjectList } from './scripts/models/projectlist';

interface AppProps {
  projects: Project[];
}

const App: React.FC<AppProps> = ({ projects }) => {
  return (
    <>
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
    </>
  );
}

export default App;