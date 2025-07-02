import { describe, expect, it, vi } from 'vitest'
import { SORT_BUTTONS_EVENTS, SORT_OPTIONS } from '../SortButtons.const'
import { useSortButtons } from './useSortButtons'
import { SORT_ICONS } from './useSortButtons.const'

const emitMock = vi.fn()

describe('Feature: useSortButtons composable', () => {
  describe('Given component methods', () => {
    describe.each([
      {
        sortOption: SORT_OPTIONS.date,
        selectedSortValue: undefined,
        isDateAscending: false,
        isNameAscending: false,
        expected: undefined,
      },
      {
        sortOption: SORT_OPTIONS.date,
        selectedSortValue: SORT_OPTIONS.name,
        isDateAscending: false,
        isNameAscending: false,
        expected: undefined,
      },
      {
        sortOption: SORT_OPTIONS.date,
        selectedSortValue: SORT_OPTIONS.date,
        isDateAscending: true,
        isNameAscending: false,
        expected: SORT_ICONS.date.ascending,
      },
      {
        sortOption: SORT_OPTIONS.date,
        selectedSortValue: SORT_OPTIONS.date,
        isDateAscending: false,
        isNameAscending: false,
        expected: SORT_ICONS.date.descending,
      },
      {
        sortOption: SORT_OPTIONS.name,
        selectedSortValue: SORT_OPTIONS.name,
        isDateAscending: false,
        isNameAscending: false,
        expected: SORT_ICONS.name.descending,
      },
    ])('When getAppendIcon method is called', ({ sortOption, selectedSortValue, isDateAscending, isNameAscending, expected }) => {
      describe(`And sortOption is ${sortOption}`, () => {
        describe(`But selectedSort is ${selectedSortValue}`, () => {
          describe(`And isDateAscending is ${isDateAscending}`, () => {
            describe(`But isNameAscending is ${isNameAscending}`, () => {
              it(`Then it should return ${expected}`, () => {
                const { selectedSort, sortOptionsIsAscending, getAppendIcon } = useSortButtons(emitMock)

                selectedSort.value = selectedSortValue
                sortOptionsIsAscending.value.date = isDateAscending
                sortOptionsIsAscending.value.name = isNameAscending

                expect(getAppendIcon(sortOption)).toBe(expected)
              })
            })
          })
        })
      })
    })

    describe.each([
      {
        selectedSortValue: SORT_OPTIONS.date,
        isDateAscending: true,
        isNameAscending: false,
        expected: {
          event: SORT_BUTTONS_EVENTS.date,
          payload: false,
        },
      },
      {
        selectedSortValue: SORT_OPTIONS.date,
        isDateAscending: false,
        isNameAscending: false,
        expected: {
          event: SORT_BUTTONS_EVENTS.date,
          payload: true,
        },
      },
      {
        selectedSortValue: SORT_OPTIONS.name,
        isDateAscending: false,
        isNameAscending: true,
        expected: {
          event: SORT_BUTTONS_EVENTS.name,
          payload: false,
        },
      },
      {
        selectedSortValue: SORT_OPTIONS.name,
        isDateAscending: false,
        isNameAscending: false,
        expected: {
          event: SORT_BUTTONS_EVENTS.name,
          payload: true,
        },
      },
    ])('When emitSelectedSort method is called', ({ selectedSortValue, isDateAscending, isNameAscending, expected }) => {
      describe(`And selectedSort is ${selectedSortValue}`, () => {
        describe(`But isDateAscending ${isDateAscending}`, () => {
          describe(`And isNameAscending ${isNameAscending}`, () => {
            it(`Then it should emit "${expected.event}" event with ${expected.payload} payload`, () => {
              const { selectedSort, sortOptionsIsAscending, emitSelectedSort } = useSortButtons(emitMock)

              selectedSort.value = selectedSortValue
              sortOptionsIsAscending.value.date = isDateAscending
              sortOptionsIsAscending.value.name = isNameAscending

              emitSelectedSort()

              expect(emitMock).toHaveBeenCalledWith(expected.event, expected.payload)
            })
          })
        })
      })
    })
  })
})
