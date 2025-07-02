<template>
  <v-container>
    <v-skeleton-loader :loading="isLoading" type="table">
      <slot />
      <v-pagination v-model="tableCurrentPage" class="w-100" :length="pages" />
    </v-skeleton-loader>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref, toRef, watch } from 'vue'
  import { TABLE_WRAPPER_EVENTS } from './TableWrapper.const'

  interface Props {
    currentPage: number
    isLoading: boolean
    pages: number
  }

  const props = defineProps<Props>()

  const emit = defineEmits(Object.values(TABLE_WRAPPER_EVENTS))

  const tableCurrentPage = ref<number>(props.currentPage)
  const currentPageProp = toRef(props, 'currentPage')

  watch(currentPageProp, () => {
    tableCurrentPage.value = currentPageProp.value
  })

  watch(tableCurrentPage, () => {
    emit(TABLE_WRAPPER_EVENTS.pageChanged, tableCurrentPage.value)
  })

</script>

<script lang="ts">
  export default { name: 'TableWrapper' }
</script>
