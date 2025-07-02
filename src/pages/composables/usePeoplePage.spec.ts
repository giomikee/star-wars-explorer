import { beforeAll, describe, expect, it, vi } from 'vitest'
import * as Services from '../../services'
import { mockedPeople } from '../../stores/__mocks__/people'
import { usePeopleStore } from '../../stores/people.store'
import { usePeoplePage } from './usePeoplePage'

vi.mock('../../services')

describe('Feature: usePeoplePage composable', () => {
  describe('Given composable computed properties', () => {
    describe.each([
      {
        people: mockedPeople,
        expected: false,
      },
      {
        people: [],
        expected: true,
      },
    ])('When arePeopleEmpty is evaluated', ({ people, expected }) => {
      describe(`And store ${people.length > 0 ? '' : 'does not'} contains people`, () => {
        it(`Then it should evaluate to ${expected}`, () => {
          const store = usePeopleStore()

          store.people = people

          const { arePeopleEmpty } = usePeoplePage()

          expect(arePeopleEmpty.value).toBe(expected)
        })
      })
    })
  })

  describe('Given composable methods', () => {
    describe('When setPeople method is called', () => {
      const store = usePeopleStore()
      const setPeopleSpy = vi.spyOn(store, 'setPeople')
      const getAllPeopleSpy = vi.spyOn(Services, 'getAllPeople')

      beforeAll(async () => {
        const { setPeople } = usePeoplePage()

        await setPeople()
      })

      it('Then getPeople should be called', () => {
        expect(getAllPeopleSpy).toHaveBeenCalled()
      })

      it('Then setPeople store action should be called', () => {
        expect(setPeopleSpy).toHaveBeenCalledWith(mockedPeople)
      })
    })

    describe('When sortPeopleByDate method is called', () => {
      describe('And isAscending is true', () => {
        const store = usePeopleStore()
        const sortPeopleByDateSpy = vi.spyOn(store, 'sortPeopleByDate')
        const { currentPage, sortPeopleByDate } = usePeoplePage()

        beforeAll(() => {
          sortPeopleByDate(true)
        })

        it('Then sortPeopleByDate store action should be called with true', () => {
          expect(sortPeopleByDateSpy).toHaveBeenCalledWith(true)
        })

        it('Then currentPage should be set to 1', () => {
          expect(currentPage.value).toBe(1)
        })
      })
    })

    describe('When sortPeopleByName method is called', () => {
      describe('And isAscending is true', () => {
        const store = usePeopleStore()
        const sortPeopleByNameSpy = vi.spyOn(store, 'sortPeopleByName')
        const { currentPage, sortPeopleByName } = usePeoplePage()

        beforeAll(() => {
          sortPeopleByName(true)
        })

        it('Then sortPeopleByName store action should be called with true', () => {
          expect(sortPeopleByNameSpy).toHaveBeenCalledWith(true)
        })

        it('Then currentPage should be set to 1', () => {
          expect(currentPage.value).toBe(1)
        })
      })
    })
  })
})
