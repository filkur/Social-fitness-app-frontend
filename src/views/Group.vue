<template>
  <div>
    <p>{{ token }}></p>
    <p>{{ userId }}></p>
    <p>{{email}}></p>
    <p>{{nickname}}></p>
  </div>
</template>

<script>
export default {
  name: "Group",
  data () {
    return {
      token : '',
      userId: '',
      email: '',
      nickname: '',
    }
  },
  mounted() {
    if (localStorage.token){
      this.token = localStorage.token;
    }
    if (localStorage.id){
      this.userId = localStorage.id;
    }
    if (localStorage.email){
      this.email = localStorage.email;
    }
    if (localStorage.nickname){
      this.nickname = localStorage.nickname;
    }
  }
}
</script>

<style scoped>

</style>