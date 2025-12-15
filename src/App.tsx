import { PersonProvider, ProjectProvider } from './contexts'
import { Layout } from './components/layout'
import { PeopleList } from './components/people'
import { ProjectList } from './components/projects'
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
            </>
          )}
        </Layout>
      </ProjectProvider>
    </PersonProvider>
  )
}

export default App
