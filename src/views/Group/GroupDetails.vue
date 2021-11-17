<template>
  <div>
    <navbar></navbar>
    <Nav></Nav>
    <div class="container" style="margin-top:100px;">
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
      <div v-if="loggedUserId === group.owner.id" class="row d-flex justify-content-center mt-4">
        <button @click="removeGroup()" class="btn btn-outline-danger mr-1" type="submit">Remove group</button>
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
    },
    removeGroup(){
      axios.delete(
          'http://localhost:8000/api/group/'+this.group.id,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      ).then(()=>{
        alert('Group deleted');
        this.$router.push('/groups');
      })
    },
  }
}
</script>

<style scoped>

</style>