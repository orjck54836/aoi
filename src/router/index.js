import Vue from 'vue'
import VueRouter from 'vue-router'
//官方元件

import Home from '@/components/HelloWorld';
import loging from '@/components/pages/loging';
import dashboard from '@/components/dashboard';
import products from '@/components/products';
Vue.use(VueRouter)
export default new VueRouter({
    routes:[
            {
                path:'*',
                redirect:'/loging'
            },
            {
                name:'首頁',//元件呈現的名稱
                path:'/index',   // 對應的虛擬路徑
                component:Home//對應的元件
            },
            {
                path:'/loging',
                name:'Loging',
                component:loging,
                meta: { requiresAuth: true }
            },
            {
                path:'/admin',
                name:'Dashboard',
                component:dashboard,
                children:[{
                    path:'/products',
                    name:'Products',
                    component:products,
                    meta: { requiresAuth: true }
                }]
            },
            
        ]
})