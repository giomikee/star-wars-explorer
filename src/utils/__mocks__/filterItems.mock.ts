import type { Item } from '../../interfaces'

export const mockedDate = new Date('2014-12-09T13:50:49.641000Z')

export const mockedItems: Item[] = [
  {
    name: 'Foo',
    created: mockedDate,
  },
  {
    name: 'Food',
    created: mockedDate,
  },
  {
    name: 'Bar',
    created: mockedDate,
  },
]
