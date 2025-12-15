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
  const { addPerson, updatePerson } = usePeople()
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
        isSubmitting={isSubmitting}
      />
    </Modal>
  )
}
