<template>
  <h2 class = 'header'>New Blog Post</h2>
  <form class = 'addblog' @submit.prevent = 'handleSubmit'>
      <input type="text" placeholder = 'Title' required v-model = 'title'>
      <ckeditor :editor="editor" v-model="description" :config = editorConfig></ckeditor>
      <div class="ck ck-word-count">
        <div class="ck-word-count__words">Words: {{ wordsCount }} </div>
        <div class="ck-word-count__characters">Characters: {{ charsCount }} </div>
      </div>
      <input type="file" @change = 'handleChange'>
      <label>Press enter to enter a new tag:</label>
      <input type="text" placeholder= 'Tags' @keydown.enter.prevent = 'addTag(tag)' v-model = 'tag'>
      
      <div class = 'tag-box'>
          Current tags:
          <div v-for = 'tagname in tagList' :key = tagname >
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
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'
import ckEditConfig from '@/assets/ckEditConfig.js'
import getUser from '@/composable/getUser'

export default {
    setup() {
        const { editor, editorConfig, wordsCount, charsCount } = ckEditConfig()
        const router = useRouter()

        const { user } = getUser()

        const { uploadImage, url, filePath } = useStorage('blogs')
        const { addDoc, error } = useCollection('blogs')

        const title = ref('')
        const description = ref('')
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
                    title: title.value,
                    description: description.value,
                    tagList: tagList.value,
                    imageUrl: url.value,
                    filePath: filePath.value,
                    createdAt: timestamp(),
                    userId: user.value.uid
                }
                await addDoc(doc)
            } else {
                 const doc = {
                    title: title.value,
                    description: description.value,
                    tagList: tagList.value,
                    filePath: null,
                    imageUrl: null,
                    createdAt: timestamp(),
                    userId: user.value.uid
                }
                await addDoc(doc)
            }
            isPending.value = false

            if (!error.value) {
                console.log('Added a new blog Post')
                router.push({ name: 'Blog' })
            }
        }

        const addTag = (newTag) => {
            if(newTag.trim() && !tagList.value.includes(newTag)) {
                tagList.value.push(newTag)
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
            tagList.value = tagList.value.filter(tag => {
                return tag != currentTag
            })
        }

        return { title, description, tag, tagList, handleSubmit, handleChange, handleClick, addTag, 
                    isPending, editor, editorConfig, wordsCount, charsCount, error}
    }
}
</script>

<style>
.addblog{
    max-width: 1000px;
}
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred,
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-focused {
    padding-left: 30px;
}
.ck.ck-word-count {
    display: flex;
    justify-content: space-around;
}
.tag-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 20px;
    align-items: center;
}
.tagpill {
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 10px;
    padding: 10px;
    color: white;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 2px;
    background-color: rgb(64, 221, 221);
    border: 1px solid transparent;
    border-radius: 15px;
    cursor: pointer;
}
.tagpill:hover {
    background-color: var(--secondary)
}
</style>