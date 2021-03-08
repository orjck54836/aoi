<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <header class="site-header1 col-md-12" :style="style">
         <router-link to="/admin/main"><img src="./images/logo.gif" class="col-md-2  justify-content-center logo1"></router-link>
            <nav class="container d-flex flex-column flex-md-row justify-content-end navbar-expand-md">
              <input type="checkbox" name="menu-switcher" id="menu-switcher" v-model="hammenucheck" @click="this.hammenucheck = !this.hammenucheck"/>
              <label for="menu-switcher" class="hamburger1" v-if="!hammenucheck">
                <div class="hamburger-line1"></div>
              </label>
              <label for="menu-switcher" class="btn-close btn-close-white" aria-label="Close" v-if="hammenucheck"></label>
                <ul class="menu" ref="menu">
                    <router-link to="/admin/coffee" class="row mr-3 align-items-center zenbu1" @click="close">ザ.コーヒーとは</router-link>
                    <router-link to="/admin/baking" class="row align-items-center zenbu1 mr-3 " @click="close">焙煎</router-link>
                    <!-- 按鈕區 -->
                    <div class="row align-items-center zenbu1 mr-3 " @click="goShop" v-model="check">商品情報</div>
                    <i class="row  fas fa-user fa-2x align-items-center user1 mr-2 "  data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="!check"></i>
                    <i class="row  align-items-center fas fa-sign-out-alt fa-2x user1 mr-2 "  data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="check" @click.prevent="signOut"></i>
                    <router-link to="/admin/count" class="row align-items-center shop1 mr-2 " @click="close"><i class="fas fa-shopping-basket" style="padding:0"><span class="badge badge-danger badge-pill" v-if="cart.carts.length > 0">{{cart.carts.length}}</span></i></router-link>
                </ul>
            </nav>
        </header>
        <div style="z-index:0;padding:0" class="container-fluid">
            <div id="carouselExampleCaptions" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"></li>
                    <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></li>
                </ol>
                <div class="carousel-inner ">
                    <div class="carousel-item active justify-content-around align-items-center">
                        <img src="./images/banner1.jpg" class="col-md-12" style="padding:0;">
                        <div class="carousel-caption d-none d-md-block" >
                            <h3 style="position:relative;top:-30vw; left:40vw;text-align:left;font-family: cursive;" >
                            珈琲館はあくまで“品質”にこだわり続け、<br>
                            良質のコーヒー豆だけを厳選し、<br>
                            格別な味と香り、独特のコクが<br>
                            自慢のオリジナルコーヒーです</h3>
                        </div>
                    </div>
                        <div class="carousel-item ">
                            <img src="./images/banner2.gif" class="col-md-12 " style="padding:0">
                            <div class="carousel-caption d-none d-md-block">
                                <h3 style="position:relative;top:-40vw; left:1vw;text-align:left;font-family: cursive;">
                                    1粒の種から1杯のカップまで<br>
                                    全ての行程に熱意を感じるコーヒーを。
                                </h3>
                                <h4 style="position:relative;top:-37vw; left:1vw;text-align:left;font-family: cursive;">
                                    世界のコーヒー産地でのさまざまな<br>取り組みを通じて
                                    見つけた最高の<br>コーヒー豆を、豆が本来持つ特徴を<br>最大限に活かしています。
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slogan mb-4" data-aos="zoom-in">コーヒーは飲むことができる一種の魔法である</div><hr>
                <div class="row col-md-12 justify-content-center pic" style="margin:3vw auto 5vw;position:absolute;">
                    <span><img src="./images/asaiz.png" class="col-md-3 col-sm-3 anf"></span>
                    <span><img src="./images/nakaz.png" class="col-md-3 col-sm-3 anf"></span>
                    <span><img src="./images/fukaiz.png" class="col-md-3 col-sm-3 anf" ></span>
                </div>
                <div class="row col-md-12 justify-content-center pic" style="margin:3vw auto 5vw;position:relative">
                    <span><img src="./images/asai.png" class="col-md-3 anf1"></span>
                    <span><img src="./images/naka.png" class="col-md-3 anf1"></span>
                    <span><img src="./images/fukai.png" class="col-md-3 anf1"></span>
                </div><hr>
                <div class="imageBanner mb-4 mt-2 col-md-11" style="margin:auto;display:block">
                    <img src="./images/web_coupon.png" class="coupon col-md-6 shake shake-slow" data-aos="fade-right"　data-aos-duration="2000">
                    <img src="./images/bannermame.gif" class="col-md-5" data-aos="fade-left"　data-aos-duration="3000">
                </div><hr>
                <div　class="slogan1 mb-4">本店のおすすめ</div>    
                <div class="imgkkk container"> 
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="card swiper-slide col-md-3" style="cursor:pointer; margin: 2vw 30px 2vw 2vw;padding:0" v-for="item in products" :key="item.id" @click="getProduct(item.id)">
                                <img class="cardimg" :style="{backgroundImage: `url(${item.imageUrl})`}" style="border:0">
                                <div class="">
                                    <p class="card-text">{{ item.title }}</p>
                                </div>
                            </div>
                        </div>
                        <!-- Add Pagination -->
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:9999">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title　" id="exampleModalLabel">会員登録</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-signin" >
                            <form @submit.prevent="signIn" >
                                <h6>メールアドレス</h6>
                                <label for="inputEmail" class="visually-hidden">Email address</label>
                                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="user.username" required autofocus>
                                <h6 class="mt-4">パスワード</h6>
                                <label for="inputPassword" class="visually-hidden ">Password</label>
                                <input type="password" id="inputPassword" class="form-control mb-4" placeholder="Password" v-model="user.password" required>
                                <p v-if="check" class="text-success">登入成功！</p>
                                <button class="w-100 btn btn-lg btn-dark" type="submit">確認</button>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            <footer class=" footer1 col-md-12">
                <div class="text-center text-light ">
                    Copyright© Design by LEE CHIA-HAO<br>
                    僅為個人作品使用，無任何商業用途
                </div>
            </footer>
        </div>
        
    </div>
