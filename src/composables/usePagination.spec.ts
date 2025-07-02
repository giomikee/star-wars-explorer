import { describe, expect, it } from 'vitest'
import { usePagination } from './usePagination'

describe('Feature: usePagination composable', () => {
  describe('Given compasable methods', () => {
    describe('When updateCurrentPage is called with 10', () => {
      it('Then currentPage should be updated to 10', () => {
        const { currentPage, updateCurrentPage } = usePagination()

        updateCurrentPage(10)

        expect(currentPage.value).toBe(10)
      })
    })
  })
})
