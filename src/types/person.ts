export interface Person {
  id: string
  name: string
  color: string // Hex color code
  imageUrl?: string // Optional: Custom image URL or base64
  password: string // Unencrypted password for person protection
}

export type CreatePersonInput = Omit<Person, 'id'>
export type UpdatePersonInput = Partial<Omit<Person, 'id'>>
