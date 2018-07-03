// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './App';
import router from './router';

require('./mock'); // 此部分引入的是我们所编写的mockjs文档

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Vuex);
Vue.use(ElementUI);

Router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path !== 'login') {
    next({
      path: '/login'
    });
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // components: {
  //   App
  // },
  // template: '<App/>'
});
