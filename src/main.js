// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import qs from "qs";
import util from './assets/js/util'
import base from './assets/js/base'
import './assets/styles/element-variables.scss'
// if (base.transferMember) {
//   require('./assets/styles/element-variables.scss')
// } else {
//   require('./assets/styles/element-variables1.scss')
// }

Vue.use(ElementUI)

Vue.prototype.imgHost = 'http://helpyou-1255600302.cosgz.myqcloud.com/'
Vue.prototype.localhost = process.env.NODE_ENV === 'production' ? base.baseHost + base.projectName() : base.projectName()

Vue.prototype.util = util
Vue.prototype.base = base
Vue.prototype.qs = qs

Vue.filter('price', value => {
  if (value === '') return ''
  return (value / 100).toFixed(2)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default vue