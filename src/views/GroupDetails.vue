<template>
  <div>
    <navbar></navbar>
    <div class="container " style="margin-top:100px;">
        <div class="row d-flex justify-content-center">
          <h1>{{group.name}}</h1>
        </div>
        <div class="row d-flex justify-content-center mt-4">
          <h4>{{group.description}}</h4>
        </div>
      <div class="row d-flex justify-content-center mt-4">
          <h6>Created by: {{group.owner.nickname}} at: {{group.createdAt}}</h6>
        </div>
      <div v-if="group.invitation" class="row d-flex justify-content-center mt-4">
          <h6>Invitation code: {{group.invitation.code}}</h6>
        </div>
      <div v-else class="row d-flex justify-content-center mt-4">
          <h6>Invitation code not generated</h6>
        </div>
      <div v-if="loggedUserId === group.owner.id" class="row d-flex justify-content-center mt-2">
        <button @click="generateCode()" class="btn btn-info mr-1" type="submit"> New code</button>
        <button @click="removeCode()" class="btn btn-secondary ml-1" type="submit">Remove code</button>

      </div>
      <div class="row d-flex justify-content-start mt-4">
        <h2>Groups members:</h2>
      </div>
      <div class="container rounded mt-4">
        <table class="table table-striped">
          <thead >
          <tr>
            <td>Nickname:</td>
            <td>Email:</td>
            <td>Assigned At:</td>
            <td></td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="member in group.groupMembers" v-bind:key="member.id">
            <td>{{member.user.nickname}}</td>
            <td>{{member.user.email}}</td>
            <td>{{member.assignedAt}}</td>
            <td v-if="loggedUserId === group.owner.id">
              <button @click="removeMember(member)" class="btn btn-danger" type="submit">Remove from group</button>
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
  name: "GroupDetails",
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
  methods:{
    removeMember(member){
      if (member.user.id === this.group.owner.id)
      {
        alert("You are the creator of this group. Remove from it will delete the entire group")
        axios.delete(
            'http://localhost:8000/api/group/'+this.id,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
              }
            }
        )
        .then(()=> {
          this.$router.push('/groups')
        })
      }
      axios.delete(
          'http://localhost:8000/api/member/'+this.member.id,
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
    generateCode(){
      axios.post(
          'http://localhost:8000/api/invitation',
          {
            "groupId": this.group.id
          },
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
    removeCode(){
      axios.delete(
          'http://localhost:8000/api/invitation/'+this.group.invitation.id,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
      .then(()=>{
        location.reload();
      })
    }
  }
}
</script>

<style scoped>

</style>