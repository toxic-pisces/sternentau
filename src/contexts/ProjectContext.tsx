import { createContext, useEffect, useState, ReactNode } from 'react'
import type { Project, CreateProjectInput, UpdateProjectInput } from '../types'
import * as projectService from '../services/projectService'

interface ProjectContextType {
  projects: Project[]
  loading: boolean
  error: string | null
  addProject: (project: CreateProjectInput) => Promise<void>
  updateProject: (id: string, updates: UpdateProjectInput) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  reorderProjects: (reorderedProjects: Project[]) => Promise<void>
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

interface ProjectProviderProps {
  children: ReactNode
}

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Subscribe to Firebase real-time updates
  useEffect(() => {
    const unsubscribe = projectService.subscribeToProjects((updatedProjects) => {
      setProjects(updatedProjects)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const addProject = async (project: CreateProjectInput): Promise<void> => {
    try {
      setError(null)
      await projectService.createProject(project)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add project'
      setError(message)
      throw err
    }
  }

  const updateProject = async (id: string, updates: UpdateProjectInput): Promise<void> => {
    try {
      setError(null)
      await projectService.updateProject(id, updates)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update project'
      setError(message)
      throw err
    }
  }

  const deleteProject = async (id: string): Promise<void> => {
    try {
      setError(null)
      await projectService.deleteProject(id)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete project'
      setError(message)
      throw err
    }
  }

  const reorderProjects = async (reorderedProjects: Project[]): Promise<void> => {
    try {
      setError(null)
      // Optimistic update
      setProjects(reorderedProjects)
      // Sync with Firebase
      await projectService.updateProjectPriorities(reorderedProjects)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reorder projects'
      setError(message)
      // Revert on error - Firebase listener will restore correct state
      throw err
    }
  }

  const value: ProjectContextType = {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
  }

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}
