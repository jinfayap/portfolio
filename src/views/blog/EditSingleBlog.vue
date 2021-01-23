<template>
  <h2 class = 'header'>Edit Blog Post</h2>
  <form class = 'addblog' @submit.prevent = 'handleSubmit' v-if = 'blog'> 
      <input type="text" placeholder = 'Title' required v-model = 'blog.title'>
      <ckeditor :editor="editor" v-model="blog.description" :config = editorConfig></ckeditor>
      <div class="ck ck-word-count">
        <div class="ck-word-count__words">Words: {{ wordsCount }} </div>
        <div class="ck-word-count__characters">Characters: {{ charsCount }} </div>
      </div>
      <input type="file" @change = 'handleChange'>
      <label>Press enter to enter a new tag:</label>
      <input type="text" placeholder= 'Tags' @keydown.enter.prevent = 'addTag(tag)' v-model = 'tag'>
      
      <div class = 'tag-box'>
          Current tags:
          <div v-for = 'tagname in blog.tagList' :key = tagname >
            <span class = 'tagpill' @click = 'handleClick(tagname)'>{{tagname}}</span>
         </div>
      </div>
      
      <button v-if = '!isPending'>Submit</button>
      <button v-else disabled>Uploading</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composable/useStorage'
import useCollection from '@/composable/useCollection'
import getDocument from '@/composable/getDocument'
import { useRouter } from 'vue-router'
import ckEditConfig from '@/assets/ckEditConfig.js'

export default {
    props: [ 'id' ],
    setup(props) {
        const { editor, editorConfig, wordsCount, charsCount } = ckEditConfig()
        const { document: blog } = getDocument('blogs', props.id)
        const router = useRouter()

        const { uploadImage, url, filePath } = useStorage('blogs')
        const { updateDoc , error } = useCollection('blogs')

        const file = ref(null)
        const fileError = ref(null)
        const tag = ref('')
        const tagList = ref([])

        const fileType = ['image/jpeg', 'image/png']
        const isPending = ref(false)

        const handleSubmit = async () => {
            isPending.value = true
            if (file.value) { 
                await uploadImage(file.value)
                const doc = {
                    title: blog.value.title,
                    description: blog.value.description,
                    tagList: blog.value.tagList,
                    imageUrl: url.value,
                    filePath: filePath.value,
                }
                await updateDoc(doc, props.id)
            } else {
                 const doc = {
                    title: blog.value.title,
                    description: blog.value.description,
                    tagList: blog.value.tagList,
                }
                await updateDoc(doc, props.id)
            }
            isPending.value = false

            if (!error.value) {
                console.log('Completed editing blog Post')
                router.push({ name: 'Blog' })
            }
        }

        const addTag = (newTag) => {
            if(newTag.trim() && !blog.value.tagList.includes(newTag)) {
                blog.value.tagList.push(newTag)
            }
            tag.value = ''
        }

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

        const handleClick = (currentTag) => {
            blog.value.tagList = blog.value.tagList.filter(tag => {
                return tag != currentTag
            })
        }

        return { blog, tag, tagList, handleSubmit, handleChange, handleClick, addTag, 
                    isPending, editor, editorConfig, wordsCount, charsCount, error}
    }
}
</script>

<style>
</style>