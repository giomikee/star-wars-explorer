import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, expect, it } from 'vitest'
import { EXPECTED_SORTED_PEOPLE_DATE_ASCENDING, EXPECTED_SORTED_PEOPLE_DATE_DESCENDING, EXPECTED_SORTED_PEOPLE_NAME_ASCENDING, EXPECTED_SORTED_PEOPLE_NAME_DESCENDING, FILTERED_PEOPLE_TEST_CASES, FILTERED_SORTED_PEOPLE_TEST_CASES, MOCKED_LUKE_PERSON, mockedPeople } from './__mocks__/people'
import { usePeopleStore } from './people.store'

describe('Feature: people store', () => {
  let store: ReturnType<typeof usePeopleStore>
  beforeAll(() => {
    setActivePinia(createPinia())
    store = usePeopleStore()
  })

  describe('Given store getters', () => {
    describe.each(FILTERED_PEOPLE_TEST_CASES)('When filteredPeople is evaluated', ({ searchedName, expected }) => {
      describe(`And searchedName is set to ${searchedName}`, () => {
        it(`Then it should have ${JSON.stringify(expected)}`, () => {
          store.setPeople(mockedPeople)
          store.setSearchedName(searchedName)
          expect(store.filteredPeople).toEqual(expected)
        })
      })
    })

    describe.each(FILTERED_SORTED_PEOPLE_TEST_CASES)('When filteredSortedPeople is evaluated', ({ searchedName, expected }) => {
      describe(`And searchedName is set to ${searchedName}`, () => {
        it(`Then it should have ${JSON.stringify(expected)}`, () => {
          store.setPeople(mockedPeople)
          store.sortPeopleByDate(true)
          store.setSearchedName(searchedName)
          expect(store.filteredSortedPeople).toEqual(expected)
        })
      })
    })
  })

  describe('Given store actions', () => {
    describe(`When setPeople is called with ${JSON.stringify(MOCKED_LUKE_PERSON)}`, () => {
      it(`then people should be set to ${JSON.stringify(MOCKED_LUKE_PERSON)}`, () => {
        store.setPeople([MOCKED_LUKE_PERSON])

        expect(store.people).toEqual([MOCKED_LUKE_PERSON])
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

    describe.each([true, false])('When sortPeopleByName is called', isAscending => {
      describe(`And isAscending passed is ${isAscending}`, () => {
        beforeAll(() => {
          store.setPeople(mockedPeople)
          store.sortPeopleByName(isAscending)
        })

        it('Then isSorted should be set to true', () => {
          expect(store.isSorted).toBeTruthy()
        })

        it(`Then sortedPeople should have people sorted by name ${isAscending ? 'ascending' : 'descending'}`, () => {
          expect(store.sortedPeople).toEqual(isAscending ? EXPECTED_SORTED_PEOPLE_NAME_ASCENDING : EXPECTED_SORTED_PEOPLE_NAME_DESCENDING)
        })
      })
    })

    describe.each([true, false])('When sortPeopleByDate is called', isAscending => {
      describe(`And isAscending passed is ${isAscending}`, () => {
        beforeAll(() => {
          store.setPeople(mockedPeople)
          store.sortPeopleByDate(isAscending)
        })

        it('Then isSorted should be set to true', () => {
          expect(store.isSorted).toBeTruthy()
        })

        it(`Then sortedPeople should have people sorted by date ${isAscending ? 'ascending' : 'descending'}`, () => {
          expect(store.sortedPeople).toEqual(isAscending ? EXPECTED_SORTED_PEOPLE_DATE_ASCENDING : EXPECTED_SORTED_PEOPLE_DATE_DESCENDING)
        })
      })
    })

    describe.each([true, false])('When getPeopleToDisplay is called', isSorted => {
      describe(`And isSorted is ${isSorted}`, () => {
        it(`Then it should return ${isSorted ? 'sorted' : 'unsorted'} people`, () => {
          store.setSearchedName('')
          store.setPeople(mockedPeople)
          store.sortPeopleByName(true)
          store.setIsSorted(isSorted)

          expect(store.getPeopleToDisplay()).toEqual(isSorted ? EXPECTED_SORTED_PEOPLE_NAME_ASCENDING : mockedPeople)
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
