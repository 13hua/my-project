// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import App from './App'
import router from './router'

require('./mock') // 此部分引入的是我们所编写的mockjs文档

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
