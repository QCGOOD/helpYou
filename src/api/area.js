import fetch from './config';

const area = {
  // 获取国家列表包含城市
  getAreaList(params) {
    return fetch.get('api/admin/v1/area/listWithChild', params)
  },
  // 根据类型获取国家或城市
  getTypeAreaList(params) {
    return fetch.get('api/admin/v1/area/listByType', params)
  },
  // 根据国家获取省市
  getAreaCityList(params) {
    return fetch.get('api/admin/v1/area/listByParentId', params)
  },
  // 根据地区查详情
  getAreaDetail(params) {
    return fetch.get('api/admin/v1/area/get', params)
  },
  // 删除地区
  deleteArea(params) {
    return fetch.post('api/admin/v1/area/delete', params)
  },
  // 添加国家或城市
  addAreaList(params) {
    return fetch.post('api/admin/v1/area/insert', params)
  },
  // 修改国家或城市
  upDateAreaList(params) {
    return fetch.post('api/admin/v1/area/update', params)
  },
}

export default area
