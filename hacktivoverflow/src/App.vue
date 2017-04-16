<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav-tab :statusLogin="statusLogin"></nav-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import NavTab from './components/NavTab'

export default {
  data() {
    return {
      statusLogin: false
    }
  },
  components: {
    NavTab
  },
  mounted() {
    if (window.localStorage.getItem('token')) {
      this.statusLogin = true
    } else {
      this.statusLogin = false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3px;
}
</style>
