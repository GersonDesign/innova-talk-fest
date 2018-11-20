import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import InnovaTalkFest from './views/InnovaTalkFest.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/innova-talk-fest',
      name: 'InnovaTalkFest',
      component: InnovaTalkFest
    }
  ]
})
