import Vue from 'vue';
import Router from 'vue-router';
import homePage from '@/components/homePage';
import particulars from '@/components/details/particulars';
import classifyDetail from '@/components/classify/classifyDetail';
import ShopSearch from '@/components/details/ShopSearch';
import productSearch from '@/components/details/productSearch';
Vue.use(Router);

export default new Router({
  // mode : 'history',
  base :  '/dist/',
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage
    },
    {
      path:'/particulars',
      component:particulars
    },
    {
      path:'/classifyDetail',
      component:classifyDetail
    },
    {
      path:'/ShopSearch',
      component:ShopSearch,
    },
    {
      path:'/productSearch',
      component:productSearch
    }
  ]
})
