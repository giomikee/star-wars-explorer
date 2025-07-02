import { shallowMount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { usePlanetsStore } from '../stores/planets.store'
import Planets from './planets.vue'

const createWrapper = () => shallowMount(Planets)

describe('Given planets page component', () => {
  describe('When component is rendered', () => {
    it('Then it should match the snapshot', () => {
      const store = usePlanetsStore()

      vi.spyOn(store, 'getPlanetsToDisplay').mockReturnValueOnce([])

      const { element } = createWrapper()

      expect(element).toMatchSnapshot()
    })
  })
})
