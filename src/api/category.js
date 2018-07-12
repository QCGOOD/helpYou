import fetch from './config';

const category = {
  // 根据类型获取商品分类列表
  treeByTypeCategory(params) {
    return fetch.get('api/admin/v1/category/treeByType', params)
  },
  // 分类列表
  listCategory(params) {
    return fetch.get('api/admin/v1/category/list', params)
  },
  //添加分类
  addCategory(params) {
    return fetch.post('api/admin/v1/category/insert_product', params)
  },
  //更新分类
  updateCategory(params) {
    return fetch.post('api/admin/v1/category/edit', params)
  },
  //更新分类 --json
  updateCategoryJson(params) {
    return fetch.postJson('api/admin/v1/category/edit', params)
  },
  //查询分类
  getCategory(params) {
    return fetch.get('api/admin/v1/category/get', params)
  },
  //删除分类
  deleteCategory(params) {
    return fetch.post('api/admin/v1/category/delete', params)
  },
}

export default category
