import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TitleComponent from './TitleComponent.vue'

const createWrapper = () => shallowMount(TitleComponent)

describe('Given TitleComponent component', () => {
  describe('When component is rendered', () => {
    it('Then it should match snapshot', () => {
      const { element } = createWrapper()

      expect(element).toMatchSnapshot()
    })
  })
})
