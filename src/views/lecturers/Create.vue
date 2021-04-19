<template>
  <div>

    Name: <input type="text" v-model="form.name" class="form-input" /> <br>
    Address: <input type="text" v-model="form.address" class="form-input" /> <span v-if="errors.address"> {{ errors.address }} </span><br>
    Email: <input type="text" v-model="form.email" class="form-input" /> <br>
    Phone: <input type="text" v-model="form.phone" class="form-input" /> <span v-if="errors.phone"> {{ errors.phone }} </span><br>

    <b-button variant="primary" class="margin" @click="createLecturer()">Submit</b-button>


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


      axios.post('https://college-vue-conor.herokuapp.com/api/lecturers', {
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
/* input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
} */
</style>
