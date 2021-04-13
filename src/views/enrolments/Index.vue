<template>
  <div>
    This is the Enrolments Index page

    <br>
    <router-link :to="{ name: 'enrolments_create'}">Create</router-link>

    <b-button variant="danger" class="float-right" @click="logout()">Logout</b-button>

    <br><br>

    <b-table striped hover :items="enrolments" :fields="fields">
      <template #cell(date)="data">
        <router-link :to="{ name: 'enrolments_show', params: { id: data.item.id }}">{{ data.item.date }}</router-link>
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
