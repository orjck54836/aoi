<template>
    <div>
        <div class="my-5 row justify-content-center">
            <div class="col-md-6">
                <table class="table">
                <thead>
                    <th></th>
                    <th>商品</th>
                    <th>數量</th>
                    <th>定價</th>
                </thead>
                <tbody >
                    <tr  v-for="item in cart.carts" :key="item.id" v-if="cart.carts" >
                    <td class="align-middle">
                        <button type="button" class="btn btn-outline-danger btn-sm" 
                        @click="removeCart(item.id)">
                        <i class="far fa-trash-alt" ></i>
                        </button>
                    </td>
                    <td class="align-middle">
                    {{ item.product.title }}
                        <div class="text-success" v-if="item.coupon">
                        已套用優惠券
                        </div>
                    </td>
                    <td class="align-middle"><i class="far fa-plus-square" @click="plus(item.id,item.qty)"></i>{{ item.qty }}/{{ item.product.unit }}<i class="far fa-minus-square" @click="minus(item.id,item.qty)"></i></td>
                    <td class="align-middle">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td colspan="3" class="text-right">総額</td>
                    <td class="text-right">{{ cart.total }}</td>
                    </tr>
                    <tr  v-if="cart.final_total !== cart.total">
                    <td colspan="3" class="text-right text-success" >折扣價</td>
                    <td class="text-right text-success">{{ cart.final_total }}</td>
                    </tr>
                </tfoot>
                </table>
                <div class="input-group mb-3 input-group-sm">
                <input type="text" class="form-control" v-model="coupon_code">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="couponCreat">
                    套用優惠碼
                    </button>
                </div>
                </div>
            </div>
            </div>

        <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="createOrder">
            <div class="form-group">
            <label for="useremail">Email</label>
            <input type="email" class="form-control" name="email" id="useremail"
                v-model="form.user.email" placeholder="請輸入 Email" v-validate="'required|email'" :class="{'is-invalid':errors.has('email')}">
            <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
            </div>
        
            <div class="form-group">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" name="name" id="username"
                v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'" :class="{'is-invalid':errors.has('name')}">
            <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
            </div>
        
            <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
            </div>
        
            <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                placeholder="請輸入地址">
            <span class="text-danger">地址欄位不得留空</span>
            </div>
        
            <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
            </div>
        </form>
        </div>
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
            this.$http.get(api).then((response) => {
            console.log('ll',response.data)                      
            vm.product = response.data.product;
            });
        },
        getCart(){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
            vm.cart = response.data.data;
            console.log('hh',response.data.data)
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
        plus(id,qty){
            const vm = this;
            console.log(vm.cart.carts)
            qty--;
        },
        minus(id,qty){
            const vm = this;
            console.log(vm.cart.carts)
            qty--;
        }

    },
    created() {
        this.getProduct();
        this.getProducts();
        this.getCart();
        this.couponCreat()
    },
}
</script>

<style>
</style>