export function getPaginatedItems<T> (items: T[], page: number): T[] {
  return items.slice((page - 1) * 10, page * 10)
};
