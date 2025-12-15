import { useContext } from 'react'
import { PersonContext } from '../contexts/PersonContext'

export function usePeople() {
  const context = useContext(PersonContext)

  if (!context) {
    throw new Error('usePeople must be used within PersonProvider')
  }

  return context
}
