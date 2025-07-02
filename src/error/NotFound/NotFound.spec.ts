import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import NotFound from './NotFound.vue'

const createWrapper = () => shallowMount(NotFound)

describe('Given NotFound component', () => {
  describe('When component is rendered', () => {
    it('Then it should match component snapshot', () => {
      const { element } = createWrapper()

      expect(element).toMatchSnapshot()
    })
  })
})
