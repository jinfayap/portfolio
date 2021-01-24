<template>
  <div class = 'tagview'>
    <div v-if = 'blogs'>
        <div v-for = 'blog in blogs' :key = blog.id>
            <SingleBlog :blog = blog />
        </div>
    </div>
    <div v-if = 'blogs'>
        <TagCloud :blogs = blogs />
    </div>
  </div>
</template>

<script>
import getCollection from '@/composable/getCollection'
import SingleBlog from '@/components/blog/SingleBlog.vue'
import TagCloud from '@/components/blog/TagCloud.vue'
import { useRoute, useRouter } from 'vue-router'
import { watch, computed, watchEffect } from 'vue'
export default {
    components: { SingleBlog, TagCloud },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const currentParam = computed(() => {
            return route.params.tag
        })
        const { documents:blogs } = getCollection('blogs', ['tagList', 'array-contains', route.params.tag])

        watch((currentParam), (oldTag, newTag) => {
            // console.log(newTag, oldTag)
            location.reload()
        }) 

        return { blogs }
    }
}
</script>

<style>
.tagview {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 10px;
}
</style>