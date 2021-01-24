<template>
    <div class = 'singleblog-box'>
        <router-link :to = "{ name: 'ViewBlogDetails', params: { id: blog.id }}" class = 'blog-link'>
            <h2 class = 'blog-title'> {{blog.title}} </h2>
        </router-link>
        
        <div class = 'blog-description' v-html = 'blog.description'></div>
        <div v-if = 'blog.imageUrl' class = 'blog-image-box'>
            <img :src="blog.imageUrl">
        </div>
      <div class = 'tag-box blog-tag-box'>
          <div v-for = 'tagname in blog.tagList' :key = tagname >
              <router-link :to = "{name: 'TagView', params: { tag: tagname } }">
                  <span class = 'tagpill'>{{tagname}}</span>
              </router-link>
         </div>
      </div>
      <div class = 'time-created'>
          Post created - {{ longAgo }} ago
      </div>
    </div>

</template>

<script>
import { formatDistanceToNow } from 'date-fns'
import { computed } from 'vue'
export default {
    props: [ 'blog' ],
    setup(props) {
        const longAgo = computed(() => {
            return formatDistanceToNow(new Date(props.blog.createdAt.seconds *1000))
        })

        return { longAgo }
    }
}
</script>

<style>
.singleblog-box {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 20px;
    align-items: center;
    border-radius: 10px;
    position: relative;
}
.blog-title {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
    font-size: 20px;
    margin-top: 5px;
}
.blog-image-box img {
    width: 100%;
    max-height: 180px;
    object-fit: cover;
}
.blog-description, 
.blog-image-box,
.blog-tag-box {
    padding: 20px;
    width: 100%;
}
.tag-box.blog-tag-box .tagpill {
    font-size: 12px;
    padding: 5px;
}
.tag-box.blog-tag-box .tagpill:hover {
    background-color: cyan;
}
.time-created {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 10px;
    font-weight: 400;
}
.blog-link a:visited,
.blog-link{
    color: black;
}
</style>