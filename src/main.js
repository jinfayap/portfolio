import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// global css
import './assets/main.css'

// Import ckEditor globally
import CKEditor from '@ckeditor/ckeditor5-vue';

let app

// import projectAuth

import { projectAuth } from './firebase/config'

projectAuth.onAuthStateChanged( () => {
    if(!app) {
        app = createApp(App).use(router).use(CKEditor).mount('#app')
    }
})

