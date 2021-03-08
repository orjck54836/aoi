<template>
    <div>
        <alert></alert>
        <loading :active.sync="isLoading"></loading>
        <header class="site-header col-md-12" :style="style">
         <router-link to="/admin/main"><img src="./images/logo.gif" class="col-md-2  justify-content-center logo"></router-link>
            <nav class="container d-flex flex-column flex-md-row justify-content-end navbar-expand-md">
              <input type="checkbox" name="menu-switcher" id="menu-switcher" v-model="hammenucheck" @click="this.hammenucheck = !this.hammenucheck"/>
              <label for="menu-switcher" class="hamburger" v-if="!hammenucheck">
                <div class="hamburger-line" ></div>
              </label>
              <label for="menu-switcher" class="btn-close" aria-label="Close" v-if="hammenucheck"></label>
                <!--手機選單-->
                <ul class="menu" ref="menu">
                    <router-link to="/admin/coffee" class="row  mr-3 align-items-center zenbu" @click="close">ザ.コーヒーとは</router-link>
                    <router-link to="/admin/baking" class="row  align-items-center zenbu mr-3 " @click="close">焙煎</router-link>
                    <!-- 按鈕區 -->
                    <div class="row align-items-center zenbu mr-3 " @click="goShop" v-model="check" >商品情報</div>
                    <i class="row  fas fa-user fa-2x align-items-center user mr-2 "  data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="!check"></i>
                    <i class="row  align-items-center fas fa-sign-out-alt fa-2x user mr-2 "  data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="check" @click.prevent="signOut"></i>
                    <router-link to="/admin/count" class="row align-items-center shop mr-2 " @click="close"><i class="fas fa-shopping-basket" style="padding:0"><span class="badge badge-danger badge-pill" v-if="cart.carts.length > 0">{{cart.carts.length}}</span></i></router-link>
                </ul>
                 <!--手機選單-->
            </nav>
        </header>
        <div id="space"></div>
        <main>
            <router-view></router-view>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:9999;overflow: auto">
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
        </main>
        <footer class="footer text-center col-md-12 mt-4">
          <div class=" text-light awer">
             Copyright© Design by LEE CHIA-HAO<br>
             僅為個人作品使用，無任何商業用途
          </div>
        </footer>
    </div>
</template>
<script>
import  $ from "jquery";
import alert from './alertMessage.vue'
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
  components:{
        alert,
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
  },
  methods:{
    windowScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.opacity = Math.abs(Math.round(scrollTop)) / 250;
      this.style = {background: `rgba(148,121,107,${this.opacity})`}
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
          vm.check = true
          vm.$store.state.isLoading = false;
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
          $('#exampleModal').modal('hide');
          $('.modal-backdrop').remove();
          $("body").removeClass('modal-open');
          document.body.style.padding = 0;
      }
      })
    },
    goShop(){
        const vm = this;
        vm.$router.push('/admin/customer_order/setsume');
        var menu = document.getElementById('#menu-switcher');
        menu.style.transform = 'translateX(0%)';
    },
    getCart(){
    this.$store.dispatch('getCart');
    },
    close(){
      var menu = document.getElementById('#menu-switcher');
      menu.style.transform = 'translateX(0%)';
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
    ...mapGetters(['isLoading'])
  },
}
</script>


