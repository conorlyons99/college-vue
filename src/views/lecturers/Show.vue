<template>
  <div>

    <b-card style="max-width: 80rem;" class="mb-2 home">
      <b-card-text>
      <h5>Title:</h5> {{ lecturer.name }}  <br>
        <h5>Code:</h5> {{ lecturer.address }} <br>
        <h5>Description:</h5> {{ lecturer.email }} <br>
        <h5>Points:</h5> {{ lecturer.phone }} <br>
      </b-card-text>
    </b-card>

    <div class="text-center margin">
      <b-button v-b-modal.modal-1 variant="danger" class="float">Delete Lecturer</b-button>
      <b-modal header-bg-variant="danger" id="modal-1" title="Delete Lecturer?" @ok="deleteLecturer()" ok-title="Delete" ok-variant="danger" cancel-variant="warning" centered>
        <h5>Are you sure you wish to delete?</h5>
      </b-modal>
    </div>

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
