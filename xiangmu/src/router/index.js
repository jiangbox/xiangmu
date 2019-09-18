import Vue from 'vue'
import Router from 'vue-router'
// import Show from '@/components/Show'
// import Search from '@/components/Search'
// import Index from '@/components/Index'
// import Header from '@/components/Header'
// import Shop from '@/components/Search-shop.vue'
// import Login from '@/components/Login.vue'
// import Mine from '@/components/Mine.vue'
//  测试
import Cheackout from '@/components/Cheackout.vue'
// import UserInfo from '@/components/UserInfo.vue'
// import Upadress from '@/components/Upadress.vue'
// import Addadress from '@/components/Addadress.vue'

Vue.use(Router)


export default new Router({
  routes: [{
      path: '/',
      name: 'Index',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/Index')
    },
    {
      path: '/show',
      name: 'Show',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/Show')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/Search')
    },
    {
      path: '/header',
      name: 'Header',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/Header')
    },
    {
      path: '/shop',
      name: 'Search-shop',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/Search-shop')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/Login')
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/Mine')
    },
    {
      //测试
      path: '/cheack',
      name: 'Cheackout',
      component: Cheackout
    },
    {
      path: '/user',
      name: 'UserInfo',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/UserInfo')
    },
    {
      path: '/upad',
      name: 'Upadress',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/Upadress')
    },
    {
      path: '/add',
      name: 'Addadress',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/Addadress')
    },
    {
      path: '/addDetail',
      name: 'Search-adress',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/Search-adress')
    },
    {
      path: '/shoplist',
      name: 'Shoplist',
      component: () => import( /* webpackChunkName: 'home' */ '@/components/Shoplist')
    }
  ]
})
