<template>
  <div class="container border bg-light rounded" style="margin-top: 150px; width: 450px;">
    <div class="form mt-3">
      <div class="d-flex justify-content-center mb-3">
        <h3>Join us:</h3>
      </div>
      </div>
      <div class="form-group">
        <input v-model="user.email" class="form-control" type="email" id="email" name="email" placeholder="E-mail" required>
      </div>
      <div class="form-group">
        <input v-model="user.nickname" class="form-control" type="text" id="nickname" name="nickname" placeholder="Nickname" required>
      </div>
      <div class="form-group">
        <input v-model="user.password" class="form-control" type="password" id="password" name="password" placeholder="Password" required>
      </div>
      <div class="form-group">
        <button @click="saveUser" class="btn btn-primary btn-block">Create account</button>
      </div>
      <hr>
      <div class=" d-flex justify-content-center">
        <router-link to="/" class="btn btn-warning mb-4">I already have an account</router-link>
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data () {
    return {
      user: {
        email: null,
        nickname: null,
        password: null,
      }
    }
  },
  methods: {

    saveUser(){
      this.errors= [];
      axios.post(
          'http://localhost:8000/api/user/register',
          JSON.stringify(this.user),
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
      )
      .then((response) => {
        alert('The account has been created')
        this.$router.push('/')
      })
      .catch(function (error){
        if (error.response){
          alert(error.response.data["hydra:description"]);
        }
      })
    }
  }
}
</script>

<style scoped>

</style>