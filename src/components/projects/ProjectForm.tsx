import { useState, FormEvent } from 'react'
import { Project, ProjectStatus } from '../../types'
import { usePeople } from '../../hooks'
import { Input } from '../common/Input'
import { Select } from '../common/Select'
import { Button } from '../common/Button'
import styles from './ProjectForm.module.css'

interface ProjectFormProps {
  project?: Project
  onSubmit: (data: {
    title: string
    description: string
    status: ProjectStatus
    effort?: string
    assignedPeople: string[]
    priority: number
  }) => void
  onCancel: () => void
  onDelete?: () => void
  isSubmitting?: boolean
}

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'Geplant', label: 'Geplant' },
  { value: 'In Arbeit', label: 'In Arbeit' },
  { value: 'Abgeschlossen', label: 'Abgeschlossen' },
]

const EFFORT_OPTIONS = [
  { value: '', label: 'Keine Angabe' },
  { value: 'Klein', label: 'Klein' },
  { value: 'Mittel', label: 'Mittel' },
  { value: 'Groß', label: 'Groß' },
]

export function ProjectForm({
  project,
  onSubmit,
  onCancel,
  onDelete,
  isSubmitting = false,
}: ProjectFormProps) {
  const { people } = usePeople()

  const [title, setTitle] = useState(project?.title || '')
  const [description, setDescription] = useState(project?.description || '')
  const [status, setStatus] = useState<ProjectStatus>(project?.status || 'Geplant')
  const [effort, setEffort] = useState(project?.effort || '')
  const [assignedPeople, setAssignedPeople] = useState<string[]>(project?.assignedPeople || [])
  const [errors, setErrors] = useState<{ title?: string }>({})

  const validate = (): boolean => {
    const newErrors: { title?: string } = {}

    if (!title.trim()) {
      newErrors.title = 'Titel ist erforderlich'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validate()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
        effort: effort || undefined,
        assignedPeople,
        priority: project?.priority || 999,
      })
    }
  }

  const togglePersonAssignment = (personId: string) => {
    setAssignedPeople((prev) =>
      prev.includes(personId) ? prev.filter((id) => id !== personId) : [...prev, personId]
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Titel *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        placeholder="z.B. Spawn Area bauen"
        disabled={isSubmitting}
      />

      <div className={styles.field}>
        <label className={styles.label}>Beschreibung</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Beschreibung des Projekts..."
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      <Select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as ProjectStatus)}
        options={STATUS_OPTIONS}
        disabled={isSubmitting}
      />

      <Select
        label="Aufwand"
        value={effort}
        onChange={(e) => setEffort(e.target.value)}
        options={EFFORT_OPTIONS}
        disabled={isSubmitting}
      />

      {people.length > 0 && (
        <div className={styles.field}>
          <label className={styles.label}>Personen zuordnen</label>
          <div className={styles.peopleGrid}>
            {people.map((person) => (
              <label key={person.id} className={styles.personCheckbox}>
                <input
                  type="checkbox"
                  checked={assignedPeople.includes(person.id)}
                  onChange={() => togglePersonAssignment(person.id)}
                  disabled={isSubmitting}
                />
                <div className={styles.personInfo}>
                  {person.imageUrl ? (
                    <img src={person.imageUrl} alt={person.name} className={styles.personAvatar} />
                  ) : (
                    <div className={styles.personAvatarPlaceholder} style={{ backgroundColor: person.color }}>
                      {person.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className={styles.personName}>{person.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        {onDelete && (
          <Button type="button" onClick={onDelete} variant="danger" disabled={isSubmitting}>
            Löschen
          </Button>
        )}
        <div className={styles.rightActions}>
          <Button type="button" onClick={onCancel} variant="secondary" disabled={isSubmitting}>
            Abbrechen
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Wird gespeichert...' : project ? 'Aktualisieren' : 'Erstellen'}
          </Button>
        </div>
      </div>
    </form>
  )
}
