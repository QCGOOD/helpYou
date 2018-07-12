import fetch from './config';

import news from './news'
import product from './product'
import attachment from './attachment'
import area from './area'
import category from './category'
import logistCompany from './logistCompany'

export default {
  // 加速  accelerator
  //用户登录
  login(data) {
    return fetch.post('ajaxLogin', data);
  },
  // 用户退出
  logout() {
    return fetch.post('ajaxLogout')
  },
  // 修改密码
  password(model) {
    return fetch.put(`admin/users/password`, model);
  },
  // 所有表格数据 通过此接口 统一发放
  table(url, data) {
    return fetch.get(url, data);
  },

  // 图片上传
  upLoadImg(params) {
    return fetch.postImg('api/v1/attachments/images/tencent_cloud', params)
  },

  // 更新设置
  updateConfig(params) {
    return fetch.postJson('api/admin/v1/config/update', params)
  },
  // 获取设置
  getConfig(params) {
    return fetch.get('api/admin/v1/config/get', params)
  },

  // 获取敏感词
  getSensitiveWords(params) {
    return fetch.get('api/admin/v1/sensitiveWord/page', params)
  },

  // 地区
  ...news,

  // 地区
  ...area,

  // 分类
  ...category,
  
  // 商城
  ...product,

  // 图片
  ...attachment,

  // 物流公司
  ...logistCompany,
}
