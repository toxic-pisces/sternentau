import { useState, FormEvent } from 'react'
import { Person } from '../../types'
import { Input } from '../common/Input'
import { ColorPicker } from '../common/ColorPicker'
import { Button } from '../common/Button'
import styles from './PersonForm.module.css'

interface PersonFormProps {
  person?: Person
  onSubmit: (data: { name: string; color: string; minecraftUsername: string }) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function PersonForm({ person, onSubmit, onCancel, isSubmitting = false }: PersonFormProps) {
  const [name, setName] = useState(person?.name || '')
  const [minecraftUsername, setMinecraftUsername] = useState(person?.minecraftUsername || '')
  const [color, setColor] = useState(person?.color || '#55FF55')
  const [errors, setErrors] = useState<{ name?: string; username?: string }>({})

  const validate = (): boolean => {
    const newErrors: { name?: string; username?: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Name ist erforderlich'
    }

    if (!minecraftUsername.trim()) {
      newErrors.username = 'Minecraft Username ist erforderlich'
    } else if (!/^[a-zA-Z0-9_]{1,16}$/.test(minecraftUsername)) {
      newErrors.username = 'Ungültiger Username (nur a-z, 0-9, _ erlaubt, max 16 Zeichen)'
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
        minecraftUsername: minecraftUsername.trim(),
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
        placeholder="z.B. Steve"
        disabled={isSubmitting}
      />

      <Input
        label="Minecraft Username *"
        value={minecraftUsername}
        onChange={(e) => setMinecraftUsername(e.target.value)}
        error={errors.username}
        placeholder="z.B. Steve123"
        disabled={isSubmitting}
      />

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
