<template>
  <div class="dashboard">
    Welcome to your dashboard

    <br>
    <a href='courses_index'>Show Courses </a>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Dashboard',
  components: {
  },
  data(){
  },
  methods: {
    showCourses() {
      axios.post('http://college.api:8000/api/courses')
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.replace({ name: 'courses_index' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    }
  },
}
</script>

<style>
 .dashboard{
   text-align: center;
 }
</style>
