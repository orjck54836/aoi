<template>
  <div class="container-fluid cust">
    <loading :active.sync="isLoading"></loading>
    <router-view></router-view>
  </div>
</template>
<script>
import $ from 'jquery'


export default {
    data(){
        return{
        product:{},
        products: [],
        isLoading: false,
        coupon_code:'',
        cart: {},
        status:{
            loadingItem:'',
        },
        form:{
            user:{
                name:'',
                email:'',
                tel:'',
                address:'',
            }
        }
        };
    },
    methods:{
        getProducts(){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            const vm = this;
            vm.isLoading = true
            this.$http.get(api).then((response) => {
            console.log(response.data)
            vm.isLoading = false
            vm.products = response.data.products;
            });
        },
        getProduct(id){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            const vm = this;
            vm.status.loadingItem = id
            this.$http.get(api).then((response) => {
            console.log(response.data)                      
            vm.product = response.data.product;
            $('#productModal').modal('show')
            vm.status.loadingItem = ''
            });
        },
        addtoCart(id,qty = 1){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            vm.status.loadingItem = id;
            const cart = {
                product_id:id,
                qty,
            };
            this.$http.post(api,{data:cart}).then((response) => {
            console.log(response)                         
            vm.getCart()
            $('#productModal').modal('hide')
            });
        },
        getCart(){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            vm.isLoading = true
            this.$http.get(api).then((response) => {
            console.log(response.data)
            vm.cart = response.data.data
            vm.isLoading = false
            });
        },
        couponCreat(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            const coupon = {
                code: vm.coupon_code,
            };
            vm.isLoading = true
            this.$http.post(api,{ data: coupon }).then((response) => {  
            console.log(response)        
            vm.getCart();        
            vm.isLoading = false
            });
        },
        removeCart(id){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            vm.isLoading = true
            this.$http.delete(api).then((response) => {  
            console.log(response.message)        
            vm.isLoading = false;
            vm.getCart();
            });
        },
        createOrder() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const order = vm.form;
            this.$validator.validate().then((result) => {
                if (result) {
                this.$http.post(url, { data: order }).then((response) => {
                    console.log('訂單已建立', response);
                    if(response.data.success){
                        vm.$router.push(`/customer_checkout/${response.data.orderId}`)
                    }
                    // vm.getCart();
                });
                } else {
                console.log('欄位不完整');
                }
            });
        },

    },
    created() {
        this.getProducts();
        this.getCart();
        this.couponCreat()
    },
}
</script>