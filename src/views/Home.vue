<template>
  <div class="container">
    <div class="row" style="margin-top: 150px;">
      <div class="col">
        <header><h1>Social-fitness-app</h1></header>
        <p>Practice with your friends</p>
        <h5>Get our App!</h5>
        <img :src="require(`@/assets/mobile_login.png`)" style="margin-right:50px;" alt="mobile_login">
        <img :src="require(`@/assets/mobile_ranking.png`)" alt="mobile_ranking">
      </div>
      <div class="col">
        <login style="margin-top: 150px;"></login>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '../components/Auth/Login'
export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>

