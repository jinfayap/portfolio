<template>
  <nav>
      <router-link :to = "{ name: 'Home'} ">
          <h2>Home</h2>
      </router-link>
      
      <div class="nav-links">
          <div v-if = '!user'>
              <router-link :to = "{ name : 'Login' }">
                <button>Login</button>
              </router-link>
              <router-link :to = "{ name : 'Signup'}">
                <button>Sign up</button>
              </router-link>
          </div>
          <div v-else>
              <button v-if = '!isPending' @click = 'handleClick'>Logout</button>
              <button v-else disabled>Logging Out</button>
          </div>
      </div>
  </nav>
  <div class = 'error' v-if = 'error'> {{ error }} </div>
</template>

<script>
import getUser from '@/composable/getUser'
import useLogout from '@/composable/useLogout'
import { useRouter } from 'vue-router'

export default {
    setup () {
        const { user } = getUser()
        const { error, isPending, logout } = useLogout()

        const router = useRouter()

        const handleClick = async() => {
            await logout()
            router.push({ name: 'Login' })
        }
        return { user, handleClick, error, isPending }
    }

}
</script>

<style scoped>
nav {
    display: flex;
    padding: 10px 20px;
    background-color: rgb(16, 212, 212);
    margin-bottom: 2.5em;
}
.nav-links {
    display: flex;
    margin-left: auto;
}
.nav-links button {
    margin-left: 10px;
}
</style>