import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import '@fontsource/gloock/latin-400.css'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/dm-sans/latin-600.css'
import './style.css'

const initialLang = location.pathname.startsWith('/en') ? 'en' : 'pt'
const hasPrerenderedContent = document.querySelector('#app h1') !== null
const create = hasPrerenderedContent ? createSSRApp : createApp
create(App, { initialLang }).mount('#app')
