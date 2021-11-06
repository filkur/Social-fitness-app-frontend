<template>
  <div>
    <navbar></navbar>
    <Nav></Nav>
    posty
  </div>
</template>

<script>
import Navbar from "../components/Navbar/Navbar";
import Nav from "../components/Group/Nav";
import axios from "axios";

export default {
  components: {
    Navbar,
    Nav
  },
  name: "GroupPosts"
}
</script>

<style scoped>

</style>