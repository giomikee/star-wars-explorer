<template>
  <v-main>
    <TitleComponent />
    <Navigation />
    <router-view />
  </v-main>

</template>

<script lang="ts" setup>
  import Navigation from '../components/Navigation/Navigation.vue'
  import TitleComponent from '../components/TitleComponent/TitleComponent.vue'
</script>
