import { useState, FormEvent } from 'react'
import { Person } from '../../types'
import { Input } from '../common/Input'
import { ColorPicker } from '../common/ColorPicker'
import { ImageUpload } from '../common/ImageUpload'
import { Button } from '../common/Button'
import styles from './PersonForm.module.css'

interface PersonFormProps {
  person?: Person
  onSubmit: (data: { name: string; color: string; imageUrl?: string; password?: string; currentPassword?: string }) => void
  onCancel: () => void
  onDelete?: () => void
  isSubmitting?: boolean
}

export function PersonForm({ person, onSubmit, onCancel, onDelete, isSubmitting = false }: PersonFormProps) {
  const [name, setName] = useState(person?.name || '')
  const [imageUrl, setImageUrl] = useState(person?.imageUrl || '')
  const [color, setColor] = useState(person?.color || '#55FF55')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; password?: string; currentPassword?: string }>({})

  const validate = (): boolean => {
    const newErrors: { name?: string; password?: string; currentPassword?: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Name ist erforderlich'
    }

    // Beim Erstellen: Passwort erforderlich
    if (!person && !password.trim()) {
      newErrors.password = 'Passwort ist erforderlich'
    }

    // Beim Bearbeiten: Aktuelles Passwort erforderlich
    if (person && !currentPassword.trim()) {
      newErrors.currentPassword = 'Aktuelles Passwort erforderlich'
    }

    // Beim Passwort ändern: Neues Passwort erforderlich
    if (person && showPasswordChange && !newPassword.trim()) {
      newErrors.password = 'Neues Passwort erforderlich'
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
        password: showPasswordChange && newPassword ? newPassword : (!person ? password : undefined),
        currentPassword: person ? currentPassword : undefined,
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

      {!person ? (
        <Input
          label="Passwort *"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          disabled={isSubmitting}
          placeholder="Passwort zum Schutz des Profils"
        />
      ) : (
        <>
          <Input
            label="Aktuelles Passwort *"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            error={errors.currentPassword}
            disabled={isSubmitting}
            placeholder="Zur Bestätigung der Änderung"
          />

          <div className={styles.passwordChange}>
            <Button
              type="button"
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              variant="secondary"
              disabled={isSubmitting}
            >
              {showPasswordChange ? 'Passwort-Änderung abbrechen' : 'Passwort ändern'}
            </Button>
          </div>

          {showPasswordChange && (
            <Input
              label="Neues Passwort *"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={errors.password}
              disabled={isSubmitting}
              placeholder="Neues Passwort eingeben"
            />
          )}
        </>
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
            {isSubmitting ? 'Wird gespeichert...' : person ? 'Aktualisieren' : 'Erstellen'}
          </Button>
        </div>
      </div>
    </form>
  )
}
