<template>
  <div>
    <!-- As a link -->
    <b-navbar class="bg-light">
      <b-navbar-brand href="#" class="ml-3 mt-3 mb-3">Social-fitness-app</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button size="lm" class="mr-3 btn-info" type="submit">Zaloguj się</b-button>
          <b-button size="lm" class="mr-3 btn-warning" type="submit">Utwórz konto</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "navbar"
}
</script>

<style scoped>

</style>