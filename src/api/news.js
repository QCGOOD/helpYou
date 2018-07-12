import fetch from './config';

const news = {
  // 获取资讯列表
  getNewsPage(params) {
    return fetch.get('api/admin/v1/information/page', params)
  },
  // 查看资讯
  getNewsDetail(params) {
    return fetch.get('api/admin/v1/information/get', params)
  },
  // 发布资讯
  addNews(params) {
    return fetch.post('api/admin/v1/information/save', params)
  },
  // 更新资讯
  updateNews(params) {
    return fetch.post('api/admin/v1/information/update', params)
  },
  // 删除资讯
  deleteNews(params) {
    return fetch.post('api/admin/v1/information/delete', params)
  },
  // 下架资讯
  revokeNews(params) {
    return fetch.post('api/admin/v1/information/unaudit', params)
  },
  // 审核通过
  authorizeNews(params) {
    return fetch.post('api/admin/v1/information/audit', params)
  },
}

export default news
