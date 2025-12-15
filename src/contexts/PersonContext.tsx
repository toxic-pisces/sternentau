import { createContext, useEffect, useState, ReactNode } from 'react'
import type { Person, CreatePersonInput, UpdatePersonInput } from '../types'
import * as personService from '../services/personService'

interface PersonContextType {
  people: Person[]
  loading: boolean
  error: string | null
  addPerson: (person: CreatePersonInput) => Promise<void>
  updatePerson: (id: string, updates: UpdatePersonInput) => Promise<void>
  deletePerson: (id: string) => Promise<void>
  getPersonById: (id: string) => Person | undefined
  getPersonsByIds: (ids: string[]) => Person[]
}

export const PersonContext = createContext<PersonContextType | undefined>(undefined)

interface PersonProviderProps {
  children: ReactNode
}

export function PersonProvider({ children }: PersonProviderProps) {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Subscribe to Firebase real-time updates
  useEffect(() => {
    const unsubscribe = personService.subscribeToPeople((updatedPeople) => {
      setPeople(updatedPeople)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const addPerson = async (person: CreatePersonInput): Promise<void> => {
    try {
      setError(null)
      await personService.createPerson(person)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add person'
      setError(message)
      throw err
    }
  }

  const updatePerson = async (id: string, updates: UpdatePersonInput): Promise<void> => {
    try {
      setError(null)
      await personService.updatePerson(id, updates)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update person'
      setError(message)
      throw err
    }
  }

  const deletePerson = async (id: string): Promise<void> => {
    try {
      setError(null)
      await personService.deletePerson(id)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete person'
      setError(message)
      throw err
    }
  }

  const getPersonById = (id: string): Person | undefined => {
    return people.find((person) => person.id === id)
  }

  const getPersonsByIds = (ids: string[]): Person[] => {
    return ids.map((id) => getPersonById(id)).filter(Boolean) as Person[]
  }

  const value: PersonContextType = {
    people,
    loading,
    error,
    addPerson,
    updatePerson,
    deletePerson,
    getPersonById,
    getPersonsByIds,
  }

  return <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
}
