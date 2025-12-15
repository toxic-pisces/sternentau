import { useState } from 'react'
import { Project } from '../../types'
import { useProjects } from '../../hooks'
import { LoadingSpinner } from '../common/LoadingSpinner'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import styles from './ProjectList.module.css'

export function CompletedProjectList() {
  const { projects, loading } = useProjects()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingProject(undefined)
  }

  const completedProjects = projects.filter((p) => p.status === 'Abgeschlossen')

  if (loading) {
    return <LoadingSpinner message="Lade Projekte..." />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Abgeschlossene Projekte</h2>
      </div>

      {completedProjects.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Noch keine abgeschlossenen Projekte.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {completedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => handleEdit(project)}
              onDelete={() => {}}
            />
          ))}
        </div>
      )}

      <ProjectModal isOpen={modalOpen} onClose={handleCloseModal} project={editingProject} />
    </div>
  )
}
