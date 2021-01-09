<template>
    <form @submit.prevent = 'handleSubmit'>
        <input type="text" v-model = 'title' required placeholder = 'Title'>
        <input type="webUrl" v-model = 'webUrl' placeholder="Course Url">
        <input type="text" v-model = 'provider' placeholder = 'Certificate Provider'>
        <label>Certificate Image:</label>
        <input type="file" @change = 'handleChange' required>
        <div class = 'error' v-if = 'fileError'>{{ fileError }}</div>
        <div class = 'error' v-if = 'error'>{{ error }}</div>
        <button v-if = '!isPending '>Submit</button>
        <button v-else disabled>Uploading...</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useCollection from '@/composable/useCollection'
import useStorage from '@/composable/useStorage'

export default {
    setup() {

        const router = useRouter()

        const title = ref('')
        const webUrl = ref('')
        const provider = ref('')

        const file = ref(null)
        const fileType = ['image/jpeg', 'image/png']
        const fileError = ref(null)

        const { uploadImage, url, filePath } = useStorage('portfolio', 'certificates')
        const { addDoc, error } = useCollection('certificates')
        const isPending = ref(false)

        const handleChange = (e) => {
            const selected = e.target.files[0]
            if (selected && fileType.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please choose an image file (jpg/png)'
            }
        }
        const handleSubmit = async () => {
            if (file.value) {
                isPending.value = true
                await uploadImage(file.value)
                const doc = {
                    title: title.value,
                    webUrl: webUrl.value,
                    provider: provider.value,
                    imageUrl: url.value,
                    filePath: filePath.value
                }
                await addDoc(doc)
                isPending.value = false
            }

            if (!error.value) {
                console.log('Added a new certificate')
                router.push({ name: 'Home' })
            }
        }
        return { title, webUrl, provider, fileError, error, isPending, handleChange, handleSubmit}
    }

}
</script>

<style>

</style>