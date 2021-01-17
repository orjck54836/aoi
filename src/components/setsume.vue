<template>
    <div class="row col-md-9" >
        <div class="col-md-4 mb-md-4" v-for="item in products" :key="item.id" >
            <div class="card border-0 shadow-sm">
                <div style="height: 20vw; background-size: cover; background-position: center" 
                    :style="{backgroundImage: `url(${item.imageUrl})`}">
                </div>
                <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                    <h5 class="card-title">
                    <a href="#" class="text-dark">{{ item.title }}</a>
                    </h5>
                    <p class="card-text">{{ item.content }}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="!item.price">{{ item.origin_price }}円</div>
                    <div class="h6" v-if="item.price">原價 {{ item.origin_price }}円</div>
                    <div class="h6" v-if="item.price">今なら {{ item.price }}円！</div>
                    </div>
                </div>
                <button type="button" class="btn btn-outline-secondary btn-sm"
                @click="getProduct(item.id)">
                詳しく見る
                </button>
            </div>
        </div>
    </div>
</template>
<script>
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
            this.$http.get(api).then((response) => {                     
            vm.product = response.data.product;
            vm.$router.push('/admin/customer_order/detail')
            });
        },
    },
    created() {
    this.getProducts();
    },
}
</script>