<template>
    <div class="header">Single Blog Details</div>
  <div class = 'blog-details'>
      <div class="blog-details-content" v-if = 'blog'>
          <div class="blog-details-title header">
              {{ blog.title }}
          </div>
          <div class="blog-details-description" v-html = 'blog.description'></div>
          <div class="blog-details-image">
              <img :src="blog.imageUrl">
          </div>
          <div class="blog-details-tag">
              <div class = 'tag-box'>
            <div v-for = 'tagname in blog.tagList' :key = tagname >
                <span class = 'tagpill' @click = 'handleClick(tagname)'>{{tagname}}</span>
            </div>
      </div>
          </div>
      </div>
      <div class="blog-details control" v-if = 'ownership'>
          Controls:
          <router-link :to = "{ name: 'EditSingleBlog', params: { id: id} }">
              <button>Edit Blog</button>
          </router-link>
          <button @click = 'handleDelete'>Delete Blog</button>
      </div>
  </div>

</template>

<script>
import getDocument from '@/composable/getDocument'
import useCollection from '@/composable/useCollection'
import useStorage from '@/composable/useStorage'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import getUser from '@/composable/getUser'

export default {
    props: [ 'id' ],
    setup(props) {
        const { document:blog } = getDocument('blogs', props.id);
        const { deleteDoc, error: deleteError} = useCollection('blogs')
        const { deleteImage } = useStorage('blogs')
        
        const router = useRouter()
        const { user } = getUser()

        const ownership = computed(() => {
            return blog && user.value
        }) 
        
        const handleDelete = async() => {
            // console.log(blog.value.filePath)
            if (blog.value.filePath != null) {
                await deleteImage(blog.value.filePath)
            }
            await deleteDoc(props.id)
            if (!deleteError.value) {
                router.push({ name: 'Blog' })
            }
        }
        return { blog, handleDelete, ownership }
    }
}
</script>

<style>
.blog-details {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 10px;
}
.blog-details-content {
    border: 1px solid black;
    border-radius: 5px;
    padding: 20px;
}
.blog-details.control {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.blog-details-description {
    font-size: 20px;
    padding: 10px;
}
.blog-details-image img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
}
.blog-details-tag {
    margin-top: 20px;
}
</style>