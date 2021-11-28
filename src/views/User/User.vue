<template>
<div>
  <navbar></navbar>

  <div class="container">
    <div class="row">
      <div class="col mr-5">
        <div class="container bg-white" style="margin-top: 180px;">
          <div class="row" style="margin-top: 80px;">
            <h2>Edit data:</h2>
          </div>
          <div class="container border bg-light rounded mt-4" style="max-width: 600px;">
            <div class="form-group mt-4">
              <input v-model="newUserData.email" class="form-control" type="email" id="email" name="email" placeholder="E-mail" required>
            </div>
            <div class="form-group">
              <input v-model="newUserData.nickname" class="form-control" type="text" id="nickname" name="nickname" placeholder="Nickname" required>
            </div>
            <div class="form-group">
              <input v-model="newUserData.password" class="form-control" type="password" id="password" name="password" placeholder="Password" required>
            </div>
            <div class="form-group">
              <button @click="updateUserData" class="btn btn-outline-primary btn-block">Update data</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="container bg-white" style="margin-top: 180px;">
          <div class="row" style="margin-top: 80px;">
            <h2>New password:</h2>
          </div>
          <div class="container border bg-light rounded mt-4" style="max-width: 600px;">
            <div class="form-group mt-4">
              <input v-model="newPasswordData.password" class="form-control" type="password" id="newPassword" name="newPassword" placeholder="newPassword" required>
            </div>
            <div class="form-group mt-4">
              <input v-model="newPasswordData.oldPassword" class="form-control" type="password" id="oldPassword" name="oldPassword" placeholder="oldPassword" required>
            </div>
            <div class="form-group mt-5 mb-4">
              <button @click="updateUserPassword" class="btn btn-outline-warning btn-block">Set password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

export default {
  components: {
    Navbar
  },
  name: "User",
  data () {
    return {
      id: localStorage.id,
      token: localStorage.token,
      user: {
        email: '',
        nickname: ''
      },
      newUserData:{
        id: localStorage.id,
        nickname: '',
        email: '',
        password: ''
      },
      newPasswordData:{
        id: localStorage.id,
        password: '',
        oldPassword: ''
      }
    }
  },
  mounted() {
    axios.get(
        'https://filkur-fitness-app.herokuapp.com/api/user/'+this.id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        }
    )
    .then(resp => {
      this.user = resp.data;
    })
  },
  methods: {
    updateUserData(){
      axios.patch(
          'https://filkur-fitness-app.herokuapp.com/api/user/'+this.id,
          JSON.stringify(this.newUserData),
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
      .then(resp=>{
        alert('Data updated');
        axios.post(
            'https://filkur-fitness-app.herokuapp.com/api/login',
            {
              'email': this.newUserData.email,
              'password': this.newUserData.password
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
        )
            .then((response)=>{
              console.log(response.data);
              localStorage.setItem('token', response.data["token"]);
              localStorage.setItem('id', response.data["id"]);
              localStorage.setItem('email', response.data["email"]);
              localStorage.setItem('nickname', response.data["nickname"]);
              this.$router.push('/groups')
            })
      })
    },
    updateUserPassword(){
      axios.put(
          'https://filkur-fitness-app.herokuapp.com/api/user/'+this.id,
          JSON.stringify(this.newPasswordData),
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
      .then(resp => {
        alert('Password changed. You will be logged out of the website in a moment')
        localStorage.removeItem('token')
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        localStorage.removeItem('nickname');
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>

</style>