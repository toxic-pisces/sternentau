import { useState, FormEvent } from 'react'
import { Project, ProjectStatus } from '../../types'
import { usePeople } from '../../hooks'
import { Input } from '../common/Input'
import { Select } from '../common/Select'
import { Button } from '../common/Button'
import { MinecraftHead } from '../common/MinecraftHead'
import { dateToTimestamp } from '../../utils/dateUtils'
import styles from './ProjectForm.module.css'

interface ProjectFormProps {
  project?: Project
  onSubmit: (data: {
    title: string
    description: string
    status: ProjectStatus
    deadline: number | null
    assignedPeople: string[]
    priority: number
  }) => void
  onCancel: () => void
  isSubmitting?: boolean
}

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'Geplant', label: 'Geplant' },
  { value: 'In Arbeit', label: 'In Arbeit' },
  { value: 'Abgeschlossen', label: 'Abgeschlossen' },
]

export function ProjectForm({
  project,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProjectFormProps) {
  const { people } = usePeople()

  const [title, setTitle] = useState(project?.title || '')
  const [description, setDescription] = useState(project?.description || '')
  const [status, setStatus] = useState<ProjectStatus>(project?.status || 'Geplant')
  const [deadline, setDeadline] = useState(
    project?.deadline ? new Date(project.deadline).toISOString().split('T')[0] : ''
  )
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
        deadline: deadline ? dateToTimestamp(new Date(deadline)) : null,
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

      <Input
        label="Deadline"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
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
                  <MinecraftHead username={person.minecraftUsername} size={32} />
                  <span className={styles.personName}>{person.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <Button type="button" onClick={onCancel} variant="secondary" disabled={isSubmitting}>
          Abbrechen
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Wird gespeichert...' : project ? 'Aktualisieren' : 'Erstellen'}
        </Button>
      </div>
    </form>
  )
}
