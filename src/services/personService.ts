import { ref, set, update, remove, onValue, off } from 'firebase/database'
import { database } from './firebase'
import type { Person, CreatePersonInput, UpdatePersonInput } from '../types'

const PEOPLE_PATH = 'people'

/**
 * Subscribe to real-time updates for all people
 */
export function subscribeToPeople(callback: (people: Person[]) => void): () => void {
  const peopleRef = ref(database, PEOPLE_PATH)

  const handleValue = (snapshot: any) => {
    const data = snapshot.val()
    if (!data) {
      callback([])
      return
    }

    const people: Person[] = Object.values(data)
    callback(people)
  }

  onValue(peopleRef, handleValue)

  // Return unsubscribe function
  return () => off(peopleRef, 'value', handleValue)
}

/**
 * Create a new person
 */
export async function createPerson(person: CreatePersonInput): Promise<string> {
  const id = `person-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const personRef = ref(database, `${PEOPLE_PATH}/${id}`)

  const newPerson: Person = {
    id,
    ...person,
  }

  await set(personRef, newPerson)
  return id
}

/**
 * Update an existing person
 */
export async function updatePerson(id: string, updates: UpdatePersonInput): Promise<void> {
  const personRef = ref(database, `${PEOPLE_PATH}/${id}`)
  await update(personRef, updates)
}

/**
 * Delete a person
 */
export async function deletePerson(id: string): Promise<void> {
  const personRef = ref(database, `${PEOPLE_PATH}/${id}`)
  await remove(personRef)
}
