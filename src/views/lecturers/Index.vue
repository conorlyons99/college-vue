<template>
  <div>
    <h2>Lecturers Index page</h2>

    <br>
    <h6><router-link :to="{ name: 'lecturers_create'}">Create a Lecturer</router-link></h6>
    <br>
    <div class="search">
      <input class="searchTerm" type="text" placeholder="Search.." v-model="term" />
    </div>

    <b-button variant="danger" class="float-right" @click="logout()">Logout</b-button>

    <br><br>

    <b-table hover :items="filterLecturers" :fields="fields">
      <template #cell(name)="data">
        <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}">{{ data.item.name }}</router-link>
      </template>
      <template #cell(actions)="data">
        <router-link :to="{ name: 'lecturers_edit', params: { id: data.item.id }}">Edit</router-link>
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
        'Actions',
        ],
      lecturers: [],
      term: "",
      filterLecturers: [],
    }
  },
  watch: {
    term: function(newTerm, oldTerm) {
      console.log('New: ', newTerm)
      console.log('Old: ', oldTerm)
      this.searchLecturer();
    }
  },
  mounted(){
    this.getLecturers();
  },
  methods: {

    searchLecturer() {
      this.filterLecturers = this.lecturers.filter(lecturer => {
        if (lecturer.name.toLowerCase().includes(this.term.toLowerCase())) {
          return true
        }

        if (lecturer.email.toLowerCase().includes(this.term.toLowerCase())) {
          return true
        }
      });
    },

    getLecturers() {
      let token = localStorage.getItem('token');

      axios.get('https://college-vue-conor.herokuapp.com/api/lecturers', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.lecturers = response.data.data;
        this.filterLecturers = response.data.data;
      })
      .catch(error => {
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
