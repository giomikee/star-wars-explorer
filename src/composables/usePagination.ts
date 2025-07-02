import { ref } from 'vue'

export function usePagination () {
  const currentPage = ref<number>(1)

  const updateCurrentPage = (newPage: number) => {
    currentPage.value = newPage
  }

  return {
    currentPage,
    updateCurrentPage,
  }
}
