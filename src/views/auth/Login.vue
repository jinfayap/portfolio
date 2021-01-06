<template>
  <form @submit.prevent = 'handleSubmit'>
    <h3 class = 'header'>Login page</h3>
    <input type="email" required v-model = 'email' placeholder="Email" />
    <input type="password" required v-model = 'password' placeholder="Password" />
    <p v-if = 'error' class = 'error'>{{ error }}</p>
    <button v-if = '!isPending'>Login</button>
    <button v-if = 'isPending' disabled>Logging in</button>
    <p>New to the page? <router-link :to = "{name: 'Signup'}"><span>Sign up</span></router-link> here</p>
  </form>
</template>

<script>
import { ref } from 'vue';
import useLogin from '@/composable/useLogin'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const {login, error, isPending} = useLogin()

    const handleSubmit = async () => {
      await login(email.value, password.value)
      if (!error.value) {
        console.log('Login success')
        router.push({ name: 'Home' })
      } 
    }

    return {email, password, handleSubmit, error, isPending}
  }
};
</script>

<style>
p span {
  font-weight: 600;
}
</style>