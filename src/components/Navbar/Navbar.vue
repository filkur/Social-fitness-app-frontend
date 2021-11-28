<template>
  <div class="bg-dark">
    <b-navbar class="p-3" variant="faded" type="light">
      <div>
        <b-button v-b-toggle.sidebar-backdrop>=</b-button>

        <b-sidebar :nickname="nickname"
            id="sidebar-backdrop"
            title="Social-fitness-app"
            :backdrop-variant="variant"
            backdrop
            shadow
        >
          <hr>

          <div class="px-3 py-2">
            <h5>Hello, {{nickname}}</h5>
          </div>
          <hr>

          <div class="text-dark">
            <b-button variant="link" v-bind:to="'/groups'">Show groups</b-button>
          </div>
          <div>
            <b-button variant="link" v-b-modal.modal-2>Add group</b-button>

            <b-modal
                id="modal-2"
                title="Create Group:"
                @ok="createGroup()"
            >
              <div class="form">
                <div class="form-group">
                  <input v-model="newGroup.name" class="form-control" type="text" id="name" name="name" placeholder="name" required>
                </div>
                <div class="form-group">
                  <input v-model="newGroup.description" class="form-control" type="text" id="description" name="description" placeholder="description" required>
                </div>
              </div>
            </b-modal>

          </div>

          <div>
            <b-button variant="link" v-b-modal.modal-3>Join to group</b-button>

            <b-modal
                id="modal-3"
                title="Enter invitation code:"
                @ok="joinGroup()"
            >
              <div class="form">
                <div class="form-group">
                  <input v-model="newEventMember.code" class="form-control" type="text" id="code" name="code" placeholder="code" required>
                </div>
              </div>
            </b-modal>
          </div>

          <div class="ml-2" style="margin-top: 295px;">
            <h4>Account settings:</h4>
          </div>
          <div style="margin-top:5px;">
            <b-card-footer >
              <router-link v-bind:to="'/me'" class="btn btn-block btn-outline-success">Edit</router-link>
              <b-button @click="removeUser()" block variant="outline-danger">Remove</b-button>
            </b-card-footer>
          </div>

        </b-sidebar>
      </div>
      <b-navbar-nav class="ml-auto">
        <button @click="logOut" class="btn btn-warning" type="submit">Log out</button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "navbar",
  data () {
    return {
      token: '',
      userId: '',
      email: '',
      nickname: '',
      newGroup:{
        name: '',
        description: ''
      },
      newEventMember:{
        code: ''
      }
    }
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    if (localStorage.id) {
      this.userId = localStorage.id;
    }
    if (localStorage.email) {
      this.email = localStorage.email;
    }
    if (localStorage.nickname) {
      this.nickname = localStorage.nickname;
    }
  },
  methods: {
    logOut(){
      localStorage.removeItem('token')
      localStorage.removeItem('id');
      localStorage.removeItem('email');
      localStorage.removeItem('nickname');
      this.$router.push('/')
    },
    createGroup(){
      axios.post(
          'https://filkur-fitness-app.herokuapp.com/api/group',
          JSON.stringify(this.newGroup),
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
      .then(resp => {
        alert('Added new group!');
        location.reload();

      })
    },
    joinGroup(){
      axios.post(
          'https://filkur-fitness-app.herokuapp.com/api/member',
          JSON.stringify(this.newEventMember),
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
          .then(resp => {
            alert('Joined to group');
            location.reload();
          })
    },
    removeUser(){
      axios.delete(
          'https://filkur-fitness-app.herokuapp.com/api/user/'+this.userId,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
          .then((resp) => {
            alert('Account deleted')
            this.$router.push('/')
          })
    }
  }
}
</script>

<style scoped>

</style>