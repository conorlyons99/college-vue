<template>
  <div>
    This is the Lecturers Index page

    <br>
    <router-link :to="{ name: 'lecturers_create'}">Create</router-link>

    <b-button variant="danger" class="float-right" @click="logout()">Logout</b-button>

    <br><br>

    <b-table striped hover :items="lecturers" :fields="fields">
      <template #cell(name)="data">
        <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}">{{ data.item.name }}</router-link>
      </template>
    </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LecturerIndex',
  components: {
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          sortable: true,
        },
        'address',
        'email',
        'phone',
        ],
      lecturers: []
    }
  },
  mounted(){
    this.getLecturers();
  },
  methods: {
    getLecturers() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/lecturers', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.lecturers = response.data.data;

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
