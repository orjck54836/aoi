<template>
    <div class="row col-md-9">
        <div v-for="item in products" :key="item.id">
            <div style="height:20vw; background-size:cover;background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}" ></div>
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
            vm.isLoading = false
            vm.products = response.data.products;
            console.log(vm.products)
        });
        },
        getProduct(id){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            const vm = this;
            vm.status.loadingItem = id
            this.$http.get(api).then((response) => {                    
            vm.product = response.data.product;
            $('#productModal').modal('show')
            vm.status.loadingItem = ''
            });
        },
    },
    created() {
    this.getProducts();
    },
}
</script>