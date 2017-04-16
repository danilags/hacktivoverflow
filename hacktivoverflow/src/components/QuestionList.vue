<template lang="html">
  <div class="">
    <h1>{{ msg }}</h1>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple-dark">
        <h3>Top Questions</h3>
      </div>
    </el-col>
    <el-col :span="12"><div class="grid-content bg-purple-dark">
      <router-link to="/questions/ask"><el-button type="primary" v-if="statusLogin == true">Ask Question</el-button></router-link>
    </div>
  </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" v-for="question in questions" :key="question._id">
              <el-row>
                <router-link :to="'/questions/'+question._id">
                  <el-col :span="18">
                    <p>{{ question.content }}</p>
                  </el-col>
                </router-link>
                <el-col :span="3">
                  <p>Votes : {{question.votes}}</p>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="10">
                  <div class="answer" v-for="answer in question.answerid">
                    <p>{{answer.content}} : <span><a href="#"></a></span></p>
                  </div>
                </el-col>
              </el-row> -->
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      msg: 'Welcome to Hacktivoverflow',
      questions: [],
      statusLogin : false
    }
  },
  methods: {
    getQuestion() {
      let self = this
      axios.get('http://localhost:3000/question')
           .then(function(res) {
             res.data.forEach(function(data) {

               self.questions.push(data)
             })
             console.log(self.questions.answerid);
           }).catch(function(err) {
             console.log(err);
           })
    }
  },
  mounted() {
    this.getQuestion()
    if (window.localStorage.getItem('token')) {
      this.statusLogin = true
    } else {
      this.statusLogin = false
    }
  }
}
</script>

<style lang="css">
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
