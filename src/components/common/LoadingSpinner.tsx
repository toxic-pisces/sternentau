import styles from './LoadingSpinner.module.css'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
}

export function LoadingSpinner({ size = 'medium', message }: LoadingSpinnerProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.cube} />
        <div className={styles.cube} />
        <div className={styles.cube} />
        <div className={styles.cube} />
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
