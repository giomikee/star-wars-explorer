import type { ComputedRef } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { computed, defineComponent, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ERROR_COMPONENTS, STATUS_CODES } from '../constants'
import { useTablePage } from './useTablePage'

vi.mock('vue-router', async () => ({
  ...(await vi.importActual('vue-router')),
  useRouter: vi.fn().mockReturnValue({
    replace: vi.fn(),
  }),
}))

const mockedStoreActions = {
  setSearchedName: vi.fn(),
  resetFilters: vi.fn(),
}

const createTestComponentWrapper = (setStoreItems: () => Promise<void>, areItemsEmpty: ComputedRef<boolean>) => {
  const TestComponent = defineComponent({
    setup () {
      useTablePage(mockedStoreActions, setStoreItems, areItemsEmpty, vi.fn())
    },
  })

  return shallowMount(TestComponent)
}

describe('Feature: useTablePage composable', () => {
  describe('Given composable computed properties', () => {
    describe.each([
      {
        itemsToDisplay: Array.from({ length: 3 }),
        expected: 1,
      },
      {
        itemsToDisplay: Array.from({ length: 10 }),
        expected: 1,
      },
      {
        itemsToDisplay: Array.from({ length: 13 }),
        expected: 2,
      },
      {
        itemsToDisplay: Array.from({ length: 20 }),
        expected: 2,
      },
    ])('When itemsPages is evaluated', ({ itemsToDisplay, expected }) => {
      describe(`And there are ${itemsToDisplay.length} items to display`, () => {
        it(`Then it should return ${expected}`, () => {
          const { itemsPages } = useTablePage(
            mockedStoreActions,
            vi.fn(),
            computed<boolean>(() => false),
            vi.fn().mockReturnValueOnce(itemsToDisplay),
          )

          expect(itemsPages.value).toBe(expected)
        })
      })
    })
  })

  describe('Given composable methods', () => {
    describe('When setSearchedName is called with "foobar" searched name', () => {
      const { currentPage, setSearchedName } = useTablePage(
        mockedStoreActions,
        vi.fn(),
        computed<boolean>(() => false),
        vi.fn().mockReturnValueOnce([]),
      )

      beforeAll(() => setSearchedName('foobar'))

      it('Then setSearchedName store action should be called with "foobar"', () => {
        expect(mockedStoreActions.setSearchedName).toHaveBeenCalledWith('foobar')
      })

      it('Then currentPage should be set to 1', () => {
        expect(currentPage.value).toBe(1)
      })
    })
  })

  describe('When component using composable is mounted', () => {
    describe('And areItemsEmpty is false', () => {
      it('Then error page should not show', async () => {
        const router = useRouter()

        createTestComponentWrapper(vi.fn(), computed<boolean>(() => false))
        await nextTick()

        expect(router.replace).not.toHaveBeenCalled()
      })
    })

    describe('And areItemsEmpty is true', () => {
      describe('But calling setStoreItems finishes successfully', () => {
        it('Then error page should not show', async () => {
          const router = useRouter()

          createTestComponentWrapper(vi.fn().mockResolvedValue(null), computed<boolean>(() => true))
          await nextTick()

          expect(router.replace).not.toHaveBeenCalled()
        })
      })

      describe.each([
        {
          error: { status: STATUS_CODES.notFound },
          expectedErrorPage: ERROR_COMPONENTS.notFound,
        },
        {
          error: 'Error',
          expectedErrorPage: ERROR_COMPONENTS.serverError,
        },
      ])('But calling setStoreItems fails', ({ error, expectedErrorPage }) => {
        describe(`And error is ${JSON.stringify(error)}`, () => {
          it(`Then it should redirect to ${expectedErrorPage} error page`, async () => {
            const router = useRouter()

            createTestComponentWrapper(vi.fn().mockRejectedValueOnce(error), computed<boolean>(() => true))

            await nextTick()

            expect(router.replace).toHaveBeenCalledWith({ name: expectedErrorPage })
          })
        })
      })
    })
  })

  describe('When component using composable is unmounted', () => {
    it('Then resetFilters store action should be called', () => {
      const wrapper = createTestComponentWrapper(mockedStoreActions.resetFilters, computed<boolean>(() => false))

      wrapper.unmount()

      expect(mockedStoreActions.resetFilters).toHaveBeenCalled()
    })
  })
})
