<template>
<div>
  <b-card>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group id="input-group-1" label="Course title:" label-for="input-1">
      <b-form-input id="input-1" v-model="course.title" type="text" placeholder="Enter title" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Course code:" label-for="input-2">
      <b-form-input id="input-2" v-model="course.code" type="text" placeholder="Enter code" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-3" label="Course Points:" label-for="input-3">
      <b-form-input id="input-3" v-model="course.points" type="text" placeholder="Enter Points" required></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-4" label="Course Description:" label-for="input-4">
      <b-form-textarea rows="3" max-rows="6" id="input-1" v-model="course.description" type="text" placeholder="Enter Description" required></b-form-textarea>
    </b-form-group>

    <b-form-group id="input-group-5" label="Course Level:" label-for="input-5">
      <b-form-input id="input-1" v-model="course.level" type="text" placeholder="Enter Level" required></b-form-input>
    </b-form-group>


    <b-button type="submit" variant="primary">Update Course</b-button>
    <b-button variant="warning" class="float-left" @click="cancel()">Cancel</b-button>
  </b-form>
</b-card>

</div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      course: {
        title: '',

      },

      show: true
    }
  },
  created() {
    this.getCourse();
  },
  methods: {
    cancel(){
      this.$router.replace({ name: 'courses_index' });
    },
    getCourse() {
      let token = localStorage.getItem('token');
      let id = this.$route.params.id;

      axios.get('https://college-vue-conor.herokuapp.com/api/courses/' + id, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.course = response.data.data;

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
      axios.put('https://college-vue-conor.herokuapp.com/api/courses/' + id, {
          title: this.course.title,
          code: this.course.code,
          description: this.course.description,
          points: this.course.points,
          level: this.course.level,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: 'courses_index'
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
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
