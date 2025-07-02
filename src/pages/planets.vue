<template>
  <v-container>
    <h2>Planets Database</h2>
  </v-container>

  <SearchNameInput
    :is-loading="arePlanetsEmpty"
    @name-searched="setSearchedName"
  />

  <SortButtons
    :is-loading="arePlanetsEmpty"
    @sorted:date="sortPlanetsByDate"
    @sorted:name="sortPlanetsByName"
  />

  <TableWrapper
    :current-page="currentPage"
    :is-loading="arePlanetsEmpty"
    :pages="itemsPages"
    @page-changed="updateCurrentPage"
  >
    <PlanetsTable :current-page="currentPage" />
  </TableWrapper>
</template>

<script setup lang="ts">
  import PlanetsTable from '../components/PlanetsTable/PlanetsTable.vue'
  import SearchNameInput from '../components/SearchNameInput/SearchNameInput.vue'
  import TableWrapper from '../components/TableWrapper/TableWrapper.vue'
  import { usePlanetsPage } from './composables'

  const {
    arePlanetsEmpty,
    currentPage,
    itemsPages,
    setSearchedName,
    sortPlanetsByDate,
    sortPlanetsByName,
    updateCurrentPage,
  } = usePlanetsPage()
</script>
