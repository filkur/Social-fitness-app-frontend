<template>
  <div class="containe">
    <navbar></navbar>
    <div>lala</div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar/Navbar'

export default {
  components: {
    Navbar
  },
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