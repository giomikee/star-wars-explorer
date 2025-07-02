import { describe, expect, it } from 'vitest'
import { formatDateTime } from './formatDateTime'

describe.each([
  {
    dateTime: '2014-12-20T21:17:56.891000Z',
    expected: 'December 20, 2014 at 9:17 PM',
  },
  {
    dateTime: '',
    expected: 'Invalid Date',
  },
])('Given formatDateTime utils', ({ dateTime, expected }) => {
  describe(`When util is called with "${dateTime}"`, () => {
    it(`Then it should return "${expected}"`, () => {
      expect(formatDateTime(dateTime)).toBe(expected)
    })
  })
})
