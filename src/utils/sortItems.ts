import type { Item } from '../interfaces'

export function sortItemsByName<T extends Item> (items: T[], isAscending: boolean): T[] {
  return [...items].sort((a, b) => isAscending
    ? a.name.localeCompare(b.name)
    : b.name.localeCompare(a.name))
}

export function sortItemsByDateCreated<T extends Item> (items: T[], isAscending: boolean): T[] {
  return [...items].sort((a, b) => isAscending
    ? new Date(a.created).getTime() - new Date(b.created).getTime()
    : new Date(b.created).getTime() - new Date(a.created).getTime())
}
