<template>
  <div>
    <NavBar />
    <b-container>
      <vue-page-transition name="zoom">
        <router-view/>
      </vue-page-transition>
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
