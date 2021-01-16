<template>
   <form @submit.prevent = 'handleSubmit' id = 'reset'>
          <input type="text" placeholder = 'Project title' required v-model = 'title'>
          <textarea placeholder = 'Description' required v-model = 'description'></textarea>
          <textarea placeholder = 'Additional info' required v-model = 'additionalInfo'></textarea>
          <textarea placeholder = 'Contributions' required v-model = 'contribution'></textarea>
          <input type="url" placeholder = 'Web Url' v-model = 'webUrl'>
          <label>Project image:</label>
          <input type="file" @change = 'handleChange' id = 'hi'>
          <div class = 'status'>
            <label>Status of Project: </label>
            <select v-model = 'status' required>
                <option value="" selected disabled hidden></option>
                <option value="kicking off" default>Kicking off</option>
                <option value="ongoing" >Ongoing</option>
                <option value="completed" >Completed</option>
            </select>
          </div>

          <div class = 'error' v-if = 'fileError'> {{ fileError }}</div>
          <div class="error" v-if = 'error'>{{ error }}</div>
          <div v-if = '!isPending'>
              <button>Submit</button>
          </div>
          <div v-else>
              <button disabled>Saving Work...</button>
          </div>
    
     </form>
</template>

<script>
import { ref } from 'vue'
import useCollection from '@/composable/useCollection'
import useStorage from '@/composable/useStorage'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const additionalInfo = ref('')
        const webUrl = ref('')
        const contribution = ref('')
        const status = ref('')
        
        const file = ref(null)
        const fileType = ['image/jpeg', 'image/png']
        const fileError = ref(null)

        const { error, addDoc } = useCollection('latestwork')
        const { uploadImage, url, filePath } = useStorage('portfolio', 'latestwork')

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
                await uploadImage(file.value)
            
                const doc = {
                    title: title.value,
                    description: description.value,
                    additionalInfo: additionalInfo.value,
                    webUrl: webUrl.value,
                    contribution: contribution.value,
                    filePath: filePath.value,
                    imageUrl: url.value,
                    status: status.value,
                    createdAt: timestamp()
                }
                await addDoc(doc)
                if(!error.value) {
                    console.log('Added a new work')
                    title.value = ''
                    description.value = ''
                    additionalInfo.value = ''
                    webUrl.value = ''
                    contribution.value = ''
                    status.value = ''
                    file.value = null
                }
            }
            isPending.value = false
            router.push({ name: 'Home' })
        }
        
        return { title, description, additionalInfo, webUrl, contribution, status, error, isPending, fileError, handleSubmit, handleChange }
    }
}
</script>

<style>
</style>