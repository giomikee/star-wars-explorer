import { describe, expect, it } from 'vitest'
import { mockedDate, mockedItems } from './__mocks__/filterItems.mock'
import { filterItemsByName } from './filterItems'

describe('Given filterItems util', () => {
  describe.each([
    {
      searchedName: 'foo',
      expected: [
        {
          name: 'Foo',
          created: mockedDate,
        },
        {
          name: 'Food',
          created: mockedDate,
        },
      ],
    },
    {
      searchedName: 'food',
      expected: [
        {
          name: 'Food',
          created: mockedDate,
        },
      ],
    },
    {
      searchedName: 'bars',
      expected: [],
    },
    {
      searchedName: '',
      expected: mockedItems,
    },
  ])(`When the util is called with items: ${JSON.stringify(mockedItems)}`, ({ searchedName, expected }) => {
    describe(`And searchedName is "${searchedName}"`, () => {
      it(`Then it should return ${JSON.stringify(expected)}`, () => {
        expect(filterItemsByName(mockedItems, searchedName)).toEqual(expected)
      })
    })
  })
})
