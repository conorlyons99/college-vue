<template>
<div>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group id="input-group-1" label="Lecturer Name:" label-for="input-1">
      <b-form-input id="input-1" v-model="lecturer.name" type="text" placeholder="Enter Name" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Lecturer Address:" label-for="input-1">
      <b-form-input id="input-1" v-model="lecturer.address" type="text" placeholder="Enter Address" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Lecturer Email:" label-for="input-1">
      <b-form-input id="input-1" v-model="lecturer.email" type="text" placeholder="Enter Email" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Lecturer Phone:" label-for="input-1">
      <b-form-input id="input-1" v-model="lecturer.phone" type="text" placeholder="Enter Phone" required></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Update Lecturer</b-button>
    <b-button variant="warning" class="float-left" @click="cancel()">Cancel</b-button>
  </b-form>

</div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      lecturer: {
        name: '',

      },

      show: true
    }
  },
  created() {
    this.getLecturer();
  },
  methods: {
    cancel(){
      this.$router.replace({ name: 'lecturers_index' });
    },
    getLecturer() {
      let token = localStorage.getItem('token');
      let id = this.$route.params.id;

      axios.get('https://college-vue-conor.herokuapp.com/api/lecturers/' + id, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.lecturer = response.data.data;

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
      axios.put('https://college-vue-conor.herokuapp.com/api/lecturers/' + id, {
          name: this.lecturer.name,
          address: this.lecturer.address,
          email: this.lecturer.email,
          phone: this.lecturer.phone,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: 'lecturers_index'
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
    }
  }
}
</script>
