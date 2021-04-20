<template>
<div>
  <h2>Courses Index page</h2>
  <br>
  <h6><router-link :to="{ name: 'courses_create'}">Create a Course</router-link></h6>
  <br>
<!-- Router link that sends the user to the courses_create page -->
  <div class="search">
    <input class="searchTerm" type="text" placeholder="Search.." v-model="term" />
  </div>
<!-- Search bar to filter out courses and display a course matching the users keylogs -->
  <b-button variant="danger" class="float-right" @click="logout()">Logout</b-button>

  <br><br>


  <!-- <b-card-group deck v-for="i in Math.ceil(courses.length/4)" :key="i">
        <b-card class="mb-2" v-bind:key="course.id" v-for="course in courses.slice((i-1)*4, (i-1)*4 +  4)">
          <b-card-text>
          {{course.title}}
            </b-card-text>
        </b-card>
      </b-card-group> -->
  <b-table hover :items="filterCourses" :fields="fields">
    <template #cell(title)="data">
      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
    </template>
    <template #cell(actions)="data">
      <router-link :to="{ name: 'courses_edit', params: { id: data.item.id }}">Edit</router-link>
    </template>
  </b-table>
<!-- Bootstrap table that displays all of the courses within the DB, Includes an Actions tab which links the user to the edit page for that respective course -->

</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseIndex',
  components: {},
  data() {

    return {
      fields: [{
          key: 'title',
          sortable: true,
        },
        'code',
        'points',                                             //Table fields that show in the index bootstrap table, includes sortable buttons
        {
          key: 'level',
          sortable: true,
        },
        "Actions"
      ],
      courses: [],
      term: "",                                                                 //courses and filterCourses arrays
      filterCourses: [],
    }
  },
  watch: {
    term: function(newTerm, oldTerm) {
      console.log('New: ', newTerm)
      console.log('Old: ', oldTerm)                                             //the watch component listens to the keylogs the user makes and run the searchCourse function
      this.searchCourse();
    }
  },

  mounted() {
    this.getCourses();                                                          //As its the index page we always want the full courses table showing
  },
  methods: {

    searchCourse() {
      this.filterCourses = this.courses.filter(course => {
        if (course.title.toLowerCase().includes(this.term.toLowerCase())) {
          return true                                                           //seatchCourse function uses ES6 filter to display the course that corresponds with the users keylogs
        }

        if (course.code.toLowerCase().includes(this.term.toLowerCase())) {
          return true
        }
      });
    },

    getCourses() {
      let token = localStorage.getItem('token');

      axios.get('https://college-vue-conor.herokuapp.com/api/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
        })                                                                      //getCourses function that gets called in the mounted
        .then(response => {                                                     //Uses HTTP GET request to return the entire courses array
          console.log(response.data);
          this.courses = response.data.data;
          this.filterCourses = response.data.data;                              //filterCourses array, displays courses that match user input
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },

    logout() {
      let token = localStorage.getItem('token');

      axios.get('https://college-vue-conor.herokuapp.com/api/logout', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          console.log("LOGGED OUT");                                            //logout method, returns the user to the homepage
          this.$router.replace({
            name: 'home'
          });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
      localStorage.removeItem('token');                                         //removes login token so user can not view tables of courses,lecturers,enrolments
    }
  },
}
</script>
<style>
.home {
  text-align: center;
}
.search {
  width: 100%;
  position: relative;
  display: flex;
}
                                                                                /* styling */
.searchTerm {
  width: 50%;
  border: 1px solid #00B4CC;
  padding: 5px;
  height: 30px;
  border-radius: 5px 5px 5px 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: #000000;
}


</style>
