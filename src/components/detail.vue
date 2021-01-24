<template>
    <div class="row col-md-12">
        <div class="col-md-4">            
            <div style="height:20vw; background-size:contain;background-position: center;background-repeat:no-repeat;" :style="{backgroundImage:`url(${product.imageUrl})`}"></div>
        </div>
        <div class="col-md-8">
            <h3 class="text-center mb-4">{{product.title}}</h3>
            <h4 class="text-success ">この商品について</h4>
            <h6 class="col-md-10 mb-4">{{product.description}}</h6>
            <button @click.prevent="deCount">-</button>
            <input type="text" v-model="qty" readonly>
            <button @click.prevent="plCount">+</button>
            <button class="bg-primary mb-4" @click.prevent="addCart(product.id,qty)"><i class="fas fa-shopping-cart"></i>カートに入れる</button>
            <div class="text-success mb-3" v-if="moji">{{moji}}</div>
        </div>
    </div>
</template>

<script>
export default {
        data(){
        return{
            moji:'',
            product:{},
            cart:{},
            qty:1,       
        };
    },
    methods:{
        getCart(){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            this.$http.get(api).then((response) => {
            vm.cart = response.data.data;
            });
        },
        getProduct(id){
            const vm = this;
            id = this.$route.params.id;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            this.$http.get(api).then((response) => {                     
            vm.product = response.data.product;
            console.log('hhh',vm.product)
            });
        },
        addCart(id, qty) {
            const target = this.cart.carts.filter(items => items.product_id === id);
            if (target.length > 0) {
                const sameCartItem = target[0];
                const originQty = sameCartItem.qty;
                console.log('cc',originQty)
                const originCartId = sameCartItem.id;
                const originProductId = sameCartItem.product.id;
                const newQty = originQty + qty;
                this.$store.dispatch('updateProductQty', { originCartId, originProductId, newQty });
                this.moji = 'カートに入れました！'
            } else {
                this.$store.dispatch('addCart', { id, qty });
                this.moji = 'カートに入れました！'
            }
        },
      
        plCount(qty){
            const vm = this;
            vm.qty++;
            if(vm.qty>10){
                vm.qty = 10;
            }
        },
        deCount(qty){
            const vm = this;
            vm.product.qty--;
            if(vm.qty<1){
                vm.qty = 1;
            }
        },
    },
    created(){
    this.getProduct();
    this.getCart()
    },
}
</script>