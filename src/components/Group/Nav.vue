<template>
<div>
  <ul class="nav justify-content-center mt-5">
    <li class="nav-item border-right">
      <a v-bind:href="'/group/'+this.$route.params.id+'/info'" class="nav-link text-dark">
        <h2>Info</h2>
      </a>
    </li>
    <li class="nav-item border-right">
      <a v-bind:href="'/group/'+this.$route.params.id+'/members'" class="nav-link text-dark">
        <h2>Members</h2>
      </a>
    </li>
    <li class="nav-item border-right">
      <a v-bind:href="'/group/'+this.$route.params.id+'/posts'" class="nav-link text-dark">
        <h2>Posts</h2>
      </a>
    </li>
    <li class="nav-item border-right">
      <a v-bind:href="'/group/'+this.$route.params.id+'/events'" class="nav-link text-dark">
        <h2>Events</h2>
      </a>
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