// take in an array post
// create a new tag set
// add the tags of each post to the tag set
// return a single array of tags based on the set

import { ref } from 'vue'

const useTags = (posts) => {

    const tags = ref([])
    const tagSet = new Set()

    posts.forEach(item => {
        item.tagList.forEach(tag => {
            tagSet.add(tag)
        })
    })
    tags.value = [...tagSet]
    
    return { tags }
}

export default useTags