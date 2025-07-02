import { useTablePage } from '../../composables'
import { getAllPeople } from '../../services'
import { usePeopleStore } from '../../stores/people.store'

export function usePeoplePage () {
  const peopleStore = usePeopleStore()

  const arePeopleEmpty = computed<boolean>(() => peopleStore.people.length === 0)

  const setPeople = async () => {
    const people = await getAllPeople()

    peopleStore.setPeople(people)
  }

  const {
    currentPage,
    itemsPages,
    setSearchedName,
    updateCurrentPage,
  } = useTablePage(
    {
      setSearchedName: peopleStore.setSearchedName,
      resetFilters: peopleStore.resetFilters,
    },
    setPeople,
    arePeopleEmpty,
    peopleStore.getPeopleToDisplay,
  )

  const sortPeopleByDate = (isAscending: boolean) => {
    peopleStore.sortPeopleByDate(isAscending)
    updateCurrentPage(1)
  }

  const sortPeopleByName = (isAscending: boolean) => {
    peopleStore.sortPeopleByName(isAscending)
    updateCurrentPage(1)
  }

  return {
    arePeopleEmpty,
    currentPage,
    itemsPages,
    setSearchedName,
    setPeople,
    sortPeopleByDate,
    sortPeopleByName,
    updateCurrentPage,
  }
}
