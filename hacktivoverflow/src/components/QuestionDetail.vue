<template lang="html">
  <div class="">
    <el-card class="box-card">
      <el-row>
        <router-link to="/questions/ask"><el-button type="primary" v-if="statusLogin == true">Ask Question</el-button></router-link>
        <el-col :span="20">
          <p style="font-size:24px;">{{ question }}</p>
          <p style="font-size:14px;">By {{ user_penanya }}</p>
          <!-- <p style="font-size:14px;">by : <b>{{question.user.username}}</b></p> -->
        </el-col>
        <el-col :span="4">
          <!-- <p><b style="font-size:20px">Votes: {{ upvote - downvote }}</b></p> -->
          <!-- <el-button v-if="statusLogin" :plain="true" type="success" @click="voteQuestion('up')">Upvote</el-button>
          <el-button v-if="statusLogin" :plain="true" type="warning" @click="voteQuestion('down')">Downvote</el-button> -->
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="15">
          <h3>Answer : </h3>
          <el-row v-for="answer in answers">
            <el-col :span="24">
              <div class="grid-content bg-purple-light">
                <p> {{ answer.content }} </p>
              </div>
              <span>By User Id : {{ answer.userid }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="10">
          <el-form label-width="120px" class="demo-ruleForm">
            <el-form-item label="" prop="content">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" auto-complete="off" v-model="newAnswer.content"></el-input>
            </el-form-item>
            <el-button class="btn-login" type="primary" @click="postAnswer()">Post Your Answer</el-button>
          </el-form>
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
      user_penanya:null,
      answer: '',
      id: this.$route.params.id,
      // upVote: 0,
      // downVote: 0,
      answers: [],
      user_penjawab: [],
      newAnswer: {
        content: null
      }
    }
  },
  props: ['statusLogin'],
  methods: {
    getOneQuestion() {
      let self = this
      axios.get(`http://localhost:3000/question/${this.id}`)
          .then(function(res) {
            // console.log("Ini res ------- ", res.data.data.answerid[0].userid);
            self.question = res.data.data.content
            self.user_penanya = res.data.data.userid.username
            res.data.data.answerid.forEach(function(jawaban) {
              self.answers.push(jawaban)
            })
            // console.log(jawabn.content);
            // self.answers = res.data.data.answerid[1].content
            // console.log("ini questions ----",self.question);
          }).catch(function(err) {
            console.log(err);
          })
    },
    postAnswer() {
      var self = this
      let newAnswer = {
        content: this.newAnswer.content,
        userid: localStorage.getItem('user_id'),
        questionid: this.id
      }
      axios.post('http://localhost:3000/answer', newAnswer, {
        headers: {'token' : window.localStorage.getItem('token')}
      }).then(function(res) {
        console.log(res.data);
        // self.question.content
        self.getOneQuestion()
        // window.location.href += `http://localhost:3000/question/${this.id}`
        // window.alert("Thank you for you answer !");
      }).catch(function(err) {
        console.log(err);
      })
    }
  },
  mounted() {
    this.getOneQuestion()
  }
}
</script>

<style lang="css">
</style>
