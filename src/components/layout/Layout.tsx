import { ReactNode, useState } from 'react'
import { Header } from './Header'
import { Navigation } from './Navigation'
import styles from './Layout.module.css'

interface LayoutProps {
  children: (activeTab: 'projects' | 'people') => ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'people'>('projects')

  return (
    <div className={styles.layout}>
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className={styles.main}>
        <div className={styles.container}>{children(activeTab)}</div>
      </main>
    </div>
  )
}
