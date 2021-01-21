<template>
    <div>
        <header class="site-header sticky-top col-md-12" >
         <router-link to="/admin/main"><img src="./images/logo.gif" class="col-md-2 col-sm-2 justify-content-center"></router-link>
            <nav class="container d-flex flex-column flex-md-row justify-content-end" >   
                <router-link to="/admin/coffee" class="row col-md-3 mr-2 align-items-center ho">ザ.コーヒーとは</router-link>
                <router-link to="/admin/baking" class="row col-md-3 align-items-center ho">焙煎</router-link>
                <!-- 按鈕區 -->
                <i class="row col-md-2 align-items-center fas fa-shopping-cart fa-2x" @click="goShop" v-model="check" style="cursor: pointer;"></i>
                <i class="row col-md-2 fas fa-user fa-2x align-items-center"  data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="!check" style="cursor: pointer;"></i>
                <i class="row col-md-2 align-items-center fas fa-sign-out-alt  fa-2x"  data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="check" @click.prevent="signOut" style="cursor: pointer;"></i>
                <router-link to="/admin/count" class="row col-md-3 align-items-center" style="cursor: pointer;"><i class="fas fa-shopping-basket " style="font-size:25px;color:black"><span class="badge badge-danger badge-pill">{{Length}}</span></i></router-link>
            </nav>
        </header>
        <main id="main" >
            <router-view></router-view>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-signin" >
                            <form @submit.prevent="signIn" >
                                <h1 class="h3 mb-3 fw-normal">登入</h1>
                                <label for="inputEmail" class="visually-hidden">Email address</label>
                                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="user.username" required autofocus>
                                <label for="inputPassword" class="visually-hidden">Password</label>
                                <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="user.password" required>
                                <p v-if="check" class="text-success">登入成功！</p>
                                <div class="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me"> Remember me
                                </label>
                                </div>
                                <button class="w-100 btn btn-lg btn-success" type="submit">確認</button>
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
        <footer class="bg-dark footer"  >
        <div class="row bg-dark">
            <div class="col-12 col-md">
            </div>
            <div class="col-6 col-md">
            <h5>Features</h5>
            <ul class="list-unstyled text-small">
                <li><a class="link-secondary" href="#">Cool stuff</a></li>
                <li><a class="link-secondary" href="#">Random feature</a></li>
                <li><a class="link-secondary" href="#">Team feature</a></li>
                <li><a class="link-secondary" href="#">Stuff for developers</a></li>
                <li><a class="link-secondary" href="#">Another one</a></li>
                <li><a class="link-secondary" href="#">Last time</a></li>
            </ul>
            </div>
            <div class="col-6 col-md">
            <h5>Resources</h5>
            <ul class="list-unstyled text-small">
                <li><a class="link-secondary "href="#">Resource name</a></li>
                <li><a class="link-secondary" href="#">Resource</a></li>
                <li><a class="link-secondary" href="#">Another resource</a></li>
                <li><a class="link-secondary" href="#">Final resource</a></li>
            </ul>
            </div>
            <div class="col-6 col-md">
            <h5>Resources</h5>
            <ul class="list-unstyled text-small">
                <li><a class="link-secondary" href="#">Business</a></li>
                <li><a class="link-secondary" href="#">Education</a></li>
                <li><a class="link-secondary" href="#">Government</a></li>
                <li><a class="link-secondary" href="#">Gaming</a></li>
            </ul>
            </div>
            <div class="col-6 col-md">
            <h5>About</h5>
            <ul class="list-unstyled text-small">
                <li><a class="link-secondary" href="#">Team</a></li>
                <li><a class="link-secondary" href="#">Locations</a></li>
                <li><a class="link-secondary" href="#">Privacy</a></li>
                <li><a class="link-secondary" href="#">Terms</a></li>
            </ul>
            </div>
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
            cart: {},
            le:'',
            Length:'',
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
        const token = response.data.token;
        const expired = response.data.expired;
        console.log(token,expired);
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        if(response.data.success == true){
          $('#exampleModal').modal('hide');
          vm.check = true
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
        // if(vm.check == true){
        //     vm.$router.push('/admin/customer_order')
        //     $('#exampleModal').modal('hide')
        // }else{
        //     alert('請先登入！')
        //     $('.modal-backdrop').remove()
        // }
    },
    getCart(){
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
    const vm = this;
    this.$http.get(api).then((response) => {
    console.log(response.data);
    vm.cart = response.data.data;
    let le = vm.cart.carts.length;
    vm.Length = le.toString();
    });
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
  }
}
</script>

<style scoped>
html,body{
    height: 100vh;
}
.ho{
  color:black;
}
.ho:hover{
  color:red;
  font-size:16px;
  cursor: pointer;
}
.site-header {
  height:4rem;
  display:flex;
}
.site-header a {
  transition: color .15s ease-in-out;
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
    height:4rem
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
@media (min-width: 768px) {
  .flex-md-equal > * {
    flex: 1;
  }
}

</style>

