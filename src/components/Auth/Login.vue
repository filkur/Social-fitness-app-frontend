<template>
  <div class="container border bg-light rounded">
    <div class="form mt-3">
      <div class="d-flex justify-content-center mb-3">
        <h3>Zaloguj się:</h3>
      </div>
      <div class="form-group">
        <input v-model="user.email" class="form-control" type="email" id="email" name="email" placeholder="E-mail">
      </div>
      <div class="form-group">
        <input v-model="user.password" class="form-control" type="password" id="password" name="password" placeholder="Hasło">
      </div>
      <div class="form-group">
        <button @click="saveCategory" class="btn btn-primary btn-block">Zarejestruj się</button>
      </div>
      <hr>
    </div>
    <div class=" d-flex justify-content-center">
      <router-link to="/register" class="btn btn-success mb-4">Utwórz nowe konto</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data () {
    return {
      user: {
        email: '',
        password:'',
      }
    }
  }
}
</script>

<style scoped>

</style>