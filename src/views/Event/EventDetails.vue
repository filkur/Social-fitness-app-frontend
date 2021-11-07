<template>
  <div>
    <navbar></navbar>
    <div class="container" style="margin-top: 25px;">
      <div class="container  rounded mb-5 p-4">
        <div class="row d-flex justify-content-center mb-4">
          <h2>Results</h2>
        </div>
        <div v-for="(member, index) in event.eventMembers" v-bind:key="member.id" class="container border bg-light rounded mt-5" style="max-width: 700px;">
          <div class="d-flex justify-content-around">
            <div class="p-2">Place: {{index+1}}</div>
            <div class="p-2">Nickname: {{member.user.nickname}}</div>
            <div class="p-2">Total Score: {{member.totalScore}}</div>
          </div>
          <table class="table table-striped">
            <thead >
            <tr>
              <td>Name:</td>
              <td>Seconds or rips:</td>
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
import Nav from '../../components/Group/Nav'
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
      eventMember: undefined
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
    }
  }
}
</script>

<style scoped>

</style>