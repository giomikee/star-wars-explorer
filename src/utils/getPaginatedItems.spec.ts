import { describe, expect, it } from 'vitest'
import { getPaginatedItems } from './getPaginatedItems'

const mockedItems = Array.from({ length: 17 })

describe('Given getPaginatedItems util', () => {
  describe.each([
    {
      page: 1,
      expectedLength: 10,
    },
    {
      page: 2,
      expectedLength: 7,
    },
    {
      page: 3,
      expectedLength: 0,
    },
  ])(`When util is called with ${mockedItems.length} items`, ({ page, expectedLength }) => {
    describe(`And page is ${page}`, () => {
      it(`Then it should return ${expectedLength} items`, () => {
        expect(getPaginatedItems(mockedItems, page)).toHaveLength(expectedLength)
      })
    })
  })
})
