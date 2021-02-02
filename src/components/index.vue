<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <header class="site-header col-md-12 position-fixed" :style="style">
         <router-link to="/admin/main"><img src="./images/logo.gif" class="col-md-2  justify-content-center logo"></router-link>
            <nav class="container d-flex flex-column flex-md-row justify-content-end navbar-expand-md">
              <input type="checkbox" name="menu-switcher" id="menu-switcher" />
              <label for="menu-switcher" class="hamburger">
                <div class="hamburger-line"></div>
              </label>
                <!--手機選單-->
                <ul class="menu">
                    <router-link to="/admin/coffee" class="row  mr-2 align-items-center zenbu">ザ.コーヒーとは</router-link>
                    <router-link to="/admin/baking" class="row  align-items-center zenbu mr-2 ">焙煎</router-link>
                    <!-- 按鈕區 -->
                    <div class="row align-items-center zenbu mr-2 " @click="goShop" v-model="check">商品情報</div>
                    <i class="row  fas fa-user fa-2x align-items-center user mr-2 "  data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="!check"></i>
                    <i class="row  align-items-center fas fa-sign-out-alt fa-2x user mr-2 "  data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="check" @click.prevent="signOut"></i>
                    <router-link to="/admin/count" class="row align-items-center shop mr-2 "><i class="fas fa-shopping-basket" style="padding:0"><span class="badge badge-danger badge-pill">{{cart.carts.length}}</span></i></router-link>
                </ul>
                 <!--手機選單-->
            </nav>
        </header>
        <main>
            <router-view></router-view>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title　" id="exampleModalLabel">会員登録</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
        <footer class="bg-dark footer text-center ">
          <div class="row bg-dark text-light awer">
             Copyright© Design by LEE CHIA-HAO<br>
             僅為個人作品使用，無任何商業用途
          </div>
        </footer>
    </div>
</template>
<script>
import  $ from "jquery";
export default {
  data() {
        return {
            check:false,
            le:'',
            user:{
                username:'',
                password:''
            },
            style: {},
			    	opacity: 0,
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
            vm.check = true
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
    goShop(){
         const vm = this
         vm.$router.push('/admin/customer_order/setsume')
    },
    getCart(){
    this.$store.dispatch('getCart');
    },
  },
  destroyed() {
			window.removeEventListener("scroll", this.windowScroll); //销毁滚动事件
  },
  created(){
      this.getCart();
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
html,body{
    height: 100vh; 
}

.site-header {
  height:4rem;
  display:flex;
  position: relative;
  z-index:9999;
}
.site-header button {
    color: white;
    background:#00000085;
    transition:all 0.2s ease-in-out 0s;
    position: relative;
    top:0;
    border-radius: 25px;
    opacity:0.6;
    margin-left:8px;
}

.product-device {
  position: absolute;
  right: 10%;
  bottom: -30%;
  width: 300px;
  height: 540px;
  background-color: #333;
  border-radius: 21px;
  transform: rotate(30deg);
}
.product-device::before {
  position: absolute;
  top: 10%;
  right: 10px;
  bottom: 10%;
  left: 10px;
  content: "";
  background-color: rgba(255, 255, 255, .1);
  border-radius: 5px;
}
.carousel-inner img{
  height:45vw;
}
.product-device-2 {
  top: -25%;
  right: auto;
  bottom: 0;
  left: 5%;
  background-color: #e5e5e5;
}

.footer{
    height:4rem;
    
}
.awer{
    display:block;
    margin:auto;
}


</style>

