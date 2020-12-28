<template>
  <form @submit.prevent = 'handleSubmit'>
    <h3 class = 'header'>Login page</h3>
    <input type="email" required v-model = 'email' placeholder="Email" />
    <input type="password" required v-model = 'password' placeholder="Password" />
    <button>Login</button>
    <p>New to the page? <router-link :to = "{name: 'Signup'}"><span>Sign up</span></router-link> here</p>
  </form>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const email = ref('')
    const password = ref('')

    const handleSubmit = () => {
      console.log(email.value, password.value)
    }

    return {email, password, handleSubmit}
  }
};
</script>

<style>
p span {
  font-weight: 600;
}
</style>