<template>
  <div>
    <b-card>
    <h4>Email:</h4><input type="email" v-model="form.email" class="form-input" />
    <h4>Password:</h4><input type="password" v-model="form.password" class="form-input" />
    <b-button class="float" variant="outline-primary" @click="login()">Login</b-button>
  </b-card>
  <!-- Inputs for user login, v-model indicates that the inputs are looking for the form data email and password -->
  <h4 class="home margin">Hello! Welcome to my College-Vue Application. </h4>
    <h5 class="home">Use the following information to access the various pages</h5>
    <h6 class="home">Username: sam@bloggs.com</h6>
    <h6 class="home">Password: secret</h6>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomeLogin',          //Router page name
  components: {
  },
  data(){
    return{
      form: {
        email: "",            //Form data for the input tags
        password: ""
      }
    }
  },
  methods: {
    login() {
      axios.post('https://college-vue-conor.herokuapp.com/api/login', {
        email: this.form.email,                                                 //Using Axios, posts the inputted data to the
        password: this.form.password                                            //API and generates a login token
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.replace({ name: '/courses' });                             //$router.replace tells the app to redirect to
      })                                                                        //courses index page once login finishes
      .catch(error => {
        console.log(error)                                                      //logs errors if there are problems with login
        console.log(error.response.data)
      })
    }
  },
}
</script>

<style>
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
  transition: all 0.3s;
  padding: 8px;
  margin-bottom: 10px;
  width:100%;
  box-sizing: border-box;
  outline:0;
}
</style>
