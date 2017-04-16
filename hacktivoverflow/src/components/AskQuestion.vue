<template lang="html">
  <div class="animated fadeIn">
    <el-row >
      <el-col :span="10">
        <el-form label-width="120px" class="demo-ruleForm">
          <el-form-item label="" prop="content">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" auto-complete="off" v-model="question.content"></el-input>
          </el-form-item>
          <el-button class="btn-login" type="primary" @click="askQuestion()">Post Your Question</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      question: {
        content: null
      }
    }
  },
  methods: {
    askQuestion() {
      let newQuestion = {
        content: this.question.content,
        userid: localStorage.getItem('user_id')
      }
      axios.post('http://localhost:3000/question', newQuestion, {
        headers: {'token' : window.localStorage.getItem('token')}
      }).then(function(res) {
        window.location.href = 'http://localhost:8080/';
      }).catch(function(err) {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>
