import type { People } from '../../interfaces'
import { shallowMount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { mockedPeople } from '../../stores/__mocks__/people'
import { usePeopleStore } from '../../stores/people.store'
import PeopleTable from './PeopleTable.vue'

const defaultProps = { currentPage: 1 }

interface Component {
  paginatedPeople: People[]
}

const createWrapper = (props = defaultProps) => shallowMount(
  PeopleTable,
  {
    props,
    global: {
      stubs: {
        VTable: false,
      },
    },
  })

describe('Given PeopleTable component', () => {
  beforeAll(() => {
    const store = usePeopleStore()
    vi.spyOn(store, 'getPeopleToDisplay').mockReturnValue(mockedPeople)
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
    ])('When paginatedPeople is evaluated', ({ currentPage, expectedLength }) => {
      describe(`And currentPage prop is ${currentPage}`, () => {
        it(`Then it should return ${expectedLength} people from the store`, () => {
          const wrapper = createWrapper({ currentPage })

          expect((wrapper.vm as typeof wrapper.vm & Component).paginatedPeople).toHaveLength(expectedLength)
        })
      })
    })
  })
})
