import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import QuestionList from '@/components/QuestionList'
import SignUp from '@/components/SignUp'
import LogIn from '@/components/LogIn'
import AskQuestion from '@/components/AskQuestion'
import QuestionDetail from '@/components/QuestionDetail'

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
    },
    {
      path: '/questions/ask',
      component: AskQuestion
    },
    {
      path: '/questions/:id',
      component: QuestionDetail,
      props: true
    }
  ]
})
