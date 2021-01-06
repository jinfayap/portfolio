<template>
  <div class="home">
    <About />
    <Skills />
  </div>
</template>

<script>
import About from '@/components/About.vue'
import Skills from '@/components/Skills.vue'
export default {
  name: 'Home',
  components: { About, Skills }
}
</script>
