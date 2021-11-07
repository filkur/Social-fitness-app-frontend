<template>
<div>
  <ul class="nav justify-content-center mt-5">
    <li class="nav-item border-right">
      <router-link v-bind:to="'/group/'+this.$route.params.id+'/info'" class="nav-link text-dark">
        <h2>Info</h2>
      </router-link>
    </li>
    <li class="nav-item border-right">
      <router-link v-bind:to="'/group/'+this.$route.params.id+'/members'" class="nav-link text-dark">
        <h2>Members</h2>
      </router-link>
    </li>
    <li class="nav-item border-right">
      <router-link v-bind:to="'/group/'+this.$route.params.id+'/posts'" class="nav-link text-dark">
        <h2>Posts</h2>
      </router-link>
    </li>
    <li class="nav-item border-right">
      <router-link v-bind:to="'/group/'+this.$route.params.id+'/events'" class="nav-link text-dark">
        <h2>Events</h2>
      </router-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "Nav",
  methods:{
    info(){
      console.log(this.$route.params.id)
    }
  }
}
</script>

<style scoped>

</style>