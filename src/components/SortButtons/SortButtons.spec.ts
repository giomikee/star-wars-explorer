import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SortButtons from './SortButtons.vue'

const createWrapper = (isLoading: boolean) => shallowMount(SortButtons, {
  props: { isLoading },
  global: {
    stubs: {
      VBtnToggle: false,
      VBtnGroup: false,
    },
  },
})

describe('Given SortButtons component', () => {
  describe.each([true, false])('When component is rendered', isLoading => {
    describe(`And isLoading ${isLoading}`, () => {
      it('Then it should match the snapshot', () => {
        const { element } = createWrapper(isLoading)

        expect(element).toMatchSnapshot()
      })
    })
  })
})
