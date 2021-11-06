<template>
  <div>
    <navbar></navbar>
    <div class="container" style="margin-top: 50px;">
      <div class="d-flex justify-content-start  mt-4">
        <h2>Groups:</h2>
      </div>
      <div class="container rounded mt-4">
        <table class="table table-striped">
          <thead >
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Owner</td>
              <td>Created At</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
          <tr v-for="group in groups" v-bind:key="group.id">
            <td>{{group.name}}</td>
            <td>{{group.description}}</td>
            <td>{{group.owner.nickname}}</td>
            <td>{{group.createdAt}}</td>
            <td>
              <button @click="groupDetails(group.id)" class="btn btn-success" type="submit">Details</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar/Navbar'
import axios from "axios";

export default {
  components: {
    Navbar
  },
  name: "Group",
  data() {
    return {
      token: '',
      userId: '',
      email: '',
      nickname: '',
      groups:undefined
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
    this.fetchGroups();
  },
  methods: {
    fetchGroups() {
      axios.get(
          'http://localhost:8000/api/group',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
          .then((resp) => {
            console.log(resp.data)
            this.groups = resp.data;
          })
    },
    groupDetails(id) {
      this.$router.push('group/'+id)
    }
  }
}
</script>

<style scoped>

</style>