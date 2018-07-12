const news = [
  //商户管理
  {
    path: "merchant",
    component: () =>
      import ('@/components/page/product/merchant/list'),
  },
  //商品管理
  {
    path: "news/list",
    component: () =>
      import ('@/components/page/news/list/list'),
  },
  //商品详情
  {
    path: "news/list/detail",
    component: () =>
      import ('@/components/page/news/list/detail'),
  },
  // 品牌管理
  {
    path: "news/brand",
    component: () =>
      import ('@/components/page/news/brand/list'),
  },
  //商品分类
  {
    path: "news/category",
    component: () =>
      import ('@/components/page/news/category/list'),
  },
  //商品标签
  {
    path: "news/tag",
    component: () =>
      import ('@/components/page/news/tag/list'),
  },
  
  //订单管理
  {
    path: "news/order",
    component: () =>
      import ('@/components/page/news/order/list'),
  },
]

export default news
