<template>
  <div class="section blackbg">
      <h3 class = 'header'>Certificates of Completion</h3>
      <div class="cert" v-if = 'certificates'>
          <div v-for = 'certificate in certificates' :key = 'certificate.id'>
              <Certificate :certificate = certificate />
          </div>
      </div>
      <router-link :to = "{ name: 'AddCertificate' }" v-if = 'ownership'>
            <button>Add new Certificate</button>
      </router-link>

  </div>
</template>

<script>
import { ref, computed } from 'vue'
import getNRTCollection from '@/composable/getNRTCollection'
import Certificate from './Certificate.vue'
import getUser from '@/composable/getUser'

export default {
    components: { Certificate },
    setup() {
        const { user } = getUser()

        const { documents:certificates, error } = getNRTCollection('certificates')

        const ownership = computed(() => {
            return certificates && user.value
        }) 

        return { certificates, error, ownership }
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