import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Homepage from './index.vue'

const createWrapper = () => shallowMount(Homepage)

describe('Given Homepage component', () => {
  describe('When component is rendered', () => {
    it('Then it should match the snapshot', () => {
      const { element } = createWrapper()

      expect(element).toMatchSnapshot()
    })
  })
})
