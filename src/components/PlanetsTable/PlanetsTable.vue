<template>
  <v-table class="w-100">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Rotation Period</th>
        <th scope="col">Orbital Period</th>
        <th scope="col">Diameter</th>
        <th scope="col">Climate</th>
        <th scope="col">Gravity</th>
        <th scope="col">Terrain</th>
        <th scope="col">Surface water</th>
        <th scope="col">Population</th>
        <th scope="col">Date Added</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="planet in paginatedPlanets" :key="planet.url">
        <td>{{ planet.name }}</td>
        <td>{{ planet.rotation_period }}</td>
        <td> {{ planet.orbital_period }}</td>
        <td>{{ planet.diameter }}</td>
        <td>{{ planet.climate }}</td>
        <td>{{ planet.gravity }}</td>
        <td>{{ planet.terrain }}</td>
        <td>{{ planet.surface_water }}</td>
        <td>{{ planet.population }}</td>
        <td>{{ formatDateTime(planet.created) }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
  import type { Planet } from '../../interfaces'
  import { computed } from 'vue'
  import { usePlanetsStore } from '../../stores/planets.store'
  import { formatDateTime, getPaginatedItems } from '../../utils'

  interface Props {
    currentPage: number
  }

  const props = defineProps<Props>()
  const { getPlanetsToDisplay } = usePlanetsStore()

  const paginatedPlanets = computed<Planet[]>(() => getPaginatedItems(getPlanetsToDisplay(), props.currentPage))
</script>

<script lang="ts">
  export default { name: 'PlanetTable' }
</script>
