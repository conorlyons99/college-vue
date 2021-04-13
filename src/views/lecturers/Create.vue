<template>
  <div>

    Name: <input type="text" v-model="form.name" /> <br>
    Address: <input type="text" v-model="form.address" /> <span v-if="errors.address"> {{ errors.address }} </span><br>
    Email: <input type="text" v-model="form.email" /> <br>
    Phone: <input type="text" v-model="form.phone" /> <span v-if="errors.phone"> {{ errors.phone }} </span><br>

    <button @click="createLecturer()">Submit</button>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LecturerCreate',
  components: {
  },
  data() {
    return {
      form: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      errors: {}
    }
  },
  mounted(){

  },
  methods: {
    createLecturer() {
      let token = localStorage.getItem('token');


      axios.post('http://college.api:8000/api/lecturers', {
        name: this.form.name,
        address: this.form.address,
        email: this.form.email,
        phone: this.form.phone,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'lecturers_index' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      })
    }
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
