import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


const app = createApp(App)


library.add(fas, fab, far)

app
  .component('faIcon', FontAwesomeIcon)
  .use(
    Vue3Toastify,
    {
      autoClose: 3000,
      position: 'top-right',
      theme: 'auto',
      dangerouslyHTMLString: true,

      // ...
    } as ToastContainerOptions,
  )
  // .use(router)
  .mount('#app')
