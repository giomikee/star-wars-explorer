import type { Item } from './common.interfaces'

export interface Planet extends Item {
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  edited: string
  url: string
}
