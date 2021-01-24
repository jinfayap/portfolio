<template>
  tag cloud template
  <div v-if = 'compliedTags'>
    <div v-for = 'tag in compliedTags' :key = tag >
        <span># {{ tag }} </span>
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

</style>