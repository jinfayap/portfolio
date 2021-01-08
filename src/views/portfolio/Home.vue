<template>
  <div class="home">
    <About />
    <Skills />
    <LatestWork />
  </div>
</template>

<script>
import About from '@/components/About.vue'
import Skills from '@/components/Skills.vue'
import LatestWork from '@/components/LatestWork.vue'

export default {
  name: 'Home',
  components: { About, Skills, LatestWork }
}
</script>
