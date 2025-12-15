import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Project } from '../../types'
import { useProjects } from '../../hooks'
import { Button } from '../common/Button'
import { LoadingSpinner } from '../common/LoadingSpinner'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import styles from './ProjectList.module.css'

export function ProjectList() {
  const { projects, loading, deleteProject, reorderProjects } = useProjects()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setModalOpen(true)
  }

  const handleDelete = async (project: Project) => {
    const confirmation = confirm(`Projekt "${project.title}" wirklich löschen?`)
    if (!confirmation) return

    try {
      await deleteProject(project.id)
    } catch (error) {
      console.error('Failed to delete project:', error)
      alert('Fehler beim Löschen. Bitte versuche es erneut.')
    }
  }

  const handleAddNew = () => {
    setEditingProject(undefined)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingProject(undefined)
  }

  // Drag & Drop setup
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id)
      const newIndex = projects.findIndex((p) => p.id === over.id)

      const reordered = arrayMove(projects, oldIndex, newIndex)

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
  }

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

      {projects.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Noch keine Projekte angelegt.</p>
          <Button onClick={handleAddNew} variant="primary">
            Erstes Projekt erstellen
          </Button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <div className={styles.list}>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={() => handleEdit(project)}
                  onDelete={() => handleDelete(project)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <ProjectModal isOpen={modalOpen} onClose={handleCloseModal} project={editingProject} />
    </div>
  )
}
