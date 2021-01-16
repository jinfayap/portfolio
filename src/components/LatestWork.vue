<template>
    <div class = 'latestWork section'>
        <h3 class = 'header'>Latest Work</h3>
        <div v-if = 'error'>{{ error }}</div>
        <div v-if = 'works' class = 'allwork'>
            <div v-for = 'work in works' :key = work.id >
                <SingleWork :work = work />
            </div>
        </div>
        
        <router-link :to = "{ name: 'AddLatestWork' }" v-if = 'ownership'>
            <button>Add a Latest Work</button>
        </router-link>

    </div>
</template>

<script>
import { ref, computed } from 'vue'
import getNRTCollection from '@/composable/getNRTCollection'
import SingleWork from './SingleWork.vue'
import getUser from '@/composable/getUser'

export default {
    components: { SingleWork },
    setup() {      
        const { user } = getUser()

        const { documents:works, error } = getNRTCollection('latestwork')

        const ownership = computed(() => {
            return works && user.value
        }) 

        return { works, error, ownership }
    }
}
</script>

<style scoped>
.allwork {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
}
button {
    display: block;
    margin: 0 auto;
}
</style>