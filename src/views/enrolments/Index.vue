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
        'course_id',                      //Table fields that show in the index bootstrap table, includes sortable buttons
        'lecturer_id',
        'Actions',
        ],
      enrolments: []
    }
  },
  mounted(){
    this.getEnrolments();  //As its the index page we always want the full enrolments table showing
  },
  methods: {
    getEnrolments() {
      let token = localStorage.getItem('token');

      axios.get('https://college-vue-conor.herokuapp.com/api/enrolments', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.enrolments = response.data.data;

      })                                                                    //getCourses function that gets called in the mounted
      .catch(error => {                                                     //Uses HTTP GET request to return the entire courses array
        console.log(error)
        console.log(error.response.data)
      })
    },

    logout() {
      let token = localStorage.getItem('token');

      axios.get('https://college-vue-conor.herokuapp.com/api/logout', {
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
      localStorage.removeItem('token');     //removes login token so user can not view tables of courses,lecturers,enrolments
    }
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
