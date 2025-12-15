import { Person } from '../../types'
import { Button } from '../common/Button'
import styles from './PersonCard.module.css'

interface PersonCardProps {
  person: Person
  projectCount: number
  onEdit: () => void
  onDelete: () => void
}

export function PersonCard({ person, projectCount, onEdit, onDelete }: PersonCardProps) {
  return (
    <div className={styles.card} style={{ borderLeftColor: person.color }}>
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
