import type { Item } from './common.interfaces'

export interface People extends Item {
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: any[]
  starships: string[]
  url: string
}
