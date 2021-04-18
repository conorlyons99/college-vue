<template>
  <div>
    <h2>Enrolments Index page</h2>
    <br>
    <h6><router-link :to="{ name: 'enrolments_create'}">Create an Enrolment</router-link></h6>
    <br>

    <b-button variant="danger" class="float-right" @click="logout()">Logout</b-button>

    <br><br>

    <b-table hover :items="enrolments" :fields="fields">
      <template #cell(date)="data">
        <router-link :to="{ name: 'enrolments_show', params: { id: data.item.id }}">{{ data.item.date }}</router-link>
      </template>
      <template #cell(actions)="data">
        <router-link :to="{ name: 'enrolments_edit', params: { id: data.item.id }}">Edit</router-link>
      </template>
    </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentIndex',
  components: {
  },
  data() {
    return {
      fields: [
        {
          key: 'date',
          sortable: true,
        },
        'time',
        'status',
        'course_id',
        'lecturer_id',
        'Actions',
        ],
      enrolments: []
    }
  },
  mounted(){
    this.getEnrolments();
  },
  methods: {
    getEnrolments() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/enrolments', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.enrolments = response.data.data;

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
