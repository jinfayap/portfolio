import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/portfolio/Home.vue'
import AddAboutMe from '../views/portfolio/AddAboutMe.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/add/aboutme',
    name: 'AddAboutMe',
    component: AddAboutMe
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
