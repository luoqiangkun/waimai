import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import ElementUI from 'element-ui'
Vue.use(ElementUI, { zIndex: 3000 })
import './assets/theme/index.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
import axios from 'axios'
Vue.prototype.$axios = axios
import './permission' // permission control

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
