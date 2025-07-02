<template>
  <v-container>
    <h2>People Database</h2>
  </v-container>

  <SearchNameInput
    :is-loading="arePeopleEmpty"
    @name-searched="setSearchedName"
  />

  <SortButtons
    :is-loading="arePeopleEmpty"
    @sorted:date="sortPeopleByDate"
    @sorted:name="sortPeopleByName"
  />

  <TableWrapper
    :current-page="currentPage"
    :is-loading="arePeopleEmpty"
    :pages="itemsPages"
    @page-changed="updateCurrentPage"
  >
    <PeopleTable :current-page="currentPage" />
  </TableWrapper>
</template>

<script setup lang="ts">
  import PeopleTable from '../components/PeopleTable/PeopleTable.vue'
  import SearchNameInput from '../components/SearchNameInput/SearchNameInput.vue'
  import TableWrapper from '../components/TableWrapper/TableWrapper.vue'
  import { usePeoplePage } from './composables'

  const {
    arePeopleEmpty,
    currentPage,
    itemsPages,
    setSearchedName,
    sortPeopleByDate,
    sortPeopleByName,
    updateCurrentPage,
  } = usePeoplePage()
</script>
