import { beforeAll, describe, expect, it, vi } from 'vitest'
import * as Services from '../../services'
import { mockedPlanets } from '../../stores/__mocks__/planets'
import { usePlanetsStore } from '../../stores/planets.store'
import { usePlanetsPage } from './usePlanetsPage'

vi.mock('../../services')

describe('Feature: usePlanetsPage composable', () => {
  describe('Given composable computed properties', () => {
    describe.each([
      {
        planets: mockedPlanets,
        expected: false,
      },
      {
        planets: [],
        expected: true,
      },
    ])('When arePlanetsEmpty is evaluated', ({ planets, expected }) => {
      describe(`And store ${planets.length > 0 ? '' : 'does not'} contains planets`, () => {
        it(`Then it should evaluate to ${expected}`, () => {
          const store = usePlanetsStore()

          store.planets = planets

          const { arePlanetsEmpty } = usePlanetsPage()

          expect(arePlanetsEmpty.value).toBe(expected)
        })
      })
    })
  })

  describe('Given composable methods', () => {
    describe('When setPlanets method is called', () => {
      const store = usePlanetsStore()
      const setPeopleSpy = vi.spyOn(store, 'setPlanets')
      const getAllPeopleSpy = vi.spyOn(Services, 'getAllPlanets')

      beforeAll(async () => {
        const { setPlanets } = usePlanetsPage()

        await setPlanets()
      })

      it('Then getPeople should be called', () => {
        expect(getAllPeopleSpy).toHaveBeenCalled()
      })

      it('Then setPlanets store action should be called', () => {
        expect(setPeopleSpy).toHaveBeenCalledWith(mockedPlanets)
      })
    })

    describe('When sortPlanetsByDate method is called', () => {
      describe('And isAscending is true', () => {
        const store = usePlanetsStore()
        const sortPeopleByDateSpy = vi.spyOn(store, 'sortPlanetsByDate')
        const { currentPage, sortPlanetsByDate } = usePlanetsPage()

        beforeAll(() => {
          sortPlanetsByDate(true)
        })

        it('Then sortPlanetsByDate store action should be called with true', () => {
          expect(sortPeopleByDateSpy).toHaveBeenCalledWith(true)
        })

        it('Then currentPage should be set to 1', () => {
          expect(currentPage.value).toBe(1)
        })
      })
    })

    describe('When sortPlanetsByName method is called', () => {
      describe('And isAscending is true', () => {
        const store = usePlanetsStore()
        const sortPeopleByNameSpy = vi.spyOn(store, 'sortPlanetsByName')
        const { currentPage, sortPlanetsByName } = usePlanetsPage()

        beforeAll(() => {
          sortPlanetsByName(true)
        })

        it('Then sortPlanetsByName store action should be called with true', () => {
          expect(sortPeopleByNameSpy).toHaveBeenCalledWith(true)
        })

        it('Then currentPage should be set to 1', () => {
          expect(currentPage.value).toBe(1)
        })
      })
    })
  })
})
