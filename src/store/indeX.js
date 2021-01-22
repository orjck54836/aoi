import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        categories:[],
      },
      mutations: {
        LOADING(state,status){
            state.isLoading = status;
        },
        PRODUCTS(state,payload){
            state.products = payload;
        },
        CATEGORIES(state,payload){
            const categories = new Set();
            payload.forEach((item) => {
            categories.add(item.category)
            })
            state.categories = Array.from(categories)
        },

      },
      actions: {
        updateLoading(context,status){
            context.commit('LOADING',status)
        },
        getProducts(context){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            context.commit('LOADING',true)
            axios.get(api).then((response) => {
            context.commit('PRODUCTS',response.data.products)
            context.commit('CATEGORIES',response.data.products)
            context.commit('LOADING',false)
            });
        },
    },
})