<template>
  <div>
    <navbar></navbar>
    <Nav></Nav>
    <div class="container" style="margin-top: 100px;">
      <div class="row d-flex justify-content-start mt-5">
        <h2>Group Events:</h2>
      </div>
      <div>
        <b-button v-b-modal.modal-1>Add new event</b-button>

        <b-modal
            id="modal-1"
            title="New Event:"
            @ok="createEvent()"
        >
          <div class="form">
            <div class="form-group">
              <input v-model="newEvent.name" class="form-control" type="text" id="name" name="name" placeholder="name"
                     required>
            </div>
            <div class="form-group">
              <input v-model="newEvent.description" class="form-control" type="text" id="description" name="description"
                     placeholder="description here" required>
            </div>
            <div class="form-group">
              <input v-model="newEvent.pointGoal" class="form-control" type="number" min="0" id="pointGoal"
                     name="pointGoal" placeholder="pointGoal" required>
            </div>
            <div class="form-group">
              <input v-model="newEvent.pointPerRep" class="form-control" type="number" min="0" id="pointPerRep"
                     name="pointPerRep" placeholder="pointPerRep" required>
            </div>
            <div class="form-group">
              <input v-model="newEvent.pointPerMinute" class="form-control" type="number" min="0" id="pointPerMinute"
                     name="pointPerMinute" placeholder="pointPerMinute" required>
            </div>
            <div class="form-group">
              <input v-model="newEvent.startDate" class="form-control" type="date" id="startDate" name="startDate"
                     placeholder="startDate" required>
            </div>
            <div class="form-group">
              <input v-model="newEvent.endDate" class="form-control" type="date" id="endDate" name="endDate"
                     placeholder="endDate" required>
            </div>
            <div class="form-group">
              <select v-model="newEvent.eventType">
                <option disabled value="">Type:</option>
                <option>Time</option>
                <option>Less time</option>
                <option>Repetition</option>
              </select>
            </div>
          </div>
        </b-modal>

      </div>
      <div v-for="event in group.events" v-bind:key="event.id" class="container border bg-light rounded mt-5 mb-5 p-4">
        <div class="row">
          <div class="col">
            <article>
              <header class="d-flex justify-content-center">
                <h3>{{ event.name }}</h3>
              </header>
              <hr>
              is Active:<h6>{{ event.isActive }}</h6>
              Description:<h6> {{ event.description }}</h6>
              Type:<h6> {{ event.eventType }}</h6>
              Point goal:<h6>{{ event.pointGoal }}</h6>
              Point Per Rep: <h6> {{ event.pointPerRep }}</h6>
              Point Per Minute<h6>{{ event.pointPerMinute }}</h6>
              <h6>Start Date: {{ event.startDate }}</h6>
              <h6>End Date: {{ event.endDate }}</h6>
            </article>
            <router-link v-bind:to="'/event/'+event.id" class="btn btn-block btn-info">Go
              to the event!
            </router-link>
            <b-button @click="changeEventStatus(event.isActive, event.id)" v-if="loggedUserId === group.owner.id"
                      class="btn btn-block btn-warning">Change event status
            </b-button>
          </div>
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
  name: "GroupEvents",
  data() {
    return {
      id: this.$route.params.id,
      token: localStorage.token,
      loggedUserId: localStorage.id,
      group: undefined,
      newEvent: {
        groupId: this.$route.params.id,
        isActive: '',
        name: '',
        description: '',
        pointGoal: '',
        pointPerRep: '',
        pointPerMinute: '',
        startDate: '',
        endDate: '',
        eventType: ''
      },
      changeStatus: {
        id: '',
        isActive: false
      }
    }
  },
  mounted() {
    axios.get(
        'https://filkur-fitness-app.herokuapp.com/api/group/'+this.id,
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
    createEvent() {
      this.newEvent.pointGoal = parseInt(this.newEvent.pointGoal);
      this.newEvent.pointPerRep = parseInt(this.newEvent.pointPerRep);
      this.newEvent.pointPerMinute = parseInt(this.newEvent.pointPerMinute);

      if (this.newEvent.eventType === "Repetition") {
        this.newEvent.eventType = "REP"
      } else if (this.newEvent.eventType === "Time") {
        this.newEvent.eventType = "TIME"
      } else {
        this.newEvent.eventType = "LESS_TIME"
      }
      axios.post(
          'https://filkur-fitness-app.herokuapp.com/api/event',
          JSON.stringify(this.newEvent),
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
          .then((response) => {
            alert('Added new Event')
            location.reload();
            this.$router.push('/groups')
          })
          .catch(function (error) {
            if (error.response) {
              alert(error.response.data["hydra:description"]);
            }
          })
    },
    changeEventStatus(isActive, eventId) {
      this.changeStatus.id = eventId;
      if (isActive === true) {
        this.changeStatus.isActive = false
      } else {
        this.changeStatus.isActive = true
      }

      axios.patch(
          'https://filkur-fitness-app.herokuapp.com/api/event/' + this.changeStatus.id + '/active',
          JSON.stringify(this.changeStatus),
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
          .then(() => {
            location.reload();
          })
    }
  }
}
</script>

<style scoped>

</style>