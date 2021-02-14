// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap"
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate'
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
import AOS from 'aos'
import Vuex from 'vuex'
import 'aos/dist/aos.css'
import store from '../src/store/indeX'

import currencyFilter from './filters/currency'
//下方載入中文語系
VeeValidate.Validator.localize('zh_TW', zhTWValidate);
import './bus'
import router from './router'
Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
import App from './App'
Vue.config.productionTip = false
Vue.component('Loading',Loading)
Vue.use(Vuex)
Vue.filter('currency',currencyFilter)
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  created () {
    AOS.init()
  },
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`
    // const api = 'https://vue-course-api.hexschool.io/api/orjck54836/products';
    axios.post(api).then((response) => {
    console.log(response.data)
    if(response.data.success){
      next()
    }else{
      next({
        path:'/admin'
      })
    }
    })
  }else{
    next();
  }
  

})