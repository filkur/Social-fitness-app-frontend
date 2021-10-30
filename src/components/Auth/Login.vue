<template>
  <div class="container border bg-light rounded">
    <form class="form-signin mt-4">
      <h1 class="h3 mb-3 font-weight-normal d-flex justify-content-center">Zaloguj się</h1>
      <label for="inputEmail" class="sr-only mb-5 mt-5">Adres email</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Adres email" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Hasło" required>
      <div class="checkbox mb-3">
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Zaloguj się</button>
      <hr>
      <div class=" d-flex justify-content-center">
        <button class="btn btn-lg btn-success mb-4" type="submit">Utwórz nowe konto</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>

</style>