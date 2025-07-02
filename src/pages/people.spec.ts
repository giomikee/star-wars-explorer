import { shallowMount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { usePeopleStore } from '../stores/people.store'
import People from './people.vue'

const createWrapper = () => shallowMount(People)

describe('Given people page component', () => {
  describe('When component is rendered', () => {
    it('Then it should match the snapshot', () => {
      const store = usePeopleStore()

      vi.spyOn(store, 'getPeopleToDisplay').mockReturnValueOnce([])

      const { element } = createWrapper()

      expect(element).toMatchSnapshot()
    })
  })
})
