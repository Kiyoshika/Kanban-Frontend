import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import store from './store'
import axios from 'axios'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
