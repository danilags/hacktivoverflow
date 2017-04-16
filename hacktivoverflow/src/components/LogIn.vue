<template lang="html">
  <div class="login">
    <el-row >
      <h1>Login</h1>
      <div class="form">
        <el-form label-width="120px" class="demo-ruleForm">
          <el-form-item label="Username" prop="username">
            <el-input type="text" auto-complete="off" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input type="password" auto-complete="off" v-model="user.password"></el-input>
          </el-form-item>
          <el-button class="btn-login" type="success" @click="signIn()">Login</el-button>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: {
        username : null,
        password : null
      }
    }
  },
  methods: {
    signIn() {
      let self = this
      axios.post('http://localhost:3000/login', {
        username: self.user.username,
        password: self.user.password
      }).then(function(res) {
        console.log(res);
        if (res.data.success) {
          window.localStorage.setItem('token', res.data.token)
          window.localStorage.setItem('user_id', res.data.id)
          window.location.reload()
          window.alert("Your Login success !");
          window.location.href = 'http://localhost:8080/';
        } else {
          self.showError(res.data.msg)
        }
      }).catch(function(err) {
        console.log(err);
      })
    },
    showError(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error'
      })
    }
  },
  mounted() {
    this.signIn()
  }
}
</script>

<style lang="css">
</style>
