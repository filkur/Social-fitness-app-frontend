<template>
  <div class="container">
    <div class="row" style="margin-top: 200px;">
      <div class="col">
        <header><h1>Social-fitness-app</h1></header>
        <p>Jesteś gotowy na odpowiedni zastrzyk motywacji?
        Zarejestruj się już teraz!</p>
      </div>
      <div class="col">
        <login></login>
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

