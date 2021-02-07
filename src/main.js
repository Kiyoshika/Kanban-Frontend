import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import VueRouter from 'vue-router'
import vuetify from '@/plugins/vuetify'
import store from './store'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$username = ''

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/projectManager', component: App }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  vuetify,
  store,
  router,
  render: h => h(Home),
}).$mount('#app')
