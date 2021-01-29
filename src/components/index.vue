<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <header class="site-header col-md-12 ">
         <router-link to="/admin/main"><img src="./images/logo.gif" class="col-md-2  justify-content-center"></router-link>
            <nav class="container d-flex flex-column flex-md-row justify-content-end navbar-expand-md " >
              <input type="checkbox" name="menu-switcher" id="menu-switcher" />
              <label for="menu-switcher" class="hamburger">
                <div class="hamburger-line"></div>
              </label>
                <!--手機選單-->
                <ul class="menu">
                    <router-link to="/admin/coffee" class="row  mr-2 align-items-center zenbu">ザ.コーヒーとは</router-link>
                    <router-link to="/admin/baking" class="row  align-items-center zenbu">焙煎</router-link>
                    <!-- 按鈕區 -->
                    <div class="row align-items-center zenbu" @click="goShop" v-model="check" style="cursor: pointer;" >商品情報</div>
                    <i class="row  fas fa-user fa-2x align-items-center user"  data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="!check" style="cursor: pointer;"></i>
                    <i class="row  align-items-center fas fa-sign-out-alt  fa-2x user"  data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="check" @click.prevent="signOut" style="cursor: pointer;"></i>
                    <router-link to="/admin/count" class="row ml-2 align-items-center shop" style="cursor: pointer;"><i class="fas fa-shopping-basket " style="font-size:25px;color:black"><span class="badge badge-danger badge-pill">{{cart.carts.length}}</span></i></router-link>
                </ul>
                 <!--手機選單-->
            </nav>
        </header>
        <main id="main" >
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
        };
  },
  methods:{
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

.zenbu:hover{
  color:#844200;
  font-size:16px;
  cursor: pointer;
}
.site-header {
  height:4rem;
  display:flex;
  position: relative;
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
.site-header a:hover {
  color:#844200;
  text-decoration: none;
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

#main{
  min-height:100vh;
  font-family:Serif;
  min-height:calc(100vh - 8rem)
}
.footer{
    height:4rem;
    
}
.awer{
    display:block;
    margin:auto;
}


</style>

