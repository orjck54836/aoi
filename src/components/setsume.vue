
<template>
    <div class="row col-md-12" style="margin: auto">
        <!-- Search bar -->
        <div>
            <form class="form-inline col-md-3 ml-4 search">
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
        <div class="col-md-3 text-center justify-content-start bot">
            <h2 class="mt-4 mb-4" style="font-family: cursive;">種類で探す</h2>
            <button @click.prevent="searchText = ''"
              :class="{ 'active': searchText === ''}" class="allcate">
              全部現す</button><br>
            <button v-for="(item,a) in categories" :key="item" @click.prevent="searchText = item" :class="{ 'active': item === searchText}" class="but ">
                <span :class="beans[a]">
                    {{ item }}
                </span>
            </button>
        </div>
        <div class="row col-md-9 justify-content-start chose mr-2 mb-4">
            <div class="col-md-4 mu mb-5" v-for="(item) in filterData" :key="item.id" >
                <div class="card border-0 shadow-sm">
                    <div class="cardimg" :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                        <h5 class="card-title" >
                        <div href="#">{{ item.title }}</div>
                        </h5>
                        <p class="card-text">{{ item.content }}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h6" v-if="!item.price">{{ item.origin_price }}円</div>
                        <div class="h6" v-if="item.price">原價 {{ item.origin_price }}円</div>
                        <div class="price" v-if="item.price">今なら {{ item.price }}円！</div>
                        </div>
                    </div>
                    <button type="button" class="btn kuwashiku btn-sm"
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
        background-size: 35px;
        background-repeat: no-repeat;
        display: inline-block;
        width:10vw;
        height:3vw
    }
    .naka{
        background-image: url("./images/naka.gif");
        background-size: 35px;
        background-repeat: no-repeat;
        display: inline-block;
        width:10vw;
        height:3vw
    }
    .deep{
        background-image: url("./images/deep.gif");
        background-size: 35px;
        background-repeat: no-repeat;
        display: inline-block;
        width:10vw;
        height:3vw
    }
    .kigu{
        background-image: url("./images/kigu.gif");
        background-size: 35px;
        background-repeat: no-repeat;
        display: inline-block;
        width:10vw;
        height:3vw
    }
    @media (max-width: 480px){
    .asai{
        background-image:none;
    }
    .naka{
        background-image:none;
    }
    .deep{
        background-image:none;
    }
    .kigu{
        background-image:none;
    }
    }
</style>
<script>
import {mapGetters,mapActions} from 'vuex'
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
        ...mapActions(['getProducts'])
    },
    computed: {
        filterData() {
            const vm = this;
            if (vm.searchText) {
                return vm.products.filter((item) => {
                const data = item.category.toLowerCase().includes(vm.searchText.toLowerCase());
                return data;
                });
            }
            return this.products;
        },
        ...mapGetters(['categories','products'])
    },
    created() {
    this.getProducts();
    },
}
</script>

