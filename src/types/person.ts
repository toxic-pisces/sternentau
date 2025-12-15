export interface Person {
  id: string
  name: string
  color: string // Hex color code
  imageUrl?: string // Optional: Custom image URL or base64
}

export type CreatePersonInput = Omit<Person, 'id'>
export type UpdatePersonInput = Partial<Omit<Person, 'id'>>
