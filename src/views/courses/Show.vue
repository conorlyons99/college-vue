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
<!-- Bootstrap card that displays information about the course, pulled from DB -->
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
<!-- Delete modal that pops up when delete button is pressed, Ok button renamed to delete then runs deleteCourse method when pressed -->

  <b-table striped hover :items="course.enrolments">
    <!-- <template #cell(title)="data">
      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
    </template> -->
  </b-table>
<!-- Boostrap table that shows all enrolments associated with that particular course -->
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

    axios.get(`https://college-vue-conor.herokuapp.com/api/courses/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })                                                                          //Inside mounted, we always want the app to display
    .then(response => {                                                         //the course with the corresponding ID so we see the correct information
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
        .delete("https://college-vue-conor.herokuapp.com/api/enrolments/" + enrolment.id, {   //Delete course method runs a for loop that deletes each enrolment
            headers: { Authorization: "Bearer " + token },                                    //attached to the course before then running the DELETE HTTP request and removes the course from the DB
          })
          .catch(function (error) {
            console.log(error);
          });
      });

      axios
      .delete(`https://college-vue-conor.herokuapp.com/api/courses/${id}`, {
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
