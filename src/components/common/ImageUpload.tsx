import { useState, useRef, ChangeEvent } from 'react'
import { Button } from './Button'
import styles from './ImageUpload.module.css'

interface ImageUploadProps {
  value?: string
  onChange: (imageData: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(value)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Bild zu groß! Maximal 2MB erlaubt.')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Nur Bilder erlaubt!')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setPreview(result)
      onChange(result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setPreview(undefined)
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.uploadArea}>
        {preview ? (
          <div className={styles.previewContainer}>
            <img src={preview} alt="Preview" className={styles.preview} />
            <div className={styles.actions}>
              <Button type="button" onClick={handleClick} variant="secondary" size="small">
                Ändern
              </Button>
              <Button type="button" onClick={handleRemove} variant="danger" size="small">
                Entfernen
              </Button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={handleClick} className={styles.uploadButton}>
            <span className={styles.uploadText}>Bild auswählen</span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      </div>
    </div>
  )
}
