<template>
      <div class = 'error' v-if = 'error'>{{ error }}</div>
    <form @submit.prevent = handleSubmit v-if = 'contact'>
      <input type="email" placeholder = 'Email' required v-model = 'contact.email'>
      <input type="url" placeholder = 'Github Profile Url' required v-model = 'contact.github'>
      <input type="url" placeholder = 'LinkedIn Profile Url' required v-model = 'contact.linkedin'>
      <div v-if = 'updateError' class = 'error' >{{ updateError }}</div>
      <button v-if = '!isPending'>Finish Editing</button>
      <button v-else disabled>Updating...</button>
  </form>
</template>

<script>
import getDocument from '@/composable/getDocument'
import useCollection from '@/composable/useCollection'
import { useRouter } from 'vue-router'
export default {
    props: [ 'id' ],
    setup(props) {
        const { document: contact, error } = getDocument('contactme', props.id)
        const { updateDoc, error: updateError, isPending } = useCollection('contactme')

        const router = useRouter()

        const handleSubmit = async() => {
            const doc = {
                email: contact.value.email,
                github: contact.value.github,
                linkedin: contact.value.linkedin
            }
            await updateDoc(doc, props.id)

            if(!updateError.value) {
                console.log('contact me updated')
                router.push({ name: 'Home' })
            }
        }
        return { contact, error, updateError, isPending, handleSubmit }
    }
}
</script>

<style>

</style>