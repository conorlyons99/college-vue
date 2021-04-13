<template>
  <div>
    Email:<input type="email" v-model="form.email" />
    Password:<input type="password" v-model="form.password" />
    <b-button class="float-right" variant="outline-primary" @click="login()">Submit</b-button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomeLogin',
  components: {
  },
  data(){
    return{
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      axios.post('http://college.api:8000/api/login', {
        email: this.form.email,
        password: this.form.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.replace({ name: 'courses_index' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    }
  },
}
</script>

<style>
</style>
