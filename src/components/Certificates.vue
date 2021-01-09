<template>
  <div class="section blackbg">
      <h3 class = 'header'>Certificates of Completion</h3>
      <div class="cert" v-if = 'certificates'>
          <div v-for = 'certificate in certificates' :key = 'certificate.id'>
              <Certificate :certificate = certificate />
          </div>
      </div>
      <router-link :to = "{ name: 'AddCertificate' }">
            <button>Add new Certificate</button>
      </router-link>

  </div>
</template>

<script>
import getNRTCollection from '@/composable/getNRTCollection'
import Certificate from './Certificate.vue'

export default {
    components: { Certificate },
    setup() {
        const { documents:certificates, error } = getNRTCollection('certificates')

        return { certificates, error }
    }
}
</script>

<style scoped>
.cert {
    color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
}
button {
    display: block;
    margin: 0 auto;
}
</style>