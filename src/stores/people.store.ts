import type { People } from '../interfaces'
import { defineStore } from 'pinia'
import { SWAPI_ENDPOINTS } from '../constants'
import { filterItemsByName, sortItemsByDateCreated, sortItemsByName } from '../utils'

export const usePeopleStore = defineStore('people', {
  state: () => ({
    people: [] as People[],
    sortedPeople: [] as People[],
    searchedName: '',
    isSorted: false,
  }),
  getters: {
    filteredPeople (): People[] {
      return filterItemsByName(this.people, this.searchedName)
    },
    filteredSortedPeople (): People[] {
      return filterItemsByName(this.sortedPeople, this.searchedName)
    },
  },
  actions: {
    setPeople (people: People[]) {
      this.people = people
    },
    setSearchedName (searchedName: string) {
      this.searchedName = searchedName.toLowerCase()
    },
    setIsSorted (isSorted: boolean) {
      this.isSorted = isSorted
    },
    sortPeopleByName (isAscending: boolean) {
      this.setIsSorted(true)
      this.sortedPeople = sortItemsByName(this.people, isAscending)
    },
    sortPeopleByDate (isAscending: boolean) {
      this.setIsSorted(true)
      this.sortedPeople = sortItemsByDateCreated(this.people, isAscending)
    },
    getPeopleToDisplay (): People[] {
      return this.isSorted ? this.filteredSortedPeople : this.filteredPeople
    },
    findPeople (id: string): People | undefined {
      return this.people.find(({ url }) => url === `${SWAPI_ENDPOINTS.people}/${id}`)
    },
    resetFilters () {
      this.setSearchedName('')
      this.setIsSorted(false)
    },
  },
})
