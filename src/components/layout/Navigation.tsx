import clsx from 'clsx'
import styles from './Navigation.module.css'

interface NavigationProps {
  activeTab: 'projects' | 'people'
  onTabChange: (tab: 'projects' | 'people') => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <button
          className={clsx(styles.tab, activeTab === 'projects' && styles.active)}
          onClick={() => onTabChange('projects')}
          aria-current={activeTab === 'projects' ? 'page' : undefined}
        >
          📋 Projekte
        </button>
        <button
          className={clsx(styles.tab, activeTab === 'people' && styles.active)}
          onClick={() => onTabChange('people')}
          aria-current={activeTab === 'people' ? 'page' : undefined}
        >
          👤 Personen
        </button>
      </div>
    </nav>
  )
}
