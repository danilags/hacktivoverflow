import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import QuestionList from '@/components/QuestionList'
import SignUp from '@/components/SignUp'
import LogIn from '@/components/LogIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: QuestionList
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/login',
      component: LogIn
    }
  ]
})