</template>
<script>
import  $ from "jquery";
import 'swiper/swiper-bundle.css';
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import {mapGetters,mapActions} from 'vuex';
export default {
    watch: {
    $route (to,from) {
      console.log(to.path,from.path) // 查看目前要前往的路徑是否與目前路徑相同
      if(to.path !== from.path) {
        this.hammenucheck = false;
      }
    }
  }, 
  data() {
        return {
            le:'',
            user:{
                username:'',
                password:''
            },
            style: {},
            opacity: 0,
            check:false,
            hammenucheck:false,
        };
  },

  beforeRouteEnter(to, from, next) {
    window.document.body.style.background='#fefbf4'
    next()
  },
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor=''
    next()
  },
  mounted() {
    window.addEventListener("scroll", this.windowScroll); //监听页面滚动
    new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        observer:true,//修改swiper自己或子元素時，自動初始化swiper    重要
        observeParents:true,//修改swiper的父元素時，自動初始化swiper  重要
    });
  },
  methods:{
    windowScroll() {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          this.opacity = Math.abs(Math.round(scrollTop)) / 250;
          this.style = {background: `rgba(0, 0, 0,${this.opacity})`}
			  },
    signIn(){
        const api = `${process.env.APIPATH}/admin/signin`
        // const api = 'https://vue-course-api.hexschool.io/api/orjck54836/products';
        const vm = this;
        this.$http.post(api,vm.user).then((response) => {
        console.log(response)
        vm.$store.state.isLoading = true;
        const token = response.data.token;
        const expired = response.data.expired;
        console.log(token,expired);
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          if(response.data.success == true){
            $('#exampleModal').modal('hide');
            vm.$store.state.isLoading = false;
            vm.check = true;
          }else{
            alert('請輸入正確帳號密碼')
            vm.$store.state.isLoading = false;
          }
        }) 
    },
    signOut(){
        const api =`${process.env.APIPATH}/logout`;
        const vm = this;
        console.log(api)
        this.$http.post(api).then((response) => {
        console.log(response.data)
        if(response.data.success){
            vm.check = false
            vm.$router.push('/admin/main')
        }
        })
    },
    close(){
        var menu = document.getElementById('#menu-switcher');
        menu.style.transform = 'translateX(0%)';
    },
    goShop(){
         const vm = this
         vm.$router.push('/admin/customer_order/setsume')
         var menu = document.getElementById('#menu-switcher');
        menu.style.transform = 'translateX(0%)';
    },
    getCart(){
    this.$store.dispatch('getCart');
    },
    getProduct(id){
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
        this.$http.post(api).then((response) => {                     
        vm.product = response.data.product;
        vm.$router.push(`/admin/customer_order/detail/${id}`)
        });
    },
    loging(){
        const api = `${process.env.APIPATH}/api/user/check`;
        this.$http.post(api).then((response) => {
            // 登入沒有問題
            console.log(response.data.success);
            if (response.data.success) {
            this.check = true;
            } else {
            this.check = false;
            }
        })
    },
    ...mapActions('productsModules',['getProducts'])
  },
  destroyed() {
			window.removeEventListener("scroll", this.windowScroll); //销毁滚动事件
  },
  created(){
      this.getCart();
      this.loging();
      this.getProducts();
      //網址來源https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
      const cookieValue = document.cookie.split(';').find(row => row.startsWith('hexToken'))
      .split('=')[1];
      console.log('cookieValue',cookieValue);
      //網址來源https://github.com/axios/axios#global-axios-defaults
      this.$http.defaults.headers.common.Authorization = cookieValue;
  },
  computed:{
    cart(){
        return this.$store.state.cart
    },
    switchmenu () {
        if(this.hammenucheck) {
        this.$refs.menu.style.transform = 'translateX(0%)';
        } else {
        this.$refs.menu.style.transform = 'translateX(-100%)';
        }
    },
    ...mapGetters('productsModules',['isLoading','products'])
  },
}
</script>
<style scoped> 
.row>* {
  display:contents;
  z-index:0;
}

</style>
