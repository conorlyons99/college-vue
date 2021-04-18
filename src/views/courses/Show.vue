<template>
  <div class="container-fluid">


        <b-card style="max-width: 80rem;" class="mb-2 home">
          <b-card-text>
          <h5>Title:</h5> {{ course.title }}  <br>
            <h5>Code:</h5> {{ course.code }} <br>
            <h5>Points:</h5> {{ course.points }} <br>
          <h5>Level:</h5> {{ course.level }} <br>
          </b-card-text>
        </b-card>

        <b-card style="max-width: 80rem;" class="mb-2 home">
          <b-card-text>
            <h5>Description:</h5> {{ course.description }} <br>
          </b-card-text>

        </b-card>
        <div class="text-center margin">
          <b-button v-b-modal.modal-1 variant="danger" class="float">Delete Course</b-button>
          <b-modal header-bg-variant="danger" id="modal-1" title="Delete Course?" @ok="deleteCourse()" ok-title="Delete" ok-variant="danger" cancel-variant="warning" centered>
            <p class="my-4">Warning! Deleting this course will also cause any enrolments attached to be deleted, continue?</p>
            <b class="my-4">Note: Action may be required twice for course to be deleted</b>
          </b-modal>
        </div>


  <b-table striped hover :items="course.enrolments">
    <!-- <template #cell(title)="data">
      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
    </template> -->
  </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseShow',
  components: {
  },
  data() {
    return {
      course: {}
    }
  },
  mounted(){

    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
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
    deleteCourse(){
      let token = localStorage.getItem("token");
      let id = this.$route.params.id;

      this.course.enrolments.forEach((enrolment) => {
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
      .delete(`http://college.api:8000/api/courses/${id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          this.$router.replace({ name: "courses_index" });
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
