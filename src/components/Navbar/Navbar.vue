<template>
  <div class="bg-light">
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="/groups">Social-fitness-app</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <button @click="logOut" class="btn btn-warning" type="submit">Log out</button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data () {
    return {
      nickname: ''
    }
  },
  mounted() {
    if (localStorage.nickname){
      this.nickname = localStorage.nickname;
    }
  },
  methods: {
    logOut(){
      localStorage.removeItem('token')
      localStorage.removeItem('id');
      localStorage.removeItem('email');
      localStorage.removeItem('nickname');
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>