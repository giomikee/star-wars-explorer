<template>
  <v-container class="d-flex justify-center">
    <div class="d-flex flex-md-row flex-column ga-2">
      <v-btn
        aria-label="Search for planets"
        prepend-icon="mdi-earth"
        size="large"
        @click="navigate(PAGES.planets)"
      >
        Search for planets
      </v-btn>
      <v-btn
        aria-label="Search for people"
        prepend-icon="mdi-account-multiple"
        size="large"
        @click="navigate(PAGES.people)"
      >
        Search for people
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { PAGES } from '../../constants'
  import { useNavigation } from './composables/useNavigation'

  const { navigate } = useNavigation()
</script>

<script lang="ts">
  export default { name: 'Navigation' }
</script>
