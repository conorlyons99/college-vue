<template>
  <div>
    Title: <input type="text" v-model="form.title" class="form-input" /> <br>
    Code: <input type="text" v-model="form.code" class="form-input" /> <span v-if="errors.code"> {{ errors.code }} </span><br>
    Description: <input type="text" v-model="form.description" class="form-input" /> <br>
    Points: <input type="text" v-model="form.points" class="form-input" /> <span v-if="errors.points"> {{ errors.points }} </span><br>
    Level: <input type="text" v-model="form.level" class="form-input" /> <span v-if="errors.level"> {{ errors.level }} </span><br>
    <b-button variant="primary" class="margin" @click="createCourse()">Submit</b-button>
    <!-- Create course form, like login, expects form data which is found in the data() of this page -->

  </div>
</template>

<script>
import axios from 'axios';    //Import axios for HTTP requests

export default {
  name: 'CourseCreate',
  components: {
  },
  data() {
    return {
      form: {
        title: "",
        code: "",
        description: "",      //Form labels that will take the new Course information
        points: "",
        level: "",
      },
      courses: [],
      errors: {},
    }
  },
  mounted(){
  },
  methods: {

    createCourse() {
      let token = localStorage.getItem('token');


      axios.post('https://college-vue-conor.herokuapp.com/api/courses', {
        title: this.form.title,
        code: this.form.code,
        description: this.form.description,                                     //POST HTTP Request that posts the newly
        points: this.form.points,                                               //inputted info to the DB
        level: this.form.level,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'courses_index' });                           //Redirect after submit button is pressed
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
        if (error.response.data.errors) {                                       //log errors to console
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
.margin{
  margin-top:20px;
  margin-bottom: 20px;
}
.form-input{
  color:black;
  font-family: Helvetica, Arial, sans-serif;
  font-weight:500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: transparent;
  border:1px solid #CC6666;
  transition: all 0.3s;
  padding: 13px;
  margin-bottom: 15px;
  width:100%;
  box-sizing: border-box;
  outline:0;
}
                                                                                
.form-input:focus { border:2px solid #CC4945 }
</style>
