export type ProjectStatus = 'Geplant' | 'In Arbeit' | 'Abgeschlossen'

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  priority: number
  createdAt: number // Unix timestamp
  deadline: number | null // Unix timestamp or null
  assignedPeople: string[] // Array of person IDs
}

export type CreateProjectInput = Omit<Project, 'id' | 'createdAt'>
export type UpdateProjectInput = Partial<Omit<Project, 'id'>>
