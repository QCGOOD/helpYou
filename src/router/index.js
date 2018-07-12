import Vue from 'vue';
import Router from 'vue-router';
import product from './product';
import news from './news';
import member from './member';
import base from './base';
import category from './category';


Vue.use(Router)

export default new Router({
  routes: [{
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: () =>
        import ('@/components/page/login/login'),
    },
    {
      path: '/main',
      component: () =>
        import ('@/components/page/main/index'),
      children: [
        // 会员
        ...member,
        
        // 资讯
        ...news,

        // 商城
        ...product,

        // 分类
        ...category,

        // 基础
        ...base,
      ]
    },
    // {
    //   name: '404',
    //   path: '/404notFound',
    //   component: () => import('@/components/notFound.vue'),
    // },
    {
      path: '*',
      redirect: '/login',
    },
  ]
})
