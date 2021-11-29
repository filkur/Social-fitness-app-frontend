<template>
<div>
  <navbar></navbar>
  <div class="container" style="margin-top: 100px;">
    <div class="container border bg-light rounded mt-5" style="max-width: 700px;">
      <b-row class="text-center mb-4 mt-4">
        <b-col>{{post.createdBy.nickname}}</b-col>
        <b-col style="min-width: 300px;"><h5>{{post.content}}</h5></b-col>
        <b-col>{{post.createdAt}}</b-col>
      </b-row>
    </div>
    <hr>
    <div v-for="comment in post.comments" v-bind:key="comment.id" class="container border bg-white" style="max-width: 700px;">
      <b-row class="text-center mb-4 mt-4">
        <b-col>{{comment.createdBy.nickname}}</b-col>
        <b-col><h5>{{comment.content}}</h5></b-col>
        <b-col>{{comment.updatedAt}}</b-col>
        <b-col v-if="loggedUserId ===comment.createdBy.id" style="max-width: 80px;">
          <button @click="deleteComment(comment.id)" class="btn btn-block btn-outline-danger" type="submit">X</button>
        </b-col>
      </b-row>
    </div>
    <div class="container mt-2" style="max-width: 700px;">
      <div>
        <b-button v-b-toggle.collapse-1 variant="secondary">Add comment</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <div class="form">
              <div class="form-group">
                <input v-model="newComment.content" class="form-control" type="text" id="content" name="content" placeholder="content here" required>
              </div>
              <div class="form-group">
                <button @click="addComment()" class="btn btn-success btn-block">add</button>
              </div>
            </div>
          </b-card>
        </b-collapse>
      </div>
    </div>
  </div>
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
  name: "PostDetails",
  data () {
    return {
      id: this.$route.params.id,
      token: localStorage.token,
      loggedUserId: localStorage.id,
      post: undefined,
      newComment: {
        postId: this.$route.params.id,
        content: '',
      }
    }
  },
  mounted() {
    axios.get(
        'http://localhost:8000/api/post/'+this.id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        }
    )
    .then((resp)=>{
      this.post = resp.data;
    })
  },
  methods: {
    addComment(){
      console.log(this.newComment.postId)
      axios.post(
          'http://localhost:8000/api/comment',
          JSON.stringify(this.newComment),
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          }
      )
          .then((response) => {
            alert('Added new comment')
            location.reload();
          })
          .catch(function (error){
            if (error.response){
              alert(error.response.data["hydra:description"]);
            }
          })
    },
    deleteComment(id){
      axios.delete(
          'http://localhost:8000/api/comment/'+id,
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