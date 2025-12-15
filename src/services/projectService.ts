import { ref, set, update, remove, onValue, off } from 'firebase/database'
import { database } from './firebase'
import type { Project, CreateProjectInput, UpdateProjectInput } from '../types'

const PROJECTS_PATH = 'projects'

/**
 * Subscribe to real-time updates for all projects
 */
export function subscribeToProjects(callback: (projects: Project[]) => void): () => void {
  const projectsRef = ref(database, PROJECTS_PATH)

  const handleValue = (snapshot: any) => {
    const data = snapshot.val()
    if (!data) {
      callback([])
      return
    }

    const projects: Project[] = Object.values(data)
    // Sort by priority (lower number = higher priority)
    projects.sort((a, b) => a.priority - b.priority)
    callback(projects)
  }

  onValue(projectsRef, handleValue)

  // Return unsubscribe function
  return () => off(projectsRef, 'value', handleValue)
}

/**
 * Create a new project
 */
export async function createProject(project: CreateProjectInput): Promise<string> {
  const id = `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const projectRef = ref(database, `${PROJECTS_PATH}/${id}`)

  const newProject: Project = {
    id,
    createdAt: Date.now(),
    ...project,
  }

  await set(projectRef, newProject)
  return id
}

/**
 * Update an existing project
 */
export async function updateProject(id: string, updates: UpdateProjectInput): Promise<void> {
  const projectRef = ref(database, `${PROJECTS_PATH}/${id}`)
  await update(projectRef, updates)
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<void> {
  const projectRef = ref(database, `${PROJECTS_PATH}/${id}`)
  await remove(projectRef)
}

/**
 * Batch update project priorities (for drag & drop reordering)
 */
export async function updateProjectPriorities(projects: Project[]): Promise<void> {
  const updates: Record<string, any> = {}

  projects.forEach((project, index) => {
    updates[`${PROJECTS_PATH}/${project.id}/priority`] = index + 1
  })

  const rootRef = ref(database)
  await update(rootRef, updates)
}
