<template>
  <div></div>
  <div class = 'blog-box'>
      <div class="blog-content">
          blog content
          <!-- a single blog component -->
      </div>
      <div class="blog-sidebar">
          blog sidebar
          <!-- Add a blog button here -->
          <router-link to = '#'>
              <button>Add a new Blog Post</button>
          </router-link>
          <!-- Cloud tag -->
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.blog-box {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 10px;
}
.blog-content {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center
}
.blog-sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid red;
}
</style>