import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'

export function render(initialLang: 'pt' | 'en') {
  return renderToString(createSSRApp(App, { initialLang }))
}
