import { useTablePage } from '../../composables'
import { getAllPlanets } from '../../services'
import { usePlanetsStore } from '../../stores/planets.store'

export function usePlanetsPage () {
  const planetsStore = usePlanetsStore()

  const setPlanets = async () => {
    const planets = await getAllPlanets()

    planetsStore.setPlanets(planets)
  }

  const arePlanetsEmpty = computed<boolean>(() => planetsStore.planets.length === 0)

  const {
    currentPage,
    itemsPages,
    setSearchedName,
    updateCurrentPage,
  } = useTablePage(
    {
      setSearchedName: planetsStore.setSearchedName,
      resetFilters: planetsStore.resetFilters,
    },
    setPlanets,
    arePlanetsEmpty,
    planetsStore.getPlanetsToDisplay,
  )

  const sortPlanetsByDate = (isAscending: boolean) => {
    planetsStore.sortPlanetsByDate(isAscending)
    updateCurrentPage(1)
  }

  const sortPlanetsByName = (isAscending: boolean) => {
    planetsStore.sortPlanetsByName(isAscending)
    updateCurrentPage(1)
  }

  return {
    arePlanetsEmpty,
    currentPage,
    itemsPages,
    setSearchedName,
    setPlanets,
    sortPlanetsByDate,
    sortPlanetsByName,
    updateCurrentPage,
  }
}
