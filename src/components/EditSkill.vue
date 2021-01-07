<template>
<div class = 'center-box'>
      <form @submit.prevent = 'handleSubmit' class = 'center'>
      <div v-if = 'document'>
        <input type="text" placeholder = 'Technical skills'  v-model = 'document.skill' required>
        <input type="number" placeholder = 'Proficiency % (input numbers only)' min = '0' max = '100' v-model = 'document.proficiency' required>
        <div class="error" v-if = 'error'>{{ error }}</div>
        <div v-if = '!isPending'>
            <button>Submit</button>
        </div>
        <div v-else>
                <button disabled>Saving...</button>
        </div>         
      </div>
      
  </form>
</div>

</template>

<script>
import { ref } from 'vue' 
import getDocument from '@/composable/getDocument'
import useCollection from '@/composable/useCollection'

export default {
    props: [ 'id' ],
    setup(props, context) {

        const { document, error } = getDocument('skills', props.id)
        const { updateDoc, isPending } = useCollection('skills')

        const handleSubmit = async() => {
            const doc = {
                skill: document.value.skill,
                proficiency: document.value.proficiency 
            }
            await updateDoc(doc, props.id)
            context.emit('close')
        }

        return { isPending, error, handleSubmit, document }
    }
}
</script>

<style>
.center-box {
    width: 100%;
    height:100%;
    position: relative;
}
.center {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    width: 100%;
}
</style>