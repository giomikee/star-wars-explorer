import { shallowMount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import { SEARCH_NAME_INPUT_EVENTS } from './SearchNameInput.const'
import SearchNameInput from './SearchNameInput.vue'

interface Component {
  searchedName: string
  clearSearchedName: () => void
}

const createWrapper = (isLoading: boolean) => shallowMount(SearchNameInput, {
  props: { isLoading },
})

describe('Given SearchNameInput component', () => {
  describe.each([true, false])('When component is rendered', isLoading => {
    describe(`And isLoading prop is ${isLoading}`, () => {
      it('Then it should match the snapshot', () => {
        const { element } = createWrapper(isLoading)

        expect(element).toMatchSnapshot()
      })
    })
  })

  describe('Given component methods', () => {
    describe('When clearSearchedName method is called', () => {
      const wrapper = createWrapper(false)
      const instance = wrapper.vm as typeof wrapper.vm & Component

      beforeAll(instance.clearSearchedName)

      it('Then searchedName should be set to empty string', () => {
        expect(instance.searchedName).toBe('')
      })

      it(`Then ${SEARCH_NAME_INPUT_EVENTS.nameSearched} event should be emitted with empty string payload`, () => {
        expect(wrapper.emitted()[SEARCH_NAME_INPUT_EVENTS.nameSearched]).toEqual([['']])
      })
    })
  })
})
