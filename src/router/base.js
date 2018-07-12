const base = [
  // 图片管理
  {
    path: "attachment",
    component: () =>
      import ('@/components/page/attachment/list'),
  },
  // 国家管理
  {
    path: "countryAndCity/country",
    component: () =>
      import ('@/components/page/countryAndCity/countrylist'),
  },
  // 城市管理
  {
    path: "countryAndCity/city",
    component: () =>
      import ('@/components/page/countryAndCity/citylist'),
  },
  // 分值管理
  {
    path: "score",
    component: () =>
      import ('@/components/page/score/form'),
  },
  // 敏感词管理
  {
    path: "sensitiveWords",
    component: () =>
      import ('@/components/page/sensitiveWords/list'),
  },
  // 物流
  {
    path: "logistCompany",
    component: () =>
      import ('@/components/page/logistCompany/list'),
  },
  // 投诉
  {
    path: "complaint",
    component: () =>
      import ('@/components/page/complaint/list'),
  },
  // 购买意向列表
  {
    path: "purchaseIntention",
    component: () =>
      import ('@/components/page/purchaseIntention/list'),
  },
];

export default base;
