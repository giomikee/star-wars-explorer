import type { Planet } from '../interfaces'
import { defineStore } from 'pinia'
import { filterItemsByName, sortItemsByDateCreated, sortItemsByName } from '../utils'

export const usePlanetsStore = defineStore('planets', {
  state: () => ({
    planets: [] as Planet[],
    sortedPlanets: [] as Planet[],
    searchedName: '',
    isSorted: false,
  }),
  getters: {
    filteredPlanets (): Planet[] {
      return filterItemsByName(this.planets, this.searchedName)
    },
    filteredSortedPlanets (): Planet[] {
      return filterItemsByName(this.sortedPlanets, this.searchedName)
    },
  },
  actions: {
    setPlanets (planets: Planet[]) {
      this.planets = planets
    },
    setSearchedName (searchedName: string) {
      this.searchedName = searchedName.toLowerCase()
    },
    setIsSorted (isSorted: boolean) {
      this.isSorted = isSorted
    },
    sortPlanetsByName (isAscending: boolean) {
      this.setIsSorted(true)
      this.sortedPlanets = sortItemsByName(this.planets, isAscending)
    },
    sortPlanetsByDate (isAscending: boolean) {
      this.setIsSorted(true)
      this.sortedPlanets = sortItemsByDateCreated(this.planets, isAscending)
    },
    getPlanetsToDisplay (): Planet[] {
      return this.isSorted ? this.filteredSortedPlanets : this.filteredPlanets
    },
    resetFilters () {
      this.setSearchedName('')
      this.setIsSorted(false)
    },
  },
})
