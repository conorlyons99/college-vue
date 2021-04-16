<template>
  <div>

    <b-card style="max-width: 80rem;" class="mb-2 home">
      <b-card-text>
      <h5>Title:</h5> {{ lecturer.name }}  <br>
        <h5>Code:</h5> {{ lecturer.address }} <br>
        <h5>Description:</h5> {{ lecturer.email }} <br>
        <h5>Points:</h5> {{ lecturer.phone }} <br>
      </b-card-text>
      <b-button variant="danger" class="float-right" @click="deleteLecturer()">Delete</b-button>
    </b-card>


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
      this.lecturer = response.data.data;

    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
    })
  },
  methods: {
    deleteLecturer(){
      let token = localStorage.getItem("token");
      let id = this.$route.params.id;

      this.lecturer.enrolments.forEach((enrolment) => {
        console.log(enrolment.id);
        axios
        .delete("http://college.api:8000/api/enrolments/" + enrolment.id, {
            headers: { Authorization: "Bearer " + token },
          })
          .catch(function (error) {
            console.log(error);
          });
      });

      axios
      .delete(`http://college.api:8000/api/lecturers/${id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          this.$router.replace({ name: "lecturers_index" });
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
        });

    }
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
