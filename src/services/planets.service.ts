import type { Planet } from '../interfaces'
import { SWAPI_ENDPOINTS } from '../constants'

export async function getAllPlanets (): Promise<Planet[]> {
  return fetch(SWAPI_ENDPOINTS.planets)
    .then(response => {
      if (!response.ok) {
        throw response
      }

      return response.json()
    })
}
