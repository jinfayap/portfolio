<template>
  <div></div>
  <div class = 'blog-box'>
      <div class="blog-content">
          <!-- a single blog component -->
          <div v-if = 'blogs' class = 'blog-container'>
              <div v-for = 'blog in blogs' :key = 'blog.id' class = 'blog-container'>
                  <SingleBlog :blog = blog />
              </div>
          </div>
      </div>
      <div class="blog-sidebar">
          <!-- Add a blog button here -->
          <div>
            <router-link :to = "{ name: 'AddNewBlog' }" v-if = 'ownership'>
                <button>New Blog</button>
            </router-link>             
          </div>
          <!-- Cloud tag -->
          <TagCloud :blogs = blogs />
      </div>
  </div>
</template>

<script>
import getCollection from '@/composable/getCollection'
import SingleBlog from '@/components/blog/SingleBlog.vue'
import TagCloud from '@/components/blog/TagCloud.vue'
import { computed } from 'vue'
import getUser from '@/composable/getUser'

export default {
    components: { SingleBlog, TagCloud },
    setup() {
        const { documents:blogs, error } = getCollection('blogs')

        const { user } = getUser()

        const ownership = computed(() => {
            return blogs && user.value
        }) 
        
        return { blogs, error, ownership }
    }
}
</script>

<style>
.blog-box {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 10px;
}
.blog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.blog-sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.blog-container {
    width: 100%;
}
</style>