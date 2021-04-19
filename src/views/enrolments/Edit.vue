<template>
<div>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group id="input-group-1" label="Date:" label-for="input-1">
      <b-form-input id="input-1" v-model="enrolment.date" type="text" placeholder="Enter Date" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Time:" label-for="input-1">
      <b-form-input id="input-1" v-model="enrolment.time" type="text" placeholder="Enter Time" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Status:" label-for="input-1">
      <b-form-input id="input-1" v-model="enrolment.status" type="text" placeholder="Enter Status" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Course ID:" label-for="input-1">
      <b-form-input id="input-1" v-model="enrolment.course_id" type="text" placeholder="Enter Course ID" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Lecturer ID:" label-for="input-1">
      <b-form-input id="input-1" v-model="enrolment.lecturer_id" type="text" placeholder="Enter Lecturer ID" required></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Update Enrolment</b-button>
    <b-button variant="warning" class="float-left" @click="cancel()">Cancel</b-button>
  </b-form>

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
    this.getEnrolment();
  },
  methods: {
    cancel(){
      this.$router.replace({ name: 'enrolments_index' });
    },
    getEnrolment() {
      let token = localStorage.getItem('token');
      let id = this.$route.params.id;

      axios.get('https://college-vue-conor.herokuapp.com/api/enrolments/' + id, {
          headers: {
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
      event.preventDefault()
      axios.put('https://college-vue-conor.herokuapp.com/api/enrolments/' + id, {
          date: this.enrolment.date,
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
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  }
}
</script>
