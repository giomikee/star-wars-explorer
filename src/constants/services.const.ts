const SWAPI_DOMAIN = 'https://swapi.info/api'

export const SWAPI_ENDPOINTS = {
  planets: `${SWAPI_DOMAIN}/planets`,
  people: `${SWAPI_DOMAIN}/people`,
} as const
