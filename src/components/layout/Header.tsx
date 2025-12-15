import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>⭐ Sternentau</h1>
        <p className={styles.subtitle}>Minecraft Server Projekt-Manager</p>
      </div>
    </header>
  )
}
