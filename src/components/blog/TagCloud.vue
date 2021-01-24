<template>
   <h3 v-if = 'compliedTags.length' class = 'header' >Tags:</h3>
  <div v-if = 'compliedTags.length' class = 'tag-cloud-box'>
    <div v-for = 'tag in compliedTags' :key = tag >
        <router-link :to = "{ name: 'TagView', params: {tag : tag}} ">
            <span>#{{ tag }} </span>
        </router-link>
        
    </div>
  </div>
  
</template>

<script>
import { ref, watchEffect} from 'vue'
import useTags from '@/composable/useTags'

export default {
    props: [ 'blogs'],
    setup(props, context) {
        const compliedTags = ref([])

        // Constantly checking for changes
        watchEffect(() => {
            if(props.blogs) {
                const { tags } = useTags(props.blogs)
                compliedTags.value = tags.value
            }
        })

        return { compliedTags }
    }
}
</script>

<style>
.tag-cloud-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.tag-cloud-box span {
    margin: 2.5;
    color: black;
    font-weight: 300;
    letter-spacing: 2px;
    display: inline-block;
    padding: 10px;
}
.tag-cloud-box a.router-link-active.router-link-exact-active span {
    color: orange;
}
</style>