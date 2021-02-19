import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoading: false,
        products: [],
        categories:[],
        totalQty: 0,
        itemId: '',
        cart: {
            carts: {}
        },
        addCartLoading: '',
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
        ADD_SAMEPRODUCT (state, payload) {
            state.totalQty = 0
            state.itemId = ''
            state.sameProduct = false
            state.cart.carts.filter(function (item) {
              if (item.product_id === payload.id) {
                state.itemId = item.id
                state.sameProduct = true
                state.totalQty = payload.qty + item.qty
              }
            })
        },
        GET_CART (state, payload) {
            state.cart = payload
        },
        GET_ADDCARTLOADING(state, payload) {
            state.addCartLoading = payload;
          },

      },
      actions: {
        updateLoading(context,status){
            context.commit('LOADING',status)
        },
        getProducts(context){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            context.commit('LOADING',true)
            axios.get(api).then((response) => {
            context.commit('PRODUCTS',response.data.products)
            context.commit('CATEGORIES',response.data.products)
            context.commit('LOADING',false)
            });
        },
        addCart(context, { id, qty }) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            context.commit('GET_ADDCARTLOADING', id);
            context.commit('LOADING', true);
            const cart = {
              product_id: id,
              qty: qty
            };
            axios.post(api, { data: cart }).then(response => {
              context.dispatch('getCart');
              context.commit('GET_ADDCARTLOADING', '');
              context.commit('LOADING', false);       
            });
        },
        getCart (context) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
            axios.get(api).then(response => {
              if (response.data.success) {
                context.commit('GET_CART', response.data.data)
              }
            })
        },
        updateProductQty(context, { originCartId, originProductId, newQty}) {
            context.commit('LOADING', true);
            const delAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${originCartId}`;
            const addAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const changeCart = {
                product_id: originProductId,
                qty: newQty,
            };
            axios
              .all([axios.delete(delAPI), axios.post(addAPI, { data: changeCart })])
              .then(axios.spread(() => {
                context.dispatch('getCart');
                context.commit('LOADING', false);
              }));
        },
    },
})