<template>
  <div class="container-fluid">


        <b-card style="max-width: 80rem;" class="mb-2 home">
          <b-card-text>
          <h5>Date:</h5> {{ enrolment.date }}  <br>
            <h5>Time:</h5> {{ enrolment.time }} <br>
            <h5>Status:</h5> {{ enrolment.status }} <br>
          <h5>Course:</h5> {{ enrolment.course.title }} <br>
          <h5>Lecturer:</h5> {{ enrolment.lecturer.name }} <br>
          </b-card-text>
        </b-card>

        <div class="text-center margin">
          <b-button v-b-modal.modal-1 variant="danger" class="float">Delete Enrolment</b-button>
          <b-modal header-bg-variant="danger" id="modal-1" title="Delete Enrolment?" @ok="deleteEnrolment()" ok-title="Delete" ok-variant="danger" cancel-variant="warning" centered>
            <h5>Are you sure you wish to delete?</h5>
          </b-modal>
        </div>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentShow',
  components: {
  },
  data() {
    return {
      enrolment: {}
    }
  },
  mounted(){

    let token = localStorage.getItem('token');

    axios.get(`https://college-vue-conor.herokuapp.com/api/enrolments/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data);
      this.enrolment = response.data.data;

    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
    })
  },
  methods: {
    deleteEnrolment(){
      let token = localStorage.getItem("token");
      let id = this.$route.params.id;

      axios
      .delete(`https://college-vue-conor.herokuapp.com/api/enrolments/${id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          this.$router.replace({ name: "enrolments_index" });
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
.margin{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
