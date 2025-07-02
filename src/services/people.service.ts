import type { People } from '../interfaces'
import { SWAPI_ENDPOINTS } from '../constants'

export async function getAllPeople (): Promise<People[]> {
  return fetch(SWAPI_ENDPOINTS.people)
    .then(response => {
      if (!response.ok) {
        throw response
      }

      return response.json()
    })
}
