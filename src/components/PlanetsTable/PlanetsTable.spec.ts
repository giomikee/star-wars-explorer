import type { Planet } from '../../interfaces'
import { shallowMount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { mockedPlanets } from '../../stores/__mocks__/planets'
import { usePlanetsStore } from '../../stores/planets.store'
import PlanetsTable from './PlanetsTable.vue'

const defaultProps = { currentPage: 1 }

interface Component {
  paginatedPlanets: Planet[]
}

const createWrapper = (props = defaultProps) => shallowMount(
  PlanetsTable,
  {
    props,
    global: {
      stubs: {
        VTable: false,
      },
    },
  })

describe('Given PlanetsTable component', () => {
  beforeAll(() => {
    const store = usePlanetsStore()
    vi.spyOn(store, 'getPlanetsToDisplay').mockReturnValue(mockedPlanets)
  })

  describe('When component is rendered', () => {
    it('Then it should match snapshot', () => {
      const { element } = createWrapper()

      expect(element).toMatchSnapshot()
    })
  })

  describe('Given computed properties', () => {
    describe.each([
      {
        currentPage: 1,
        expectedLength: 10,
      },
      {
        currentPage: 2,
        expectedLength: 2,
      },
    ])('When paginatedPlanets is evaluated', ({ currentPage, expectedLength }) => {
      describe(`And currentPage prop is ${currentPage}`, () => {
        it(`Then it should return ${expectedLength} Planets from the store`, () => {
          const wrapper = createWrapper({ currentPage })

          expect((wrapper.vm as typeof wrapper.vm & Component).paginatedPlanets).toHaveLength(expectedLength)
        })
      })
    })
  })
})
