import Vue from 'vue';
import Router from 'vue-router';

// 引入组件
// import HelloWorld from 'components/HelloWorld';

import login from 'page/login/login';
import home from 'page/home/home';
import notFound from 'page/error/404';
import menutab from 'page/menu1/menuTab';
import menutable from 'page/menu2/menuTable';
// import VueRouter from 'vue-router';

Vue.use(Router);

let routes = [{
  path: '/login',
  component: login,
  name: 'login',
  hidden: true
},
{
  path: '/404',
  component: notFound,
  name: 'notFound',
  hidden: true
},
{
  path: '/',
  component: 'home',
  name: '导航一',
  iconCls: 'el-icon-message', // 图标样式class
  children: [{
    path: '/menutab',
    component: menutab,
    name: 'Tab'
  }]
},
{
  path: '/',
  component: home,
  name: '导航二',
  iconCls: 'fa fa-id-card-o',
  children: [{
    path: '/menutable',
    component: menutable,
    name: 'Table'
  }]
}
];

let router = new Router({
  routes
});

export default router;

// export default new Router({
//   routes: [{
//     path: '/',
//     name: 'HelloWorld',
//     component: HelloWorld
//   }]
// });
