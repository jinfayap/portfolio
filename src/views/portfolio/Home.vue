<template>
  <div class="home">
    <About />
    <Skills />
    <LatestWork />
    <Certificates />
    <ContactMe />
    <Footer />
  </div>
</template>

<script>
import About from '@/components/About.vue'
import Skills from '@/components/Skills.vue'
import LatestWork from '@/components/LatestWork.vue'
import Certificates from '@/components/Certificates.vue'
import ContactMe from '@/components/ContactMe.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: { About, Skills, LatestWork, Certificates, ContactMe, Footer }
}
</script>
