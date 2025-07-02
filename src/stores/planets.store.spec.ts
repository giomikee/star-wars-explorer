import { createPinia, setActivePinia } from 'pinia'

import { beforeAll, describe, expect, it } from 'vitest'
import { EXPECTED_SORTED_PLANETS_DATE_ASCENDING, EXPECTED_SORTED_PLANETS_DATE_DESCENDING, EXPECTED_SORTED_PLANETS_NAME_ASCENDING, EXPECTED_SORTED_PLANETS_NAME_DESCENDING, FILTERED_PLANETS_TEST_CASES, FILTERED_SORTED_PLANETS_TEST_CASES, MOCKED_TATOOINE_PLANET, mockedPlanets } from './__mocks__/planets'
import { usePlanetsStore } from './planets.store'

describe('Feature: planets store', () => {
  let store: ReturnType<typeof usePlanetsStore>
  beforeAll(() => {
    setActivePinia(createPinia())
    store = usePlanetsStore()
  })

  describe('Given store getters', () => {
    describe.each(FILTERED_PLANETS_TEST_CASES)('When filteredPlanets is evaluated', ({ searchedName, expected }) => {
      describe(`And searchedName is set to ${searchedName}`, () => {
        it(`Then it should have ${JSON.stringify(expected)}`, () => {
          store.setPlanets(mockedPlanets)
          store.setSearchedName(searchedName)
          expect(store.filteredPlanets).toEqual(expected)
        })
      })
    })

    describe.each(FILTERED_SORTED_PLANETS_TEST_CASES)('When filteredSortedPlanets is evaluated', ({ searchedName, expected }) => {
      describe(`And searchedName is set to ${searchedName}`, () => {
        it(`Then it should have ${JSON.stringify(expected)}`, () => {
          store.setPlanets(mockedPlanets)
          store.sortPlanetsByDate(true)
          store.setSearchedName(searchedName)
          expect(store.filteredSortedPlanets).toEqual(expected)
        })
      })
    })
  })

  describe('Given store actions', () => {
    describe(`When setPlanets is called with ${JSON.stringify(MOCKED_TATOOINE_PLANET)}`, () => {
      it(`then people should be set to ${JSON.stringify(MOCKED_TATOOINE_PLANET)}`, () => {
        store.setPlanets([MOCKED_TATOOINE_PLANET])

        expect(store.planets).toEqual([MOCKED_TATOOINE_PLANET])
      })
    })

    describe.each([
      {
        searchedName: 'foo',
        expected: 'foo',
      },
      {
        searchedName: 'Bar',
        expected: 'bar',
      },
      {
        searchedName: 'FOObar',
        expected: 'foobar',
      },
      {
        searchedName: 'FOOBAR',
        expected: 'foobar',
      },
    ])('When setSearchedName is called', ({ searchedName, expected }) => {
      describe(`And searched name passed is ${searchedName}`, () => {
        it(`Then searchedName should be set to ${expected}`, () => {
          store.setSearchedName(searchedName)
          expect(store.searchedName).toBe(expected)
        })
      })
    })

    describe.each([true, false])('When setIsSorted is called', isSorted => {
      describe(`And isSorted passed is ${isSorted}`, () => {
        it(`Then isSorted should be set to ${isSorted}`, () => {
          store.setIsSorted(isSorted)

          expect(store.isSorted).toBe(isSorted)
        })
      })
    })

    describe.each([true, false])('When sortPlanetsByName is called', isAscending => {
      describe(`And isAscending passed is ${isAscending}`, () => {
        beforeAll(() => {
          store.setPlanets(mockedPlanets)
          store.sortPlanetsByName(isAscending)
        })

        it('Then isSorted should be set to true', () => {
          expect(store.isSorted).toBeTruthy()
        })

        it(`Then sortedPlanets should have people sorted by name ${isAscending ? 'ascending' : 'descending'}`, () => {
          expect(store.sortedPlanets).toEqual(isAscending ? EXPECTED_SORTED_PLANETS_NAME_ASCENDING : EXPECTED_SORTED_PLANETS_NAME_DESCENDING)
        })
      })
    })

    describe.each([true, false])('When sortPlanetsByDate is called', isAscending => {
      describe(`And isAscending passed is ${isAscending}`, () => {
        beforeAll(() => {
          store.setPlanets(mockedPlanets)
          store.sortPlanetsByDate(isAscending)
        })

        it('Then isSorted should be set to true', () => {
          expect(store.isSorted).toBeTruthy()
        })

        it(`Then sortedPlanets should have people sorted by date ${isAscending ? 'ascending' : 'descending'}`, () => {
          expect(store.sortedPlanets).toEqual(isAscending ? EXPECTED_SORTED_PLANETS_DATE_ASCENDING : EXPECTED_SORTED_PLANETS_DATE_DESCENDING)
        })
      })
    })

    describe.each([true, false])('When getPlanetsToDisplay is called', isSorted => {
      describe(`And isSorted is ${isSorted}`, () => {
        it(`Then it should return ${isSorted ? 'sorted' : 'unsorted'} people`, () => {
          store.setSearchedName('')
          store.setPlanets(mockedPlanets)
          store.sortPlanetsByName(true)
          store.setIsSorted(isSorted)

          expect(store.getPlanetsToDisplay()).toEqual(isSorted ? EXPECTED_SORTED_PLANETS_NAME_ASCENDING : mockedPlanets)
        })
      })
    })

    describe('When resetFilters is called', () => {
      beforeAll(() => store.resetFilters())

      it('Then searchedName should be set to empty string', () => {
        expect(store.searchedName).toBe('')
      })
      it('Then isSorted should be set to falase', () => {
        expect(store.isSorted).toBeFalsy()
      })
    })
  })
})
