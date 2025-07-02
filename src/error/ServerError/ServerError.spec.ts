import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ServerError from './ServerError.vue'

const createWrapper = () => shallowMount(ServerError)

describe('Given ServerError component', () => {
  describe('When component is rendered', () => {
    it('Then it should match component snapshot', () => {
      const { element } = createWrapper()

      expect(element).toMatchSnapshot()
    })
  })
})
