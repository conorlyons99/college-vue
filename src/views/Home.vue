<template>
  <div class="home">
    Welcome to the College-Vue App

    <br>


  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
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
      axios.post('https://college-vue-conor.herokuapp.com/api/login', {
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
.home{
  text-align: center;
}
</style>
