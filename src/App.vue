<template>
  <div>
    <NavBar />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
</style>
