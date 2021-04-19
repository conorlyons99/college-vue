<template>
  <div>
    Title: <input type="text" v-model="form.title" class="form-input" /> <br>
    Code: <input type="text" v-model="form.code" class="form-input" /> <span v-if="errors.code"> {{ errors.code }} </span><br>
    Description: <input type="text" v-model="form.description" class="form-input" /> <br>
    Points: <input type="text" v-model="form.points" class="form-input" /> <span v-if="errors.points"> {{ errors.points }} </span><br>
    Level: <input type="text" v-model="form.level" class="form-input" /> <span v-if="errors.level"> {{ errors.level }} </span><br>
    <b-button variant="primary" class="margin" @click="createCourse()">Submit</b-button>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseCreate',
  components: {
  },
  data() {
    return {
      form: {
        title: "",
        code: "",
        description: "",
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
        description: this.form.description,
        points: this.form.points,
        level: this.form.level,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'courses_index' });
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
