<template>
  <div>
    This is the Courses Index page

    <br>
    <router-link :to="{ name: 'courses_create'}">Create</router-link>

    <b-button variant="danger" class="float-right" @click="logout()">Logout</b-button>

    <br><br>

    <b-table striped hover :items="courses" :fields="fields">
      <template #cell(title)="data">
        <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
      </template>
    </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseIndex',
  components: {
  },
  data() {
    return {
      fields: [
        {
          key: 'title',
          sortable: true,
        },
        'code',
        'points',
        {
          key: 'level',
          sortable: true,
        }
        ],
      courses: []
    }
  },
  mounted(){
    this.getCourses();
  },
  methods: {
    getCourses() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/courses', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.courses = response.data.data;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },

    logout() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/logout', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        console.log("LOGGED OUT");
        this.$router.replace({ name: 'home' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
      localStorage.removeItem('token');
    }
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
