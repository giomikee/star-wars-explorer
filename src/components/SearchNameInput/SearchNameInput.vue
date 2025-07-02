<template>
  <v-container>
    <v-skeleton-loader v-if="isLoading" type="text" />
    <v-text-field
      v-else
      v-model="searchedName"
      aria-label="Search name input"
      clearable
      label="Search name"
      persistent-clear
      @click:clear="clearSearchedName"
      @keydown.enter="$emit(SEARCH_NAME_INPUT_EVENTS.nameSearched, searchedName)"
    >
      <template #append>
        <v-btn
          aria-label="Search name"
          class="h-100"
          :disabled="searchedName.length === 0"
          prepend-icon="mdi-text-search"
          @click="$emit(SEARCH_NAME_INPUT_EVENTS.nameSearched, searchedName)"
        >
          Search
        </v-btn>
      </template>
    </v-text-field>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { SEARCH_NAME_INPUT_EVENTS } from './SearchNameInput.const'

  interface Props {
    isLoading: boolean
  }

  defineProps<Props>()

  const emit = defineEmits(Object.values(SEARCH_NAME_INPUT_EVENTS))

  const searchedName = ref<string>('')

  const clearSearchedName = () => {
    searchedName.value = ''

    emit(SEARCH_NAME_INPUT_EVENTS.nameSearched, '')
  }
</script>

<script lang="ts">
  export default { name: 'SearchNameInput' }
</script>
