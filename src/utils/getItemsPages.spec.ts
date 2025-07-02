import { describe, expect, it } from 'vitest'
import { getItemsPages } from './getItemsPages'

describe.each([
  {
    items: Array.from({ length: 3 }),
    expected: 1,
  },
  {
    items: Array.from({ length: 10 }),
    expected: 1,
  },
  {
    items: Array.from({ length: 13 }),
    expected: 2,
  },
  {
    items: Array.from({ length: 20 }),
    expected: 2,
  },
])('Given getItemsPages util', ({ items, expected }) => {
  describe(`When utils is called with ${items.length} items`, () => {
    it(`Then it should return ${expected}`, () => {
      expect(getItemsPages(items)).toBe(expected)
    })
  })
})
