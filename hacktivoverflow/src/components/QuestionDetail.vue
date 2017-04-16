<template lang="html">
  <div class="">
    <el-card class="box-card">
      <el-row>
        <el-col :span="18">
          <p style="font-size:24px;">{{ question.content }}</p>
          <p style="font-size:14px;">Asked at {{question.createdAt}}</p>
          <p style="font-size:14px;">by : <b>{{question.user.username}}</b></p>
        </el-col>
        <el-col :span="6">
          <p><b style="font-size:20px">Votes: {{ upVote - downVote }}</b></p>
          <!-- <el-button v-if="statusLogin" :plain="true" type="success" @click="voteQuestion('up')">Upvote</el-button>
          <el-button v-if="statusLogin" :plain="true" type="warning" @click="voteQuestion('down')">Downvote</el-button> -->
        </el-col>

      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      question: null,
      answer: '',
      id: this.$route.params.id,
      upVote: 0,
      downVote: 0,
      answers: []
    }
  },
  getOneQuestion() {
    let self = this
    axios.get(`http://localhost:3000/questions/${this.id}`)
        .then(function(res) {
          self.question = res.data.data
          self.answers = res.question.answers
        }).catch(function(err) {
          console.log(err);
        })
  }
}
</script>

<style lang="css">
</style>
