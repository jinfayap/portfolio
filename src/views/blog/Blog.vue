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
          blog sidebar
          <!-- Add a blog button here -->
          <router-link :to = "{ name: 'AddNewBlog' }">
              <button>Add a new Blog Post</button>
          </router-link>
          <!-- Cloud tag -->
      </div>
  </div>
</template>

<script>
import getCollection from '@/composable/getCollection'
import SingleBlog from '@/components/blog/SingleBlog.vue'

export default {
    components: { SingleBlog },
    setup() {
        const { documents:blogs, error } = getCollection('blogs')
        return { blogs, error }
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
    border: 1px solid red;
}
.blog-container {
    width: 100%;
}
</style>