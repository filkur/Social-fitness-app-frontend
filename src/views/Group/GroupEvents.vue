<template>
<div>
  <navbar></navbar>
  <Nav></Nav>
  <div class="container" style="margin-top: 100px;">
    <div class="row d-flex justify-content-start mt-5">
      <h2>Group Events:</h2>
    </div>
    <div v-for="event in group.events" v-bind:key="event.id" class="container border bg-light rounded mt-5 mb-5 p-4">
      <div class="row">
        <div class="col">
          <article>
            <header class="d-flex justify-content-center">
              <h3>{{event.name}}</h3>
            </header>
            <hr>
            is Active:<h6>{{event.isActive}}</h6>
            Description:<h6> {{event.description}}</h6>
            Point goal:<h6>{{event.pointGoal}}</h6>
            Point Per Rep: <h6> {{event.pointPerRep}}</h6>
            Point Per Minute<h6>{{event.pointPerMinute}}</h6>
            <h6>Start Date: {{event.startDate}}</h6>
            <h6>End Date: {{event.endDate}}</h6>
          </article>
          <router-link v-bind:to="'/event/'+event.id" class="btn btn-block btn-info">Go to the event!</router-link>
        </div>
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
  name: "GroupEvents",
  data () {
    return {
      id: this.$route.params.id,
      token: localStorage.token,
      loggedUserId: localStorage.id,
      group:undefined,
    }
  },
  mounted() {
    axios.get(
        'http://localhost:8000/api/group/'+this.id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        }
    )
        .then((resp) => {
          this.group = resp.data;
        })
  },
  methods: {
    eventDetails(id){
      this.$router.push('eventDetails');
    }
  }
}
</script>

<style scoped>

</style>