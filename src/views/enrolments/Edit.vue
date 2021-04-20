<template>
<div>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group id="input-group-1" label="Date:" label-for="input-1">
      <b-form-input id="input-1" v-model="enrolment.date" type="text" placeholder="Enter Date" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Time:" label-for="input-2">
      <b-form-input id="input-2" v-model="enrolment.time" type="text" placeholder="Enter Time" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-3" label="Status:" label-for="input-3">
      <b-form-input id="input-3" v-model="enrolment.status" type="text" placeholder="Enter Status" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-4" label="Course ID:" label-for="input-4">
      <b-form-input id="input-4" v-model="enrolment.course_id" type="text" placeholder="Enter Course ID" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-5" label="Lecturer ID:" label-for="input-5">
      <b-form-input id="input-5" v-model="enrolment.lecturer_id" type="text" placeholder="Enter Lecturer ID" required></b-form-input>
    </b-form-group>


    <b-button type="submit" variant="primary">Update Enrolment</b-button>
    <b-button variant="warning" class="float-left" @click="cancel()">Cancel</b-button>
  </b-form>
<!-- Edit form within a bootstrap card, v-model contains information already known and fills the inputs with that information -->
</div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      enrolment: {
        date: '',

      },

      show: true
    }
  },

  created() {
    this.getEnrolment();   //Created function which will always pull the enrolment that has the attached ID

  },
  methods: {

    cancel(){
      this.$router.replace({ name: 'enrolments_index' });
    },
    getEnrolment() {
      let token = localStorage.getItem('token');
      let id = this.$route.params.id;

      axios.get('https://college-vue-conor.herokuapp.com/api/enrolments/' + id, { //Method to pull the enrolment with the respective ID
          headers: {                                                              //Uses HTTP GET request to pull the data from the DB
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.enrolment = response.data.data;

        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    onSubmit(event) {
      let id = this.$route.params.id;
      let token = localStorage.getItem('token');
      event.preventDefault()                                                    //preventDefault stops a new course being created on top of the course being edited
      axios.put('https://college-vue-conor.herokuapp.com/api/enrolments/' + id, {//On submit function that will send a HTTP Put
          date: this.enrolment.date,                                              //request to overwrite the enrolment with the new info submitted
          time: this.enrolment.time,
          status: this.enrolment.status,
          course_id: this.enrolment.course_id,
          lecturer_id: this.enrolment.lecturer_id,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: 'enrolments_index'
          });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    },
    onReset(event) {
      event.preventDefault()
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  }
}
</script>
