import { useMemo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Project, ProjectStatus } from '../../types'
import { usePeople } from '../../hooks'
import { createGradient } from '../../utils/colorUtils'
import { Button } from '../common/Button'
import clsx from 'clsx'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  onEdit: () => void
  onDelete: () => void
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  Geplant: 'Geplant',
  'In Arbeit': 'In Arbeit',
  Abgeschlossen: 'Abgeschlossen',
}

const STATUS_CLASSES: Record<ProjectStatus, string> = {
  Geplant: styles.statusPlanned,
  'In Arbeit': styles.statusInProgress,
  Abgeschlossen: styles.statusCompleted,
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const { getPersonsByIds } = usePeople()

  // Drag & Drop setup
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const assignedPeople = useMemo(() => {
    return getPersonsByIds(project.assignedPeople)
  }, [project.assignedPeople, getPersonsByIds])

  const borderStyle = useMemo(() => {
    if (assignedPeople.length === 0) {
      return { borderLeft: `4px solid var(--mc-stone-lighter)` }
    }

    if (assignedPeople.length === 1) {
      return {
        borderLeft: `4px solid ${assignedPeople[0].color}`,
      }
    }

    // Gradient für mehrere Personen
    const colors = assignedPeople.map((p) => p.color)
    const gradient = createGradient(colors)
    return {
      borderLeft: '4px solid transparent',
      borderImage: `${gradient} 1`,
      borderImageSlice: 1,
    }
  }, [assignedPeople])

  return (
    <div ref={setNodeRef} className={styles.card} style={{ ...borderStyle, ...style }}>
      <div className={styles.header}>
        <button className={styles.dragHandle} {...attributes} {...listeners} aria-label="Drag to reorder">
          ⠿
        </button>
        <h3 className={styles.title}>{project.title}</h3>
        <span className={clsx(styles.statusBadge, STATUS_CLASSES[project.status])}>
          {STATUS_LABELS[project.status]}
        </span>
      </div>

      {project.description && <p className={styles.description}>{project.description}</p>}

      {project.effort && (
        <div className={styles.effort}>
          <span className={styles.effortLabel}>Aufwand:</span>
          <span className={styles.effortValue}>{project.effort}</span>
        </div>
      )}

      {assignedPeople.length > 0 && (
        <div className={styles.people}>
          <span className={styles.peopleLabel}>Zugeordnet:</span>
          <div className={styles.peopleList}>
            {assignedPeople.map((person) => (
              <div key={person.id} className={styles.personItem} title={person.name}>
                {person.imageUrl ? (
                  <img src={person.imageUrl} alt={person.name} className={styles.personAvatar} />
                ) : (
                  <div className={styles.personAvatarPlaceholder} style={{ backgroundColor: person.color }}>
                    {person.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className={styles.personName}>{person.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <Button onClick={onEdit} variant="secondary" size="small">
          Bearbeiten
        </Button>
        <Button onClick={onDelete} variant="danger" size="small">
          Löschen
        </Button>
      </div>
    </div>
  )
}
