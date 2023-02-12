import Vue from 'vue'
import App from './App.vue'
import {store} from './store/index'
import VueMask from 'v-mask'

import './assets/tailwind.css'

Vue.use(VueMask)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
