<template>
    <div class="row col-md-12">
        <!-- Search bar -->
        <div>
            <form class="form-inline">
              <div class="input-group">
                <input class="form-control" type="text" v-model="searchText"
                  placeholder="タイトルで探す" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button"
                    @click="searchText = ''">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
        </div>
        <!-- Search bar end-->
        <div class="col-md-3  text-center justify-content-start" style="position: sticky;top: 40px;" >
            <h2 class="mt-4 mb-4">種類で探す</h2>
            <h4 @click.prevent="searchText = ''"
              :class="{ 'active': searchText === ''}">
              全部顯示</h4>
            <h4 v-for="(item,a) in categories" :key="item" @click.prevent="searchText = item" :class="{ 'active': item === searchText}">
                <span :class="beans[a]">
                    {{ item }}
                </span>
            </h4>
        </div>
        <div class="row col-md-9 justify-content-start" >
            <div class="col-md-4 mb-md-4 " v-for="(item) in filterData" :key="item.id" >
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
    </div>
</template>
<style scoped>
    .asai{
        background-image: url("./images/asai.gif");
        background-size: 40px;
        background-repeat: no-repeat;
        display: inline-block;
        width:10vw;
        height:3vw
    }
    .naka{
        background-image: url("./images/naka.gif");
        background-size: 40px;
        background-repeat: no-repeat;
        display: inline-block;
        width:10vw;
        height:3vw
    }
    .deep{
        background-image: url("./images/deep.gif");
        background-size: 40px;
        background-repeat: no-repeat;
        display: inline-block;
        width:10vw;
        height:3vw
    }
    .kigu{
        background-image: url("./images/kigu.gif");
        background-size: 50px;
        background-position: -5% 150%;
        background-repeat: no-repeat;
        display: inline-block;
        width:10vw;
        height:3vw
    }
</style>
<script>
export default {
        data(){
        return{
        product:{},
        isLoading: false,
        coupon_code:'',
        cart: {},
        searchText:'',
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
        },
        beans:[
            "deep",
            "asai",
            "naka",
            "kigu",
        ]
        };
    },
    methods:{
        getProducts(){
            this.$store.dispatch('getProducts')
        },
        getProduct(id){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            this.$http.post(api).then((response) => {                     
            vm.product = response.data.product;
            vm.$router.push(`/admin/customer_order/detail/${id}`)
            });
        },
        select(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/:category`;
            this.$http.get(api).then((response) => {
            console.log('value',response.data)
            });
        },
        getUnique(){
           const vm = this;
           vm.categories = new Set();
           vn.products.forEach((item) => {
               categories.add(item.category)
           })
           vm.categories = Array.form(category)
        },
    },
    computed: {
        filterData() {
            const vm = this;
            if (vm.searchText) {
                return vm.products.filter((item) => {
                const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
                return data;
                });
            }
            return this.products;
        },
        categories(){
            return this.$store.state.categories;
        },
        products(){
            return this.$store.state.products;
        }
    },
    created() {
    this.getProducts();
    this.getProducts();
    },
}
</script>