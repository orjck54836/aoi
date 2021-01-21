import Vue from 'vue'
import VueRouter from 'vue-router'
//官方元件

//頁面
import customerOut from '@/components/customerCheckout';
import customer from '@/components/customerOrder';
import dashboard from '@/components/dashboard';
import products from '@/components/products';
import coupon from '@/components/coupon';
import Orders from '@/components/order';
import main from '@/components/main';
import index from '@/components/index';
import coffee from '@/components/coffee';
import count from '@/components/count';
import baking from '@/components/baking';
import setsume from '@/components/setsume';
import detail from '@/components/detail';
Vue.use(VueRouter)
export default new VueRouter({
    routes:[
            {
                path:'*',
                redirect:'/loging'
            },
            {
                path:'/admin',//元件呈現的名稱
                name:'index',// 對應的虛擬路徑
                component:index,//對應的元件
                children:[
                    {
                        path:'main',
                        name:'main',
                        component:main,
                    },
                    {
                        path:'customer_order',
                        name:'customerOrder',
                        component:customer,
                        children:[
                            {
                            path:'setsume',
                            name:'setsume',
                            component:setsume,
                            },
                            {
                                path:'detail/:id',
                                name:'detail',
                                component:detail,
                            },
                        ]
                    },
                    {
                        path:'coffee',
                        name:'coffee',
                        component:coffee,
                    },
                    {
                        path:'products',
                        name:'Products',
                        component:products,
                        meta: { requiresAuth: true }
                    },
                    {
                        path:'count',
                        name:'count',
                        component:count,
                        meta: { requiresAuth: true }
                    },
                    {
                        path:'baking',
                        name:'baking',
                        component:baking,
                    },
                ]
            },

            







            {
                path:'/adminn',
                name:'Dashboard',
                component:dashboard,
                meta: { requiresAuth: true },
                children:[

                    {
                        path: 'order',
                        name: 'Orders',
                        component: Orders,
                        meta: { requiresAuth: true },
                    },

                ],
            },
            {
                path:'/',
                name:'Dashboard',
                component:dashboard,
                children:[{
                    path:'customer_order',
                    name:'customerOrder',
                    component:customer,
                },
                {
                    path:'customer_checkout/:orderId',
                    name:'customercheckout',
                    component:customerOut,
                },         
                ]
            },
            {
                path:'/',
                name:'Dashboard',
                component:dashboard,
                children:[{
                    path:'coupon',
                    name:'coupon',
                    component:coupon,
                }]
            },
            
        ]
})