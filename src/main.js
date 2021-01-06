// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap"


import router from './router'
Vue.use(VueAxios, axios)
import App from './App'
Vue.config.productionTip = false
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
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
        path:'/loging'
      })
    }
    })
  }else{
    next();
  }
  

})