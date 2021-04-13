<template>
  <div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <!-- <router-link to="/">Home</router-link> -->
      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item :to="{name: 'courses_index'}">Courses</b-nav-item>
      <b-nav-item :to="{name: 'lecturers_index'}">Lecturers</b-nav-item>
      <b-nav-item :to="{name: 'enrolments_index'}">Enrolments</b-nav-item>
      <b-nav-item :to="{name: 'homeLogin'}">Login</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</div>
</template>
<style>
.navbar {
  margin-bottom: 40px;
}
</style>
