import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { TABLE_WRAPPER_EVENTS } from './TableWrapper.const'
import TableWrapper from './TableWrapper.vue'

interface Component {
  tableCurrentPage: number
}

const createWrapper = (props: { currentPage: number, isLoading: boolean, pages: number }) => shallowMount(
  TableWrapper,
  {
    props,
    global: {
      stubs: {
        VSkeletonLoader: false,
      },
    },
  },
)

describe('Given TableWrapper component', () => {
  describe.each([true, false])('When component is rendered', isLoading => {
    describe(`And isLoading is ${isLoading}`, () => {
      it('Then it should match snapshot', () => {
        const { element } = createWrapper({
          currentPage: 1,
          isLoading,
          pages: 2,
        })

        expect(element).toMatchSnapshot()
      })
    })
  })

  describe('Given component watchers', () => {
    describe('When currentPage prop is set to 2', () => {
      it('Then tableCurrentPage should be set to 2', async () => {
        const wrapper = createWrapper({
          currentPage: 1,
          isLoading: false,
          pages: 5,
        })

        await wrapper.setProps({ currentPage: 2 })

        expect((wrapper.vm as typeof wrapper.vm & Component).tableCurrentPage).toBe(2)
      })
    })

    describe('When tableCurrentPage is updated to 2', () => {
      it(`Then "${TABLE_WRAPPER_EVENTS.pageChanged}" event should be emitted with 2 as payload `, async () => {
        const wrapper = createWrapper({
          currentPage: 1,
          isLoading: false,
          pages: 5,
        });

        (wrapper.vm as typeof wrapper.vm & Component).tableCurrentPage = 2

        await nextTick()

        expect(wrapper.emitted()[TABLE_WRAPPER_EVENTS.pageChanged]).toEqual([[2]])
      })
    })
  })
})
