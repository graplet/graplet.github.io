import { Project } from './scripts/models/storage'
import { HomePage } from './home/App'
import { ProjectList } from './scripts/models/projectlist';
import { PrimaryNav } from './scripts/models/primarynav';
import './home/projects.css'
import { SideBar } from './scripts/models/sidebar';

interface AppProps {
  projects: Project[];
}

const App: React.FC<AppProps> = ({ projects }) => {
  return (
    <>
      {projects.length > 0 ? (
        <>
          <PrimaryNav />
          <h3 className='ml-3 mt-2'>What will you create today?</h3>
          <div className='flex m-3'>
            <SideBar />
            <ProjectList projects={projects} />
          </div>
        </>
      ) : (
        <HomePage />
      )}
    </>
  );
}

export default App;