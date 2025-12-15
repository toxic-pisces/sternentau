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
    password?: string
    currentPassword?: string
  }) => {
    setIsSubmitting(true)

    try {
      if (person) {
        // Verify current password
        if (data.currentPassword !== person.password) {
          alert('Falsches Passwort!')
          setIsSubmitting(false)
          return
        }

        // Update person (with optional new password)
        await updatePerson(person.id, {
          name: data.name,
          color: data.color,
          imageUrl: data.imageUrl,
          ...(data.password && { password: data.password }),
        })
      } else {
        // Create new person
        await addPerson({
          name: data.name,
          color: data.color,
          imageUrl: data.imageUrl,
          password: data.password!,
        })
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
