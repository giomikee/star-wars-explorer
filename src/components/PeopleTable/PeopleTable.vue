<template>
  <v-table class="w-100">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Height</th>
        <th scope="col">Mass</th>
        <th scope="col">Hair Color</th>
        <th scope="col">Eye Color</th>
        <th scope="col">Birth Year</th>
        <th scope="col">Gender</th>
        <th scope="col">Date Added</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="people in paginatedPeople" :key="people.url">
        <td>{{ people.name }}</td>
        <td>{{ people.height }}</td>
        <td>{{ people.mass }}</td>
        <td>{{ people.hair_color }}</td>
        <td>{{ people.eye_color }}</td>
        <td>{{ people.birth_year }}</td>
        <td>{{ people.gender }}</td>
        <td>{{ formatDateTime(people.created) }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
  import type { People } from '../../interfaces'
  import { computed } from 'vue'
  import { usePeopleStore } from '../../stores/people.store'
  import { formatDateTime, getPaginatedItems } from '../../utils'

  interface Props {
    currentPage: number
  }

  const props = defineProps<Props>()
  const { getPeopleToDisplay } = usePeopleStore()

  const paginatedPeople = computed<People[]>(() => getPaginatedItems(getPeopleToDisplay(), props.currentPage))
</script>

<script lang="ts">
  export default { name: 'PeopleTable' }
</script>
