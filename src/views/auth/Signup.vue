<template>
  <form @submit.prevent = 'handleSubmit'>
    <h3 class = 'header'>Sign up page</h3>
    <input type="text" required v-model = 'displayName' placeholder="Your Nickname" />
    <input type="email" required v-model = 'email' placeholder="Email" />
    <input type="password" required v-model = 'password' placeholder = "Password" />

    <p v-if = 'error' class = 'error'>{{ error }}</p>
    <button v-if = '!isPending'>Sign up</button>
    <button v-if = 'isPending' disabled>Processing</button>

    <p>Created an account? <router-link :to = "{ name: 'Login' }"><span>Login</span></router-link> here</p>
  </form>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/composable/useSignup.js'

export default {
    setup() {
        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const {signUp, error, isPending} = useSignup();

        const handleSubmit = async () => {
            await signUp(email.value, password.value, displayName.value)
            if (!error) {
                console.log('New Account Sign up successful')
            }
        }
        return {displayName, email, password, handleSubmit, error, isPending}
    }  
};
</script>

<style>

</style>