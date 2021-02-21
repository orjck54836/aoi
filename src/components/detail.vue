<template>
    <div class="row col-md-12" style="margin: 0;">
        <div class="col-md-4">            
            <div style="height:50vw; background-size:contain;background-position: center;background-repeat:no-repeat;" :style="{backgroundImage:`url(${product.imageUrl})`}"></div>
        </div>
        <div class="col-md-8 detail">
            <h3 class="text-left mb-4">{{product.title}}</h3>
            <h4 class="text-success ">この商品について</h4><hr style="width:100%"><br>
            <h6 class="col-md-10">{{product.description}}</h6><br>
            <h5 class="text-left ml-3" style="color:brown">今なら {{ product.price }}円！</h5>
            <hr style="width:100%"><br>
            <button @click.prevent="deCount">-</button>
            <input type="text" v-model="qty" readonly>
            <button @click.prevent="plCount">+</button>
            <button class="bg-secondary mt-4 rounded" @click.prevent="addCart(product.id,qty)"><i class="fas fa-shopping-cart"></i>カートに入れる</button>
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
                const originCartId = sameCartItem.id;
                const originProductId = sameCartItem.product.id;
                const newQty = originQty + qty;
                console.log('cc',target.length)
                this.$store.dispatch('updateProductQty', { originCartId, originProductId, newQty});
                this.moji = 'カートに入れました！'
                this.$bus.$emit('messsage:push','カートに入れました！','success')
            } else {
                this.$store.dispatch('addCart', { id, qty });
                this.moji = 'カートに入れました！'
                this.$bus.$emit('messsage:push','カートに入れました！','success')
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