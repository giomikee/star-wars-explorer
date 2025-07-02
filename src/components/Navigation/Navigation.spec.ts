import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Navigation from './Navigation.vue'

const createWrapper = () => shallowMount(Navigation)

describe('Given Navigation component', () => {
  describe('When component is rendered', () => {
    it('Then it should match component snapshot', () => {
      const { element } = createWrapper()

      expect(element).toMatchSnapshot()
    })
  })
})
