<template>
  <div>

    Date: <input type="text" v-model="form.date" class="form-input" /> <br>
    Time: <input type="text" v-model="form.time" class="form-input" /> <span v-if="errors.time"> {{ errors.time }} </span><br>
    Status: <input type="text" v-model="form.status" class="form-input" /> <br>
    <!-- Course ID: <input type="text" v-model="form.course_id" class="form-input" /> <span v-if="errors.course_id"> {{ errors.course_id }} </span><br>
    Lecturer ID: <input type="text" v-model="form.lecturer_id" class="form-input" /> <span v-if="errors.lecturer_id"> {{ errors.lecturer_id }} </span><br> -->
    Course ID:
    <b-form-select class="form-input" v-model="form.course_id" required>
      <b-form-select-option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }}</b-form-select-option>
    </b-form-select>
    Lecturer ID:
    <b-form-select class="form-input" v-model="form.lecturer_id" required>
      <b-form-select-option v-for="lecturer in lecturers" :key="lecturer.id" :value="lecturer.id">{{ lecturer.name }}</b-form-select-option>
    </b-form-select>
    <b-button variant="primary" class="margin" @click="createEnrolment()">Submit</b-button>
    <!-- b-form-selects that display dropdown lists of courses and lecturers meaning users dont need to input an ID -->
    <!-- Works by running the getCourses and getLecturers methods that pull all of that information into that page to be used when called -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentCreate',
  components: {
  },
  data() {
    return {
      form: {
        date: "",
        time: "",
        status: "",
        course_id: null,                                              //Form data that is expected by the form
        lecturer_id: null,
      },
      courses: [],
      lecturers: [],                                                //courses and lecturers arrays that are required to display their data in the select forms
      errors: {}
    }
  },
  mounted(){
    this.getCourses();
    this.getLecturers();                                        //These methods are mounted as we want that information constantly available
  },
  methods: {

    getLecturers() {
      let token = localStorage.getItem('token');

      axios.get('https://college-vue-conor.herokuapp.com/api/lecturers', {
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

    getCourses() {
      let token = localStorage.getItem('token');

      axios.get('https://college-vue-conor.herokuapp.com/api/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
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

    createEnrolment() {
      let token = localStorage.getItem('token');


      axios.post('https://college-vue-conor.herokuapp.com/api/enrolments', {
        date: this.form.date,
        time: this.form.time,
        status: this.form.status,
        course_id: this.form.course_id,
        lecturer_id: this.form.lecturer_id,
      },
      {
        headers: { Authorization: "Bearer " + token}                            //Like courses, runs the POST HTTP request that pushes the inputted information
      })                                                                        //to the DB and redirects the user back to the index page
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'enrolments_index' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      })
    },

  },
}
</script>
<style>
.home {
  text-align: center;
}
.margin{
  margin-top:20px;
  margin-bottom: 20px;
}
.form-input{
  color:black;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: transparent;
  border:1px solid #CC6666;
  padding: 13px;
  margin-bottom: 15px;
  width:100%;
  box-sizing: border-box;
  outline:0;
}

</style>
