<template>
    <div class="container">
      <img src="./images/count.jpg" class="col-md-12">
        <div class="my-5 row justify-content-center">
            <div class="col-md-12">
                <table class="table">                
                <thead  v-if="cart.total > 0" >
                    <th></th>
                    <th>商品</th>
                    <th>數量</th>
                    <th>定價</th>
                </thead>
                <tbody  v-if="cart.total > 0" >
                    <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts" >
                        <td class="align-middle">
                            <button type="button" class="btn btn-outline-danger btn-sm" 
                            @click="removeCart(item.id)">
                            <i class="far fa-trash-alt" ></i>
                            </button>
                        </td>
                        <td class="align-middle">
                        {{ item.product.title }}
                            <div class="text-success" v-if="ty">
                            クーポンを使いました
                            </div>
                        </td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                        <td class="align-middle">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot  v-if="cart.total > 0" >
                    <tr>
                    <td colspan="3" class="text-right">総額</td>
                        <td class="text-right">{{ cart.total }}</td>
                        </tr>
                        <tr  v-if="cart.final_total !== cart.total">
                        <td colspan="3" class="text-right text-success" >折扣價</td>
                        <td class="text-right text-success">{{ Math.round(cart.final_total) }}</td>
                    </tr>
                </tfoot>
            </table>
                <router-link to="/admin/customer_order/setsume" v-if="cart.total == 0" class="kara">
                    <tr style="height:10vw">
                        Let's go to shop!
                    </tr>
                </router-link>
                <div class="input-group mb-3 input-group-sm"  v-if="cart.total > 0">
                    <input type="text" class="form-control" v-model="coupon_code">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="couponCreat">
                        クーポンを使う
                        </button>
                    </div>
                </div>
                <button class="btn btn-outline-danger" @click="removeAll"  v-if="cart.total > 0">カートを消す</button>
                <button class="btn btn-outline-secondary" v-if="cart.total > 0" @click="nextEmail">次へ</button>
            </div>
      </div>  
    </div>
</template>

<script>
import $ from 'jquery'


export default {
    data(){
        return{
        product:{},
        ty:false,
        isLoading: false,
        coupon_code:'',
        cart: {},
        aa:'',
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
            this.$store.dispatch('getProducts')
        },
        getProduct(id){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            const vm = this;
            this.$http.get(api).then((response) => {
            console.log('ll',response.data)                      
            vm.product = response.data.product;
            });
        },
        getCart(){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            this.$http.get(api).then((response) => {
            vm.cart = response.data.data;
            console.log('ff',vm.cart)
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
            console.log('ty',response)
            vm.ty = true;
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
        removeAll(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
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
                        vm.$router.push(`/admin/customer_checkout/${response.data.orderId}`)
                    }
                    // vm.getCart();
                });
                } else {
                console.log('欄位不完整');
                }
            });
        },
        nextEmail(){

                    vm.$router.push('/admin/email')
  
        }
    },
    computed: {
        categories(){
            return this.$store.state.categories;
        },
        products(){
            return this.$store.state.products;
        }
    },
    created() {
        this.getProduct();
        this.getProducts();
        this.getCart();
    },
}
</script>

<style>
</style>