<template>
  <div>
    <navbar></navbar>
    <Nav></Nav>
    <div class="container " style="margin-top:100px;">
      <div class="row d-flex justify-content-start mt-5">
        <h2>Groups members:</h2>
      </div>
      <div class="container rounded mt-4">
        <table class="table">
          <thead class="bg-light">
          <tr>
            <td>Nickname:</td>
            <td>Email:</td>
            <td>Assigned At:</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="member in group.groupMembers" v-bind:key="member.id">
            <td>{{member.user.nickname}}</td>
            <td>{{member.user.email}}</td>
            <td>{{member.assignedAt}}</td>
            <div class="ml-4" v-if="loggedUserId === group.owner.id">
              <button @click="removeMember(member)" class="btn btn-danger" type="submit">Remove from group</button>
            </div>

            <div class="ml-4" v-else-if="loggedUserId === member.user.id">
              <button @click="removeMember(member)" class="btn btn-danger" type="submit">Leave group</button>
            </div>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar/Navbar";
import Nav from "../../components/Group/Nav";
import axios from "axios";

export default {
  components: {
    Navbar,
    Nav
  },
  name: "GroupMember",
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
    removeMember(member) {
      if (member.user.id === this.group.owner.id) {
        alert("You are the creator of this group. Remove from it will delete the entire group")
        axios.delete(
            'http://localhost:8000/api/group/' + this.id,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
              }
            }
        )
            .then(() => {
              this.$router.push('/groups')
            })
      }
      axios.delete(
          'http://localhost:8000/api/member/' + this.member.id,
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
    },
  }
}
</script>

<style scoped>

</style>