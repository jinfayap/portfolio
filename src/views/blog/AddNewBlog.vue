<template>
  <h2 class = 'header'>New Blog Post</h2>
  <form class = 'addblog' @submit.prevent = 'handleSubmit'>
      <input type="text" placeholder = 'Title' required v-model = 'title'>
      <ckeditor :editor="editor" v-model="description" :config = editorConfig></ckeditor>
      <div class="ck ck-word-count">
        <div class="ck-word-count__words">Words: {{ wordsCount }} </div>
        <div class="ck-word-count__characters">Characters: {{ charsCount }} </div>
      </div>
      <input type="file" @change = 'handleChange'>
      <label>Press enter to enter a new tag:</label>
      <input type="text" placeholder= 'Tags' @keydown.enter.prevent = 'addTag(tag)' v-model = 'tag'>
      
      <div class = 'tag-box'>
          Current tags:
          <div v-for = 'tagname in tagList' :key = tagname >
            <span class = 'tagpill' @click = 'handleClick(tagname)'>{{tagname}}</span>
         </div>
      </div>
      
      <button v-if = '!isPending'>Submit</button>
      <button v-else disabled>Uploading</button>
  </form>
</template>

<script>
import { onMounted, ref, onUpdated} from 'vue'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import UploadAdapterPlugin from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
// import ImagePlugin from '@ckeditor/ckeditor5-image/src/image';
// import ImageCaptionPlugin from '@ckeditor/ckeditor5-image/src/imagecaption';
// import ImageStylePlugin from '@ckeditor/ckeditor5-image/src/imagestyle';
// import ImageToolbarPlugin from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import ImageUploadPlugin from '@ckeditor/ckeditor5-image/src/imageupload';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
// Style of the working
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import StrikeThroughPlugin from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import CodePlugin from '@ckeditor/ckeditor5-basic-styles/src/code';
import BlockQuotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CodeBlockPlugin from '@ckeditor/ckeditor5-code-block/src/codeblock'
// Bullet, List, Link, Table
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ListPlugin from '@ckeditor/ckeditor5-list/src/list';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';

// Header, Alignment
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import AlignmentPlugin from '@ckeditor/ckeditor5-alignment/src/alignment'
// import FontFamilyPlugin from '@ckeditor/ckeditor5-font/src/fontfamily'
import FontSizePlugin from '@ckeditor/ckeditor5-font/src/fontsize'
import WordCountPlugin from '@ckeditor/ckeditor5-word-count/src/wordcount'

// Composable
import useStorage from '@/composable/useStorage'
import useCollection from '@/composable/useCollection'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const editor = ClassicEditor
        const wordsCount = ref('')
        const charsCount = ref('')

        const router = useRouter()

        const { uploadImage, url, filePath } = useStorage('blogs')
        const { addDoc, error } = useCollection('blogs')

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const tag = ref('')
        const tagList = ref([])

        const fileType = ['image/jpeg', 'image/png']
        const isPending = ref(false)

        const customColorPalette = [
            {
                color: 'hsl(4, 90%, 58%)',
                label: 'Red'
            },
            {
                color: 'hsl(340, 82%, 52%)',
                label: 'Pink'
            },
            {
                color: 'hsl(291, 64%, 42%)',
                label: 'Purple'
            },
            {
                color: 'hsl(262, 52%, 47%)',
                label: 'Deep Purple'
            },
            {
                color: 'hsl(231, 48%, 48%)',
                label: 'Indigo'
            },
            {
                color: 'hsl(207, 90%, 54%)',
                label: 'Blue'
            },
        ]

        const editorConfig = {
            plugins: [
                EssentialsPlugin,
                BoldPlugin,
                ItalicPlugin,
                StrikeThroughPlugin,
                BlockQuotePlugin,
                HeadingPlugin,
                // ImagePlugin,
                // ImageCaptionPlugin,
                // ImageStylePlugin,
                // ImageToolbarPlugin,
                // ImageUploadPlugin,
                LinkPlugin,
                ListPlugin,
                ParagraphPlugin,
                // UploadAdapterPlugin,
                CodePlugin,
                AlignmentPlugin,
                CodeBlockPlugin,
                // FontFamilyPlugin,
                FontSizePlugin,
                WordCountPlugin,
                Table,
                TableToolbar,
                TableProperties,
                TableCellProperties
            ],
            toolbar: [
                'heading',
                'bold',
                'italic',
                'strikethrough',
                'code',
                'link',
                // 'fontfamily',
                'alignment',
                'fontsize',
                'bulletedList',
                'numberedList',
                'insertTable',
                'blockQuote',
                'codeblock',
                'undo',
                'redo',
            ],
            wordCount: {
                onUpdate: stats => {
                // Prints the current content statistics.
                wordsCount.value = stats.words
                charsCount.value = stats.characters
                // console.log( `Characters: ${ stats.characters }\nWords: ${ stats.words }` );
                }
            },
            table: {
                contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
                tableProperties: {
                borderColors: customColorPalette,
                backgroundColors: customColorPalette
            },
                // Set the palettes for table cells.
                tableCellProperties: {
                    borderColors: customColorPalette,
                    backgroundColors: customColorPalette
                }
            }
        }

        const handleSubmit = async () => {
            isPending.value = true
            if (file.value) { 
                await uploadImage(file.value)
                const doc = {
                    title: title.value,
                    description: description.value,
                    tagList: tagList.value,
                    imageUrl: url.value,
                    filePath: filePath.value,
                    createdAt: timestamp()
                }
                await addDoc(doc)
            } else {
                 const doc = {
                    title: title.value,
                    description: description.value,
                    tagList: tagList.value,
                    filePath: null,
                    imageUrl: null,
                    createdAt: timestamp()
                }
                await addDoc(doc)
            }
            isPending.value = false

            if (!error.value) {
                console.log('Added a new blog Post')
                router.push({ name: 'Blog' })
            }
        }

        const addTag = (newTag) => {
            if(newTag.trim() && !tagList.value.includes(newTag)) {
                tagList.value.push(newTag)
            }
            tag.value = ''
        }

        const handleChange = (e) => {
            const selected = e.target.files[0]
            if (selected && fileType.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please choose an image file (jpg/png)'
            }
        }

        const handleClick = (currentTag) => {
            tagList.value = tagList.value.filter(tag => {
                return tag != currentTag
            })
        }

        return { title, description, tag, tagList, handleSubmit, handleChange, handleClick, addTag, 
                    isPending, editor, editorConfig, wordsCount, charsCount, error}
    }
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
.ck.ck-word-count {
    display: flex;
    justify-content: space-around;
}
.tag-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 20px;
    align-items: center;
}
.tagpill {
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 10px;
    padding: 10px;
    color: white;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 2px;
    background-color: rgb(64, 221, 221);
    border: 1px solid transparent;
    border-radius: 15px;
    cursor: pointer;
}
.tagpill:hover {
    background-color: var(--secondary)
}
</style>