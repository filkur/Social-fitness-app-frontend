<template>
  <div class="container border bg-light rounded">
    <div class="form mt-3">
      <div class="d-flex justify-content-center mb-3">
        <h3>Log in to application:</h3>
      </div>
      <div class="form-group">
        <input v-model="email" class="form-control" type="email" id="email" name="email" placeholder="E-mail">
      </div>
      <div class="form-group">
        <input v-model="password" class="form-control" type="password" id="password" name="password" placeholder="Password">
      </div>
      <div class="form-group">
        <button @click="loginUser" class="btn btn-primary btn-block">Log in</button>
      </div>
      <hr>
    </div>
    <div class=" d-flex justify-content-center">
      <router-link to="/register" class="btn btn-success mb-4">Create new account</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data () {
    return {
      email: '',
      password:'',
    }
  },
  methods: {
    loginUser(){
      axios.post(
          'http://localhost:8000/api/login',
          {
            'email': this.email,
            'password': this.password
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
      .catch(function (error){
        alert("Wrong email or password")
        console.log(error.response.data);
      })
    }
  }
}
</script>

<style scoped>

</style>