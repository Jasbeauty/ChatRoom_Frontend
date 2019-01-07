import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GithubAuth from './components/GithubAuth.vue'
import AuthCallback from './components/AuthCallback.vue'
import SignUp from './components/SignUp.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'githubauth',
      component: GithubAuth
    },
    {
      path: '/call_back',
      name: 'authcallback',
      component: AuthCallback
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: function () { 
    //     return import(/* webpackChunkName: "about" */ './views/About.vue')
    //   }
    // }
  ]
})
