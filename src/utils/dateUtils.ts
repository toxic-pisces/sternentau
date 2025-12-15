import { format } from 'date-fns'
import { de } from 'date-fns/locale'

/**
 * Format Unix timestamp to German date string
 */
export function formatDate(timestamp: number): string {
  return format(new Date(timestamp), 'dd.MM.yyyy', { locale: de })
}

/**
 * Format Unix timestamp to German date + time string
 */
export function formatDateTime(timestamp: number): string {
  return format(new Date(timestamp), 'dd.MM.yyyy HH:mm', { locale: de })
}

/**
 * Check if deadline is in the past
 */
export function isPastDeadline(deadline: number | null): boolean {
  if (!deadline) return false
  return deadline < Date.now()
}

/**
 * Convert Date object to Unix timestamp
 */
export function dateToTimestamp(date: Date): number {
  return date.getTime()
}
