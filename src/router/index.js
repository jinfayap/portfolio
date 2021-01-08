import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/portfolio/Home.vue'
import AddAboutMe from '../views/portfolio/AddAboutMe.vue'
import EditAboutMe from '../views/portfolio/EditAboutMe.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import AddLatestWork from '../views/portfolio/AddLatestWork.vue'
import EditLatestWork from '../views/portfolio/EditLatestWork.vue'

// auth guard

import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if(!user) {
    next({ name: 'Login'})
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if(user) {
    next({ name: 'Home'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: requireNoAuth
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: requireNoAuth
  },
  {
    path: '/add/aboutme',
    name: 'AddAboutMe',
    component: AddAboutMe,
    beforeEnter: requireAuth
  },
  {
    path: '/edit/aboutme',
    name: 'EditAboutMe',
    component: EditAboutMe,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/add/latestwork',
    name: 'AddLatestWork',
    component: AddLatestWork,
    beforeEnter: requireAuth
  },
  {
    path: '/edit/latestwork/:id',
    name: 'EditLatestWork',
    component: EditLatestWork,
    props: true,
    beforeEnter: requireAuth
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
