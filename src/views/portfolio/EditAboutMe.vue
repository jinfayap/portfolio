<template>
  <div class="error" v-if="error">{{ error }}</div>
  <form v-if="document" @submit.prevent="handleSubmit">
      <label>About Me Information: </label>
      <textarea required v-model="document.description"></textarea>
      <label>Profile image currently used: </label>
      <img :src="document.url">
      <label>Change Profile Image by Uploading new image</label>
      <input type="file" @change="handleChange" />
      <button v-if="!isPending">Submit</button>
      <button v-else disabled>Uploading</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composable/useStorage";
import getDocument from "@/composable/getDocument";
import useCollection from '@/composable/useCollection'
import { useRouter } from "vue-router";

export default {
  props: ['id'],
  setup(props) {
    // import vue router
    const router = useRouter();

    const { error, document } = getDocument("aboutme", props.id)
    const { updateDoc } = useCollection('aboutme')

    const file = ref(null);
    const fileType = ["image/jpeg", "image/png"];

    const { url, filePath, uploadImage, deleteImage } = useStorage("portfolio")

    const isPending = ref(false);

    const handleSubmit = async () => {
        
      if (file.value) {
        isPending.value = true;
        await deleteImage(document.value.filePath)
        const res = await uploadImage(file.value)
        const doc = {
          description: document.value.description,
          url: url.value,
          filePath: filePath.value,
        }
        await updateDoc(doc, document.value.id);
      } else {
          isPending.value = true
          const doc = {
          description: document.value.description,
        }
        await updateDoc(doc, document.value.id);
      }
      isPending.value = false;
      if (!error.value) {
        router.push({ name: "Home" });
      }
    }

    const handleChange = (e) => {
      const selected = e.target.files[0];
    //   console.log(selected);
      if (selected && fileType.includes(selected.type)) {
        file.value = selected;
      } else {
        file.value = null;
      }
    }

    return { handleSubmit, handleChange, isPending, document, error }
  }
}
</script>

<style scoped>
img {
  max-height: 150px;
  max-width: 150px;
  display: block;
}
</style>