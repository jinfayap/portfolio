<template>
   <form @submit.prevent = 'handleSubmit' v-if = 'work'>
          <input type="text" placeholder = 'Project title' required v-model = 'work.title'>
          <textarea placeholder = 'Description' required v-model = 'work.description'></textarea>
          <textarea placeholder = 'Additional info' required v-model = 'work.additionalInfo'></textarea>
          <textarea placeholder = 'Contributions' required v-model = 'work.contribution'></textarea>
          <input type="url" placeholder = 'Web Url' v-model = 'work.webUrl'>
          <label>Work image currently used: </label>
          <img :src="work.imageUrl">
          <label>Project image:</label>
          <input type="file" @change = 'handleChange'>
          <div class = 'status'>
            <label>Status of Project: </label>
            <select v-model = 'work.status' required>
                <option value="" selected disabled hidden></option>
                <option value="kicking off" default>Kicking off</option>
                <option value="ongoing" >Ongoing</option>
                <option value="completed" >Completed</option>
            </select>
          </div>
          <div class = 'error' v-if = 'fileError'> {{ fileError }}</div>
          <div class="error" v-if = 'error'>{{ error }}</div>
          <div v-if = '!isPending'>
              <button>Finish Editing</button>
          </div>
          <div v-else>
              <button disabled>Saving Work...</button>
          </div>
    
     </form>
</template>

<script>
import { ref } from 'vue'
import useCollection from '@/composable/useCollection'
import getDocument from '@/composable/getDocument'
import useStorage from '@/composable/useStorage'
import { useRouter } from 'vue-router'

export default {
    props: [ 'id' ],
    setup(props) {
        const router = useRouter()

        const { document:work } = getDocument('latestwork', props.id)

        const file = ref(null)
        const fileType = ['image/jpeg', 'image/png']
        const fileError = ref(null)

        const { error, updateDoc } = useCollection('latestwork')
        const { uploadImage, deleteImage, url, filePath } = useStorage('portfolio')

        const isPending = ref(false)

        const handleChange = (e) => {
            console.log(e)
            const selected = e.target.files[0]
            if (selected && fileType.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select only image file (jpeg/png)'
                console.log(e)
            }
        }

        const handleSubmit = async () => {
            if(file.value) {
                isPending.value = true
                await deleteImage(work.value.filePath)
                await uploadImage(file.value)
            
                const doc = {
                    title: work.value.title,
                    description: work.value.description,
                    additionalInfo: work.value.additionalInfo,
                    webUrl: work.value.webUrl,
                    contribution: work.value.contribution,
                    filePath: filePath.value,
                    imageUrl: url.value,
                    status: work.value.status
                }
                await updateDoc(doc, props.id)
            } else {
                isPending.value = true
                const doc = {
                    title: work.value.title,
                    description: work.value.description,
                    additionalInfo: work.value.additionalInfo,
                    webUrl: work.value.webUrl,
                    contribution: work.value.contribution,
                    status: work.value.status
                }
                await updateDoc(doc, props.id)
            }
            isPending.value = false
            if(!error.value) {
                console.log('work updated')
                router.push({ name: 'Home' })
            }
        }
        
        return { work, error, isPending, fileError, handleSubmit, handleChange }
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