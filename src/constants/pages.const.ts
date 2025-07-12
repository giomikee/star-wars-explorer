export const baseUrl = import.meta.env.VITE_APP_BASE || '/'

export const PAGES = {
  planets: `${baseUrl}planets`,
  people: `${baseUrl}people`,
} as const
