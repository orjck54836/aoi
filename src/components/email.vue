<template>
    <div class="container">
        <div class="row">
        <div class="col-md-6 mt-4"> 
                <table class="table" style="border:0;">
                <thead  class="text-light">
                    <th></th>
                    <th>商品</th>
                    <th>數量</th>
                    <th>定價</th>
                </thead>
                <tbody style="background-color:white" class=" text-dark">
                    <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts" >
                        <td class="align-middle"></td>
                        <td class="align-middle">
                        {{ item.product.title }}
                            <div class="text-success" v-if="ty">
                            已套用優惠券
                            </div>
                        </td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                        <td class="align-middle">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot style="background-color:gray">
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
                </div>
                <form  class="col-md-6" @submit.prevent="createOrder">
                <div class="form-group">
                <label for="useremail">Email</label>
                <input type="email" class="form-control" name="email" id="useremail"
                    v-model="form.user.email" placeholder="Emailお入れください" v-validate="'required|email'" :class="{'is-invalid':errors.has('email')}">
                <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
                </div>
            
                <div class="form-group">
                <label for="username">名前</label>
                <input type="text" class="form-control" name="name" id="username"
                    v-model="form.user.name" placeholder="名前お入れください" v-validate="'required'" :class="{'is-invalid':errors.has('name')}">
                <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                </div>
            
                <div class="form-group">
                <label for="usertel">電話番号</label>
                <input type="tel" class="form-control" name="tel" id="usertel" v-model="form.user.tel" placeholder="電話番号お入れください"　:class="{'is-invalid':errors.has('tel')}"　v-validate="'required'">
                <span class="text-danger" v-if="errors.has('tel')">届け先お入れください</span>
                </div>
            
                <div class="form-group">
                <label for="useraddress">届け先</label>
                <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                    placeholder="届け先お入れください"　:class="{'is-invalid':errors.has('address')}"　v-validate="'required'">
                <span class="text-danger" v-if="errors.has('address')">届け先お入れください</span>
                </div>
            
                <div class="form-group">
                <label for="comment">コメント</label>
                <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                </div>
                <div class="text-right">
                <button class="btn btn-4">確認</button>
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
