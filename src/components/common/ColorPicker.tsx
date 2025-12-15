import { useState } from 'react'
import clsx from 'clsx'
import { getMinecraftColorOptions, isValidHexColor } from '../../utils/colorUtils'
import { Input } from './Input'
import styles from './ColorPicker.module.css'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(value)
  const minecraftColors = getMinecraftColorOptions()

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setCustomColor(color)

    if (isValidHexColor(color)) {
      onChange(color)
    }
  }

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.presetColors}>
        {minecraftColors.map((color) => (
          <button
            key={color.value}
            type="button"
            className={clsx(
              styles.colorButton,
              value === color.value && styles.selected
            )}
            style={{ backgroundColor: color.value }}
            onClick={() => {
              onChange(color.value)
              setCustomColor(color.value)
            }}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>

      <div className={styles.customColor}>
        <Input
          type="text"
          value={customColor}
          onChange={handleCustomColorChange}
          placeholder="#FFFFFF"
          label="Custom Hex Color"
          error={customColor && !isValidHexColor(customColor) ? 'Invalid hex color' : undefined}
        />
        <div
          className={styles.colorPreview}
          style={{ backgroundColor: isValidHexColor(customColor) ? customColor : '#000' }}
        />
      </div>
    </div>
  )
}
