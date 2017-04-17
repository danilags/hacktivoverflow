<template lang="html">
  <div class="userprofile">
    <h3>Username : {{ users.username }}</h3>
    <h3>Password : {{ users.email }}</h3>
    <h4>Answer : </h4>
    <div class="answer" v-for="jawaban in users.answer">
      <p>{{ jawaban.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      profile_id: this.$route.params.id,
      users: null
    }
  },
  methods: {
    getUser() {
      let self = this
      axios.get(`http://localhost:3000/user/${this.profile_id}`)
        .then(function(res) {
          // console.log(res.data);
          self.users = res.data
          console.log(self.users);
        }).catch(function(err) {
          console.log(err);
        })
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<style lang="css">
</style>
