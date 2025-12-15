import { useState } from 'react'
import { Project } from '../../types'
import { useProjects } from '../../hooks'
import { Button } from '../common/Button'
import { LoadingSpinner } from '../common/LoadingSpinner'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import styles from './ProjectList.module.css'

export function ProjectList() {
  const { projects, loading, reorderProjects } = useProjects()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingProject(undefined)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingProject(undefined)
  }

  const handleMoveUp = async (projectId: string) => {
    const index = projects.findIndex((p) => p.id === projectId)
    if (index <= 0) return

    const reordered = [...projects]
    const temp = reordered[index]
    reordered[index] = reordered[index - 1]
    reordered[index - 1] = temp

    // Update priorities
    const withNewPriorities = reordered.map((p, idx) => ({
      ...p,
      priority: idx + 1,
    }))

    try {
      await reorderProjects(withNewPriorities)
    } catch (error) {
      console.error('Failed to reorder projects:', error)
      alert('Fehler beim Sortieren. Bitte versuche es erneut.')
    }
  }

  const handleMoveDown = async (projectId: string) => {
    const index = projects.findIndex((p) => p.id === projectId)
    if (index < 0 || index >= projects.length - 1) return

    const reordered = [...projects]
    const temp = reordered[index]
    reordered[index] = reordered[index + 1]
    reordered[index + 1] = temp

    // Update priorities
    const withNewPriorities = reordered.map((p, idx) => ({
      ...p,
      priority: idx + 1,
    }))

    try {
      await reorderProjects(withNewPriorities)
    } catch (error) {
      console.error('Failed to reorder projects:', error)
      alert('Fehler beim Sortieren. Bitte versuche es erneut.')
    }
  }

  const activeProjects = projects.filter((p) => p.status !== 'Abgeschlossen')

  if (loading) {
    return <LoadingSpinner message="Lade Projekte..." />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Projekte</h2>
        <Button onClick={handleAddNew} variant="primary">
          + Neues Projekt
        </Button>
      </div>

      {activeProjects.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Noch keine Projekte angelegt.</p>
          <Button onClick={handleAddNew} variant="primary">
            Erstes Projekt erstellen
          </Button>
        </div>
      ) : (
        <div className={styles.list}>
          {activeProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => handleEdit(project)}
              onDelete={() => {}}
              onMoveUp={index > 0 ? () => handleMoveUp(project.id) : undefined}
              onMoveDown={index < activeProjects.length - 1 ? () => handleMoveDown(project.id) : undefined}
            />
          ))}
        </div>
      )}

      <ProjectModal isOpen={modalOpen} onClose={handleCloseModal} project={editingProject} />
    </div>
  )
}
