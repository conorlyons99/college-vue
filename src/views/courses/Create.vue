<template>
  <div>

    title: <input type="text" v-model="form.title" /> <br>
    code: <input type="text" v-model="form.code" /> <span v-if="errors.code"> {{ errors.code }} </span><br>
    description: <input type="text" v-model="form.description" /> <br>
    points: <input type="text" v-model="form.points" /> <span v-if="errors.points"> {{ errors.points }} </span><br>
    level: <input type="text" v-model="form.level" /> <span v-if="errors.level"> {{ errors.level }} </span><br>

    <button @click="createCourse()">Submit</button>


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
      errors: {}
    }
  },
  mounted(){

  },
  methods: {
    createCourse() {
      let token = localStorage.getItem('token');


      axios.post('http://college.api:8000/api/courses', {
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
</style>
