import { createRouter, createWebHistory } from 'vue-router'
// Portfolio Imports
import Home from '../views/portfolio/Home.vue'
import AddAboutMe from '../views/portfolio/AddAboutMe.vue'
import EditAboutMe from '../views/portfolio/EditAboutMe.vue'
import Login from '../views/auth/Login.vue'
// import Signup from '../views/auth/Signup.vue'
import AddLatestWork from '../views/portfolio/AddLatestWork.vue'
import EditLatestWork from '../views/portfolio/EditLatestWork.vue'
import AddCertificate from '../views/portfolio/AddCertificate.vue'
import CertificateInfo from '../views/portfolio/CertificateInfo.vue'
import EditCertificate from '../views/portfolio/EditCertificate.vue'
import EditContactMe from '../views/portfolio/EditContactMe'

// Blog imports
import Blog from '../views/blog/Blog.vue'
import AddNewBlog from '../views/blog/AddNewBlog.vue'
import ViewBlogDetails from '../views/blog/ViewBlogDetails.vue'

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
  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: Signup,
  //   beforeEnter: requireNoAuth
  // },
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
  },
  {
    path: '/add/certificate',
    name: 'AddCertificate',
    component: AddCertificate,
    beforeEnter: requireAuth
  },
  {
    path: '/certificate/:id',
    name: 'CertificateInfo',
    component: CertificateInfo,
    props: true
  },
  {
    path: '/edit/certificate/:id',
    name: 'EditCertificate',
    component: EditCertificate,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/edit/contactme',
    name: 'EditContactMe',
    component: EditContactMe,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/blog/addnewblog',
    name: 'AddNewBlog',
    component: AddNewBlog
  },
  {
    path: '/blog/:id',
    name: 'ViewBlogDetails',
    component: ViewBlogDetails,
    props: true
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
