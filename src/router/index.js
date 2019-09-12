import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/login'
// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)
const Home = resolve => require(['@/components/home'], resolve)
import Son1 from '@/components/son1'
import Son1Xq from '@/components/Son1Xq'
import He from '@/components/he'
Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      // 下面这个meta是重点，这里面配置requireAuth 为true，就是说必须登录的才能访问
      meta : {
        requireAuth: true, 
      },
      component: Home
    },
    {
      path: '/son1',
      name: 'son1',
      component: Son1
    },
    {
      path: '/son1/:id',
      name: 'Son1Xq',
      component: Son1Xq
    },
    {
      path: '/he',
      name: 'he',
      component: He
    }
  ]
})

// // 访问之前，检查是否登陆了
// router.beforeEach((to, from, next) => {
//   if(to.path.startsWith('/login')) {
//     window.sessionStorage.removeItem('user');
//     next()
//   }else {
//     let token = window.sessionStorage.getItem('user');
//     if (!token) {
//       next({path: '/login'})
//     }else {
//       next()
//     }
//   }
// });

export default router
