import { useState } from 'react'
import { Person } from '../../types'
import { usePeople } from '../../hooks'
import { Modal } from '../common/Modal'
import { PersonForm } from './PersonForm'

interface PersonModalProps {
  isOpen: boolean
  onClose: () => void
  person?: Person
}

export function PersonModal({ isOpen, onClose, person }: PersonModalProps) {
  const { addPerson, updatePerson, deletePerson } = usePeople()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: {
    name: string
    color: string
    imageUrl?: string
  }) => {
    setIsSubmitting(true)

    try {
      if (person) {
        await updatePerson(person.id, data)
      } else {
        await addPerson(data)
      }
      onClose()
    } catch (error) {
      console.error('Failed to save person:', error)
      alert('Fehler beim Speichern. Bitte versuche es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!person) return

    const confirmation = confirm(`Person "${person.name}" wirklich löschen?`)
    if (!confirmation) return

    setIsSubmitting(true)
    try {
      await deletePerson(person.id)
      onClose()
    } catch (error) {
      console.error('Failed to delete person:', error)
      alert('Fehler beim Löschen. Bitte versuche es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={person ? 'Person bearbeiten' : 'Neue Person'}
      size="medium"
    >
      <PersonForm
        person={person}
        onSubmit={handleSubmit}
        onCancel={onClose}
        onDelete={person ? handleDelete : undefined}
        isSubmitting={isSubmitting}
      />
    </Modal>
  )
}
