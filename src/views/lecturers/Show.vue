<template>
  <div>


  <h4>Name: </h4> {{ lecturer.name }} <br>
  <h4>Address: </h4> {{ lecturer.address }}<br>
  <h4>Email: </h4> {{ lecturer.email }}<br>
  <h4>Phone: </h4> {{ lecturer.phone }}<br>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LecturerShow',
  components: {
  },
  data() {
    return {
      lecturer: {}
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/lecturers/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
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
  methods: {
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
