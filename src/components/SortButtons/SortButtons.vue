<template>
  <v-container>
    <v-skeleton-loader v-if="isLoading" type="actions" />
    <div v-else class="d-flex justify-end ga-2">
      <span class="align-self-center">Sort by:</span>
      <v-btn-toggle
        v-model="selectedSort"
        divided
        mandatory
        variant="outlined"
      >
        <v-btn
          :append-icon="getAppendIcon(SORT_OPTIONS.name)"
          aria-label="Sort by name ascending/descending"
          :value="SORT_OPTIONS.name"
          @click="emitSelectedSort"
        >
          Name
        </v-btn>

        <v-btn
          :append-icon="getAppendIcon(SORT_OPTIONS.date)"
          aria-label="Sort by date ascending/descending"
          :value="SORT_OPTIONS.date"
          @click="emitSelectedSort"
        >
          Date
        </v-btn>

      </v-btn-toggle>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import { useSortButtons } from './composables/useSortButtons'
  import { SORT_BUTTONS_EVENTS, SORT_OPTIONS } from './SortButtons.const'

  interface Props {
    isLoading: boolean
  }

  defineProps<Props>()

  const emit = defineEmits(Object.values(SORT_BUTTONS_EVENTS))

  const { selectedSort, getAppendIcon, emitSelectedSort } = useSortButtons(emit)
</script>

<script lang="ts">
  export default { name: 'SortButtons' }
</script>
