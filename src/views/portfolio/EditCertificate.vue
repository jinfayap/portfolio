<template>
    <form @submit.prevent = 'handleSubmit' v-if = 'certificate'>
        <input type="text" v-model = 'certificate.title' required placeholder = 'Title'>
        <input type="webUrl" v-model = 'certificate.webUrl' placeholder="Course Url">
        <input type="text" v-model = 'certificate.provider' placeholder = 'Certificate Provider'>
        <label>Current Certificate: </label>
        <img :src="certificate.imageUrl">
        <label>Certificate Image:</label>
        <input type="file" @change = 'handleChange'>
        <div class = 'error' v-if = 'fileError'>{{ fileError }}</div>
        <div class = 'error' v-if = 'error'>{{ error }}</div>
        <button v-if = '!isPending '>Finish Editing</button>
        <button v-else disabled>Uploading...</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useCollection from '@/composable/useCollection'
import getDocument from '@/composable/getDocument'
import useStorage from '@/composable/useStorage'

export default {
    props: [ 'id' ],
    setup(props) {
        const router = useRouter()
        const { document: certificate } = getDocument('certificates', props.id)

        const file = ref(null)
        const fileType = ['image/jpeg', 'image/png']
        const fileError = ref(null)

        const { uploadImage, deleteImage, url, filePath } = useStorage('portfolio', 'certificates')
        const { updateDoc , error } = useCollection('certificates')
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
            isPending.value = true
            if (file.value) {
                await deleteImage(certificate.value.filePath)
                await uploadImage(file.value)
                const doc = {
                    title: certificate.value.title,
                    webUrl: certificate.value.webUrl,
                    provider: certificate.value.provider,
                    imageUrl: url.value,
                    filePath: filePath.value
                }
                await updateDoc(doc, props.id)
            } else {
                const doc = {
                    title: certificate.value.title,
                    webUrl: certificate.value.webUrl,
                    provider: certificate.value.provider,
                }
                await updateDoc(doc, props.id)
            }
            isPending.value = false

            if (!error.value) {
                console.log('Updated Certificate')
                router.push({ name: 'Home' })
            }
        }
        return { certificate, fileError, error, isPending, handleChange, handleSubmit}
    }

}
</script>

<style scoped>
img {
  max-height: 150px;
  max-width: 150px;
  display: block;
}
</style>