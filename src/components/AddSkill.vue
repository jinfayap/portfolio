<template>
   <form @submit.prevent = 'handleSubmit'>
          <input type="text" placeholder = 'Technical skills' required v-model = 'skill'>
          <input type="number" placeholder = 'Proficiency % (input numbers only)' min = '0' max = '100' required v-model = 'proficiency'>
          <div class="error" v-if = 'error'>{{ error }}</div>
          <div v-if = '!isPending'>
              <button>Submit</button>
          </div>
          <div v-else>
              <button disabled>Saving...</button>
          </div>
    
     </form>
</template>

<script>
import { ref } from 'vue'
import useCollection from '@/composable/useCollection'

export default {
    setup() {
        const skill = ref('')
        const proficiency = ref('')
        
        const { error, isPending, addDoc } = useCollection('skills')

        const handleSubmit = async () => {
            const doc = {
                skill: skill.value,
                proficiency: proficiency.value
            }
            await addDoc(doc)
            if(!error.value) {
                console.log('Added a new skill')
                skill.value = ''
                proficiency.value = ''
            }
        }
        
        return { skill, proficiency, error, isPending, handleSubmit }
    }
}
</script>

<style>

</style>