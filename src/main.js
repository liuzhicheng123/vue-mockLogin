// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Mock from './mock/index'
Mock.init()

import axios from 'axios'
Vue.prototype.$ajax = axios

/* eslint-disable no-new */

//自己写的样式
import './style/theme.css'
import './style/character.css'

Vue.use(ElementUI);

// 访问之前，检查是否登陆了
router.beforeEach((to, from, next) => {
  if(to.path.startsWith('/login')) {
    // window.sessionStorage.removeItem('user');
    next()
  }else {
    let token = window.sessionStorage.getItem('user');
    if (!token) {
      next({path: '/login'})
    }else {
      next()
    }
  }
});

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
