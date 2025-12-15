import { useState } from 'react'
import { Project } from '../../types'
import { useProjects } from '../../hooks'
import { Modal } from '../common/Modal'
import { ProjectForm } from './ProjectForm'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project?: Project
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { addProject, updateProject } = useProjects()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: {
    title: string
    description: string
    status: any
    effort?: string
    assignedPeople: string[]
    priority: number
  }) => {
    setIsSubmitting(true)

    try {
      if (project) {
        await updateProject(project.id, data)
      } else {
        await addProject(data)
      }
      onClose()
    } catch (error) {
      console.error('Failed to save project:', error)
      alert('Fehler beim Speichern. Bitte versuche es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? 'Projekt bearbeiten' : 'Neues Projekt'}
      size="large"
    >
      <ProjectForm
        project={project}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  )
}
