export interface Person {
  id: string
  name: string
  color: string // Hex color code
  minecraftUsername: string
}

export type CreatePersonInput = Omit<Person, 'id'>
export type UpdatePersonInput = Partial<Omit<Person, 'id'>>
