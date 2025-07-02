import type { GetAppendIconReturn, SortButtonsEmit, SortOption } from './useSortButtons.interfaces'
import { SORT_BUTTONS_EVENTS, SORT_OPTIONS } from '../SortButtons.const'
import { SORT_ICONS } from './useSortButtons.const'

export function useSortButtons (emit: SortButtonsEmit) {
  const selectedSort = ref<SortOption>()

  const sortOptionsIsAscending = ref<Record<SortOption, boolean>>({
    [SORT_OPTIONS.date]: false,
    [SORT_OPTIONS.name]: false,
  })

  const getAppendIcon = (sortOption: string): GetAppendIconReturn => {
    if (!selectedSort.value || selectedSort.value !== sortOption) {
      return undefined
    }

    if (sortOption === SORT_OPTIONS.date) {
      return sortOptionsIsAscending.value.date ? SORT_ICONS.date.ascending : SORT_ICONS.date.descending
    }

    return sortOptionsIsAscending.value.name ? SORT_ICONS.name.ascending : SORT_ICONS.name.descending
  }

  const emitSelectedSort = () => {
    if (!selectedSort.value) {
      return
    }

    const isAscending = sortOptionsIsAscending.value[selectedSort.value]

    for (const sortOption of Object.keys(sortOptionsIsAscending.value)) {
      sortOptionsIsAscending.value[sortOption as SortOption] = false
    }

    sortOptionsIsAscending.value[selectedSort.value] = !isAscending

    emit(SORT_BUTTONS_EVENTS[selectedSort.value], !isAscending)
  }

  return {
    selectedSort,
    sortOptionsIsAscending,
    getAppendIcon,
    emitSelectedSort,
  }
}
