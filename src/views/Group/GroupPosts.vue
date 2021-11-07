<template>
  <div>
    <navbar></navbar>
    <Nav></Nav>
    <div v-if="group.posts" class="container" style="margin-top: 100px;">
      <div class="row d-flex justify-content-start mt-5">
        <h2>Group posts:</h2>
      </div>
      <div v-for="post in group.posts" v-bind:key="post.id" class="container border bg-light rounded mt-5" style="max-width: 700px;">
        <div class="d-flex justify-content-around">
          <div class="p-2">{{post.createdBy.nickname}}</div>
          <div class="p-2"><h5>{{post.content}}</h5></div>
          <div class="p-2">{{post.createdAt}}</div>
        </div>
        <button type="button" class="btn btn-block btn-outline-success">take part in the discussion
        </button>
      </div>
    </div>
    <div v-else class="container"></div>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar/Navbar";
import Nav from "../../components/Group/Nav";
import axios from "axios";

export default {
  components: {
    Navbar,
    Nav
  },
  name: "GroupPosts",
  data () {
    return {
      id: this.$route.params.id,
      token: localStorage.token,
      loggedUserId: localStorage.id,
      group:undefined,
    }
  },
  mounted() {
    axios.get(
        'http://localhost:8000/api/group/'+this.id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        }
    )
        .then((resp) => {
          this.group = resp.data;
        })
  },
}
</script>

<style scoped>

</style>