<template>
  <div>
    <navbar></navbar>
    <div class="container" style="margin-top: 25px;">
      <div class="container  rounded mb-5 p-4">
        <div class="row d-flex justify-content-center mb-4">
          <h2>Results</h2>
        </div>
        <div class="container mt-2" style="max-width: 700px;">
          <div>
            <b-button v-b-toggle.collapse-1 variant="secondary">Add new activity</b-button>
            <b-collapse id="collapse-1" class="mt-2">
              <b-card>
                <div class="form">
                  <div class="form-group">
                    <input v-model="newActivity.name" class="form-control" type="text" id="name" name="name" placeholder="name here" required>
                  </div>
                  <div class="form-group">
                    <input v-model="newActivity.value" class="form-control" type="text" id="value" name="value" placeholder="value here" required>
                  </div>
                  <div class="form-group">
                    <button @click="addActivity()" class="btn btn-success btn-block">add</button>
                  </div>
                </div>
              </b-card>
            </b-collapse>
          </div>
        </div>
        <div v-for="(member, index) in event.eventMembers" v-bind:key="member.id" class="container border bg-light rounded mt-3" style="max-width: 700px;">
          <div class="d-flex justify-content-around">
            <div class="p-2">Place: {{index+1}}</div>
            <div class="p-2">Nickname: {{member.user.nickname}}</div>
            <div class="p-2">Total Score: {{member.totalScore}}</div>
          </div>
          <table class="table table-striped">
            <thead >
            <tr v-if="event.eventType === 'REP'">
              <td>Name:</td>
              <td>Reps:</td>
              <td>Date:</td>
              <td></td>
            </tr>
            <tr v-else>
              <td>Name:</td>
              <td>Seconds:</td>
              <td>Date:</td>
              <td></td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="activity in member.activities" v-bind:key="activity.id">
              <td>{{activity.name}}</td>
              <td>{{activity.value}}</td>
              <td>{{activity.createdAt}}</td>
              <td v-if="loggedUserId === member.user.id">
                <button @click="removeActivity(activity.id)" class="btn btn-danger" type="submit">Remove activity</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar/Navbar'
import Nav from '../../components/Nav/Nav'
import axios from "axios";

export default {
  components: {
    Navbar,
    Nav
  },
  name: "EventDetails",
  data () {
    return {
      id: this.$route.params.id,
      token: localStorage.token,
      loggedUserId: localStorage.id,
      event:undefined,
      standing: [],
      newActivity: {
        eventId: this.$route.params.id,
        name: '',
        value: ''
      }
    }
  },
  mounted() {
    axios.get(
        'http://localhost:8000/api/event/'+this.id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        }
    )
    .then((resp)=>{
      this.event=resp.data
      this.standing = resp.data["eventMembers"]
      this.standing = this.standing.sort((a,b)=>{
      if (a.totalScore > b.totalScore)
      {
        return -1
      }
      if (a.totalScore < b.totalScore)
      {
        return 1

      }
      else
      {
        return;
      }
    });
      console.log(this.standing)

    })
  },
  methods: {
    activities(id){
      console.log(id)
    },
    removeActivity(id){
      axios.delete(
          'http://localhost:8000/api/activity/'+id,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
      .then((res) => {
        location.reload();
      })
    },
    addActivity(){
      this.newActivity.value = parseInt(this.newActivity.value)
      axios.post(
          'http://localhost:8000/api/activity',
          JSON.stringify(this.newActivity),
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
          .then((response) => {
            alert('Added new activity')
            location.reload();
          })
          .catch(function (error){
            if (error.response){
              alert(error.response.data["hydra:description"]);
            }
          })
    },
    compare(a,b){
      if (a < b)
        return -1
      if (a > b)
        return 1
      return 0
    }
  }
}
</script>

<style scoped>

</style>