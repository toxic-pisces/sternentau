import { useState } from 'react'
import clsx from 'clsx'
import styles from './MinecraftHead.module.css'

interface MinecraftHeadProps {
  username: string
  size?: number
  className?: string
}

export function MinecraftHead({ username, size = 64, className }: MinecraftHeadProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const url = `https://crafthead.net/avatar/${username}/${size}`

  const handleLoad = () => {
    setLoading(false)
    setError(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <div className={clsx(styles.container, className)} style={{ width: size, height: size }}>
      {loading && <div className={styles.skeleton} />}
      <img
        src={error ? '/placeholder.png' : url}
        alt={`${username}'s Minecraft head`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        className={clsx(styles.image, loading && styles.hidden)}
        width={size}
        height={size}
      />
    </div>
  )
}
