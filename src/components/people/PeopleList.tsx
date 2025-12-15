import { useState } from 'react'
import { Person } from '../../types'
import { usePeople, useProjects } from '../../hooks'
import { Button } from '../common/Button'
import { LoadingSpinner } from '../common/LoadingSpinner'
import { PersonCard } from './PersonCard'
import { PersonModal } from './PersonModal'
import styles from './PeopleList.module.css'

export function PeopleList() {
  const { people, loading, deletePerson } = usePeople()
  const { projects } = useProjects()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | undefined>()

  const handleEdit = (person: Person) => {
    setEditingPerson(person)
    setModalOpen(true)
  }

  const handleDelete = async (person: Person) => {
    // Check if person is assigned to any projects
    const assignedProjects = projects.filter((p) => p.assignedPeople.includes(person.id))

    if (assignedProjects.length > 0) {
      const confirmation = confirm(
        `Diese Person ist ${assignedProjects.length} Projekt(en) zugeordnet. Beim Löschen wird sie aus allen Projekten entfernt. Fortfahren?`
      )
      if (!confirmation) return
    } else {
      const confirmation = confirm(`${person.name} wirklich löschen?`)
      if (!confirmation) return
    }

    try {
      await deletePerson(person.id)
    } catch (error) {
      console.error('Failed to delete person:', error)
      alert('Fehler beim Löschen. Bitte versuche es erneut.')
    }
  }

  const handleAddNew = () => {
    setEditingPerson(undefined)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingPerson(undefined)
  }

  const getProjectCount = (personId: string): number => {
    return projects.filter((p) => p.assignedPeople.includes(personId)).length
  }

  if (loading) {
    return <LoadingSpinner message="Lade Personen..." />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Personen</h2>
        <Button onClick={handleAddNew} variant="primary">
          + Neue Person
        </Button>
      </div>

      {people.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Noch keine Personen angelegt.</p>
          <Button onClick={handleAddNew} variant="primary">
            Erste Person erstellen
          </Button>
        </div>
      ) : (
        <div className={styles.grid}>
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              projectCount={getProjectCount(person.id)}
              onEdit={() => handleEdit(person)}
              onDelete={() => handleDelete(person)}
            />
          ))}
        </div>
      )}

      <PersonModal isOpen={modalOpen} onClose={handleCloseModal} person={editingPerson} />
    </div>
  )
}
