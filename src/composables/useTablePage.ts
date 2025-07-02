import type { ComputedRef } from 'vue'
import type { BaseStoreActions, getItemsToDisplayType, setStoreItemsType } from './useTablePage.interfaces'
import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ERROR_COMPONENTS, STATUS_CODES } from '../constants'
import { getItemsPages } from '../utils'
import { usePagination } from './usePagination'

export function useTablePage (
  storeActions: BaseStoreActions,
  setStoreItems: setStoreItemsType,
  areItemsEmpty: ComputedRef<boolean>,
  getItemsToDisplay: getItemsToDisplayType,
) {
  const router = useRouter()
  const { currentPage, updateCurrentPage } = usePagination()

  const itemsPages = computed<number>(() => getItemsPages(getItemsToDisplay()))

  const setSearchedName = (searchedName: string) => {
    storeActions.setSearchedName(searchedName)
    updateCurrentPage(1)
  }

  onMounted(async () => {
    if (!areItemsEmpty.value) {
      return
    }

    try {
      await setStoreItems()
    } catch (error) {
      if ((error as Response).status === STATUS_CODES.notFound) {
        router.replace({ name: ERROR_COMPONENTS.notFound })
        return
      }

      console.error(error)
      router.replace({ name: ERROR_COMPONENTS.serverError })
    }
  })

  onBeforeUnmount(() => {
    storeActions.resetFilters()
  })

  return {
    currentPage,
    itemsPages,
    setSearchedName,
    updateCurrentPage,
  }
}
