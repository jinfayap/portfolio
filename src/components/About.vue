<template>
  <div class= 'section'>
    <h3 class="header">About Me</h3>
    <p class="error">{{ error }}</p>

    <div v-if="documents">
      <div class="about" v-for="doc in documents" :key="doc.id">
        <div class="description">
        {{ doc.description }}
        </div>

        <div class="img">
          <img :src="doc.url" />
        </div>

        <div v-if="ownership">
          <router-link :to="{ name: 'EditAboutMe', params: {id: doc.id} }">
          <button>Edit About Me</button>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="!documents">
      <router-link :to="{ name: 'AddAboutMe' }">
        <button>Add About Me</button>
      </router-link>
    </div>
  </div>
  
</template>

<script>
import getNRTCollection from "@/composable/getNRTCollection";
import getUser from '@/composable/getUser'
import { computed } from 'vue';

export default {
  setup() {
    const { documents, error } = getNRTCollection("aboutme");
    const { user } = getUser()

    const ownership = computed( () => {
      return documents.value && user.value && documents.value[0].userId == user.value.uid
    })

    return { documents, error, ownership };
  },
};
</script>

<style>
.about {
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin: 20px 0;
  gap: 10px;
}
.img img {
  max-height: 200px;
  max-width: 200px;
}
</style>