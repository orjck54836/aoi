import axios from 'axios';

export default{
    namespaced:true,
    state: {
        products: [],
        categories:[],
      },
      mutations: {
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
        getProducts(context){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            axios.get(api).then((response) => {
            context.commit('PRODUCTS',response.data.products)
            context.commit('CATEGORIES',response.data.products)

            });
        },  
    },
    getters:{
      products(state){
        return state.products
      },
      categories(state){
        return state.categories
      },
    }
}