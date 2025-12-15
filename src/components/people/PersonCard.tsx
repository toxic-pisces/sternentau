import { useState, useRef, useEffect } from 'react'
import { Person } from '../../types'
import styles from './PersonCard.module.css'

interface PersonCardProps {
  person: Person
  projectCount: number
  onEdit: () => void
  onDelete?: () => void
}

export function PersonCard({ person, projectCount, onEdit }: PersonCardProps) {
  const [isPressHold, setIsPressHold] = useState(false)
  const pressTimer = useRef<number>()

  const handleMouseDown = () => {
    pressTimer.current = window.setTimeout(() => {
      setIsPressHold(true)
    }, 200)
  }

  const handleMouseUp = () => {
    clearTimeout(pressTimer.current)
    if (!isPressHold) {
      onEdit()
    }
    setIsPressHold(false)
  }

  const handleMouseLeave = () => {
    clearTimeout(pressTimer.current)
  }

  useEffect(() => {
    return () => clearTimeout(pressTimer.current)
  }, [])

  return (
    <div
      className={styles.card}
      style={{ borderLeftColor: person.color }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <div className={styles.header}>
        {person.imageUrl ? (
          <img src={person.imageUrl} alt={person.name} className={styles.avatar} />
        ) : (
          <div className={styles.avatarPlaceholder} style={{ backgroundColor: person.color }}>
            {person.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className={styles.info}>
          <h3 className={styles.name}>{person.name}</h3>
          <div className={styles.color}>
            <div
              className={styles.colorPreview}
              style={{ backgroundColor: person.color }}
            />
            <span className={styles.colorValue}>{person.color}</span>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <span className={styles.projectCount}>
          {projectCount} {projectCount === 1 ? 'Projekt' : 'Projekte'}
        </span>
      </div>
    </div>
  )
}
