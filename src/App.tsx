import { PersonProvider, ProjectProvider } from './contexts'
import { Layout } from './components/layout'
import { PeopleList } from './components/people'
import { ProjectList } from './components/projects'
import { CompletedProjectList } from './components/projects/CompletedProjectList'
import './App.css'

function App() {
  return (
    <PersonProvider>
      <ProjectProvider>
        <Layout>
          {(activeTab) => (
            <>
              {activeTab === 'projects' && <ProjectList />}
              {activeTab === 'people' && <PeopleList />}
              {activeTab === 'completed' && <CompletedProjectList />}
            </>
          )}
        </Layout>
      </ProjectProvider>
    </PersonProvider>
  )
}

export default App
