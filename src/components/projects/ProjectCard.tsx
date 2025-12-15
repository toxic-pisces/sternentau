import { useMemo, useRef } from 'react'
import { Project, ProjectStatus } from '../../types'
import { usePeople } from '../../hooks'
import { createGradient } from '../../utils/colorUtils'
import clsx from 'clsx'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  onEdit: () => void
  onDelete?: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
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

export function ProjectCard({ project, onEdit, onMoveUp, onMoveDown }: ProjectCardProps) {
  const { getPersonsByIds } = usePeople()
  const touchStartY = useRef<number>(0)
  const touchStartX = useRef<number>(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY
    const touchEndX = e.changedTouches[0].clientX
    const deltaY = Math.abs(touchEndY - touchStartY.current)
    const deltaX = Math.abs(touchEndX - touchStartX.current)
    
    // Nur als Klick werten wenn Bewegung < 10px (also kein Scroll/Swipe)
    if (deltaY < 10 && deltaX < 10) {
      onEdit()
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    // Normale Klicks für Desktop
    onEdit()
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
    <div className={styles.card} style={borderStyle}>
      <div className={styles.reorderButtons}>
        {onMoveUp && (
          <button 
            className={styles.reorderButton} 
            onClick={onMoveUp} 
            title="Nach oben verschieben"
            type="button"
          >
            ▲
          </button>
        )}
        {onMoveDown && (
          <button 
            className={styles.reorderButton} 
            onClick={onMoveDown} 
            title="Nach unten verschieben"
            type="button"
          >
            ▼
          </button>
        )}
      </div>

      <div 
        className={styles.content} 
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.header}>
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
      </div>
    </div>
  )
}
