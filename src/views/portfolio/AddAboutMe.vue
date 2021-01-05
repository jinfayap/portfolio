<template>
  <form @submit.prevent = 'handleSubmit'>
      <label>About Me Information: </label>
      <textarea required v-model = 'description'></textarea>
      <label>About me Image</label>
      <input type="file" @change = handleChange>
      <button v-if = '!isPending'>Submit</button>
      <button v-else disabled>Uploading</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useCollection from '@/composable/useCollection.js'
import useStorage from '@/composable/useStorage'
import { useRouter } from 'vue-router'

export default {
    setup() {
        // import vue router
        const router = useRouter()

        const description = ref('')
        const {error, addDoc} = useCollection('aboutme')

        const file = ref(null)
        const fileType = ['image/jpeg', 'image/png']
        
        const {url, filePath, uploadImage} = useStorage('portfolio')

        const isPending = ref(false)

        const handleSubmit = async () => {       
            if (file.value) {
            isPending.value = true
            const res = await uploadImage(file.value)
            const doc = {
                description: description.value,
                url: url.value,
                filePath: filePath.value
            }
            await addDoc(doc)
            }
            isPending.value = false
            if(!error.value) {
                router.push({name: 'Home'})
            }
        }
       
        const handleChange = (e) => {
            const selected = e.target.files[0]
            // console.log(selected)
            if(selected && fileType.includes(selected.type)) {
                file.value = selected
            } else {
                file.value = null
            }
        }

        return { description, handleSubmit, handleChange, isPending }
    }
}
</script>

<style>

</style>