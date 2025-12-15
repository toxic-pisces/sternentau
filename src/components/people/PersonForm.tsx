import { useState, FormEvent } from 'react'
import { Person } from '../../types'
import { Input } from '../common/Input'
import { ColorPicker } from '../common/ColorPicker'
import { ImageUpload } from '../common/ImageUpload'
import { Button } from '../common/Button'
import styles from './PersonForm.module.css'

interface PersonFormProps {
  person?: Person
  onSubmit: (data: { name: string; color: string; imageUrl?: string }) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function PersonForm({ person, onSubmit, onCancel, isSubmitting = false }: PersonFormProps) {
  const [name, setName] = useState(person?.name || '')
  const [imageUrl, setImageUrl] = useState(person?.imageUrl || '')
  const [color, setColor] = useState(person?.color || '#55FF55')
  const [errors, setErrors] = useState<{ name?: string }>({})

  const validate = (): boolean => {
    const newErrors: { name?: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Name ist erforderlich'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validate()) {
      onSubmit({
        name: name.trim(),
        color,
        imageUrl: imageUrl || undefined,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        disabled={isSubmitting}
      />

      <ImageUpload label="Profilbild" value={imageUrl} onChange={setImageUrl} />

      <ColorPicker label="Farbe" value={color} onChange={setColor} />

      <div className={styles.actions}>
        <Button type="button" onClick={onCancel} variant="secondary" disabled={isSubmitting}>
          Abbrechen
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Wird gespeichert...' : person ? 'Aktualisieren' : 'Erstellen'}
        </Button>
      </div>
    </form>
  )
}
