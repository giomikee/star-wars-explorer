import type { Item } from '../interfaces'

export function filterItemsByName<T extends Item> (items: T[], searchedName: string): T[] {
  if (!searchedName) {
    return items
  }

  return items.filter(({ name }) => name.toLowerCase().includes(searchedName))
};
