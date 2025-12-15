import clsx from 'clsx'
import styles from './Navigation.module.css'

interface NavigationProps {
  activeTab: 'projects' | 'people' | 'completed'
  onTabChange: (tab: 'projects' | 'people' | 'completed') => void
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
          Projekte
        </button>
        <button
          className={clsx(styles.tab, activeTab === 'people' && styles.active)}
          onClick={() => onTabChange('people')}
          aria-current={activeTab === 'people' ? 'page' : undefined}
        >
          Personen
        </button>
        <button
          className={clsx(styles.tab, activeTab === 'completed' && styles.active)}
          onClick={() => onTabChange('completed')}
          aria-current={activeTab === 'completed' ? 'page' : undefined}
        >
          Abgeschlossen
        </button>
      </div>
    </nav>
  )
}
