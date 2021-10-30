<template>
  <div class="container border bg-light rounded" style="margin-top: 150px; width: 450px;">
    <div class="form mt-3">
      <div class="d-flex justify-content-center mb-3">
        <h3>Wypełnij formularz:</h3>
      </div>
      <div class="form-group">
        <input v-model="user.email" class="form-control" type="email" id="email" name="email" placeholder="E-mail">
      </div>
      <div class="form-group">
        <input v-model="user.nickname" class="form-control" type="text" id="nickname" name="nickname" placeholder="Nickname">
      </div>
      <div class="form-group">
        <input v-model="user.password" class="form-control" type="password" id="password" name="password" placeholder="Hasło">
      </div>
      <div class="form-group">
        <button @click="saveCategory" class="btn btn-primary btn-block">Zarejestruj się</button>
      </div>
      <hr>
      <div class=" d-flex justify-content-center">
        <router-link to="/" class="btn btn-warning mb-4">Mam już konto</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data () {
    return {
      user: {
        email: '',
        nickname: '',
        password:'',
      }
    }
  }
}
</script>

<style scoped>

</style>