import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from './App.vue'

const createWrapper = () => shallowMount(App)

describe('Given App component', () => {
  describe('When component is rendered', () => {
    it('Then it should match component snapshot', () => {
      const { element } = createWrapper()

      expect(element).toMatchSnapshot()
    })
  })
})
