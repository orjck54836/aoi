<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <header class="site-header1 col-md-12" :style="style">
         <router-link to="/admin/main"><img src="./images/logo.gif" class="col-md-2  justify-content-center logo1"></router-link>
            <nav class="container d-flex flex-column flex-md-row justify-content-end navbar-expand-md">
              <input type="checkbox" name="menu-switcher" id="menu-switcher" />
              <label for="menu-switcher" class="hamburger1">
                <div class="hamburger-line1"></div>
              </label>
                <ul class="menu">
                    <router-link to="/admin/coffee" class="row  mr-2 align-items-center zenbu1" @click="close">ザ.コーヒーとは</router-link>
                    <router-link to="/admin/baking" class="row  align-items-center zenbu1 mr-2 " @click="close">焙煎</router-link>
                    <!-- 按鈕區 -->
                    <div class="row align-items-center zenbu1 mr-2 " @click="goShop" v-model="check">商品情報</div>
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
                            <h3 style="position:relative;top:-30vw; left:30vw;" >格別な味と香り、独特のコクが<br>
                            自慢のオリジナルコーヒーです</h3>
                            <h5 style="position:relative;top:-430px;left:380px;text-align:left;" data-aos="fade-down" >
                                珈琲館はあくまで“品質”にこだわり続け、<br>
                                良質のコーヒー豆だけを厳選し、<br>
                                しかも少量でしか生産していません。<br>
                                お客様に最高のコーヒーだけを<br>
                                お届けすることが珈琲館のモットーなのです。<br>
                                そこにはどんな妥協も許されません<br>
                            </h5>
                        </div>
                    </div>
                        <div class="carousel-item ">
                            <img src="./images/banner2.jpg" class="col-md-12 " style="padding:0">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slogan mb-4" data-aos="zoom-in">コーヒーは飲むことができる一種の魔法である</div><hr>
                <div class="row col-md-12 justify-content-center pic" style="margin:3vw auto 5vw">
                    <span><img src="./images/asai.png" class="col-md-3 anf1"><img src="./images/asaiz.png" class="col-md-3 col-sm-3 anf" style="position:absolute;z-index:-9999;margin-right:49vw"></span>
                    <span><img src="./images/naka.png" class="col-md-3 anf1"><img src="./images/nakaz.png" class="col-md-3 col-sm-3 anf" style="position:absolute;z-index:-9999"></span>
                <span><img src="./images/fukai.png" class="col-md-3 anf1"><img src="./images/fukaiz.png" class="col-md-3 col-sm-3 anf" style="position:absolute;z-index:-9999;margin-left:49vw"></span>
                </div><hr>
                <div class="imageBanner mb-4 mt-2 col-md-11" style="margin:auto;display:block">
                    <img src="./images/web_coupon.png" class="coupon col-md-6 shake shake-slow" data-aos="fade-right"　data-aos-duration="2000">
                    <img src="http://design-library.jp/wp-content/uploads/1596972793_3fd22d4d.jpg" class="col-md-5" data-aos="fade-left"　data-aos-duration="3000">
                </div>    
                <div class="imgkkk"> 
                    <img src="./images/kkk.gif" class="col-md-8" style="padding:0;margin:auto;display:block">
                </div>  
            </div>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <footer class="bg-dark footer1 col-md-12">
                <div class="row text-light ">
                    Copyright© Design by LEE CHIA-HAO<br>
                    僅為個人作品使用，無任何商業用途
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
import  $ from "jquery";
export default {
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
          }else{
            alert('請輸入正確帳號密碼')
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
  },
  destroyed() {
			window.removeEventListener("scroll", this.windowScroll); //销毁滚动事件
  },
  created(){
      this.getCart();
      this.loging();
      //網址來源https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
      const cookieValue = document.cookie.split(';').find(row => row.startsWith('hexToken'))
      .split('=')[1];
      console.log('cookieValue',cookieValue);
      //網址來源https://github.com/axios/axios#global-axios-defaults
      this.$http.defaults.headers.common.Authorization = cookieValue;
  },
  computed:{
    isLoading(){
      return this.$store.state.isLoading
    },
    cart(){
      return this.$store.state.cart
    }
  },
}
</script>
<style scoped>
.row>* {
    display:contents;
    z-index:0;
}

</style>
