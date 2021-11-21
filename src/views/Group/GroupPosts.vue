<template>
  <div>
    <navbar></navbar>
    <Nav></Nav>
    <div v-if="group.posts" class="container" style="margin-top: 100px;">
      <div class="row d-flex justify-content-start mt-5">
        <h2>Group posts:</h2>
      </div>
      <div class="container mt-2" style="max-width: 1400px; margin-left: 0px;">
        <div>
          <b-button v-b-toggle.collapse-1 variant="secondary">Add new post:</b-button>
          <b-collapse id="collapse-1" class="mt-2">
            <b-card>
              <div class="form">
                <div class="form-group">
                  <input v-model="newPost.content" class="form-control" type="text" id="content" name="content" placeholder="content here" required>
                </div>
                <div class="form-group">
                  <button @click="createPost()" class="btn btn-success btn-block">create post</button>
                </div>
              </div>
            </b-card>
          </b-collapse>
        </div>
      </div>
      <div v-for="post in group.posts" v-bind:key="post.id" class="container border bg-light rounded mt-5" style="max-width: 600px;">
        <div class="d-flex justify-content-around">
          <div class="p-4" style="margin-left: 100px;">{{post.createdBy.nickname}}</div>
          <div class="p-4"><h5>{{post.content}}</h5></div>
          <div class="p-4">{{post.createdAt}}</div>
        </div>
        <router-link v-bind:to="`/post/`+post.id" type="button" class="btn btn-block btn-outline-success mb-2">take part in the discussion
        </router-link>
        <div v-if="loggedUserId === group.owner.id || loggedUserId === post.createdBy.id" class="mb-3">
          <button @click="deletePost(post.id)" class="btn btn-block btn-outline-danger" type="submit">Remove post</button>
        </div>
      </div>
    </div>
    <div v-else class="container"></div>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar/Navbar";
import Nav from "../../components/Nav/Nav";
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
      newPost: {
        groupId: this.$route.params.id,
        content: ''
      }
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
  methods: {
    createPost(){
      axios.post(
          'http://localhost:8000/api/post',
          JSON.stringify(this.newPost),
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
          .then((response) => {
            alert('Added new Post')
            location.reload();
          })
          .catch(function (error){
            if (error.response){
              alert(error.response.data["hydra:description"]);
            }
          })
    },
    deletePost(id){
      axios.delete(
          'http://localhost:8000/api/post/'+id,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
          .then((res) => {
            location.reload();
          })
    }
  }
}
</script>

<style scoped>

</style>