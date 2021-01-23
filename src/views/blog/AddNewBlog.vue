<template>
  <form class = 'addblog'>
      <input type="text" placeholder = 'Title' required>
      <ckeditor :editor="editor" v-model="editorData"></ckeditor>
      <div v-html = 'editorData'></div>
  </form>
</template>

<script>
import { onMounted, ref, onUpdated} from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    data() {
            return {
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>'
            };
    }
    // setup() {
    //     const editor = ClassicEditor
    //     onMounted(() => {
    //         ClassicEditor
    //         .create( document.querySelector( '#editor' ), {
    //             toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],

    //         } )
    //         .then( editor => {
    //             console.log( editor );
    //         } )
    //         .catch( error => {
    //             console.error( error );
    //         } );
    //     })
    //     const description = ref('')

    //     onUpdated(() => {
    //         console.log(description)
    //     })
    //     return { description, editor }
    // }
}
</script>

<style>
.addblog{
    max-width: 1000px;
}
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred,
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-focused {
    padding-left: 30px;
}
</style>