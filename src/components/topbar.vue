<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <router-link to="/admin/products" class="navbar-brand col-md-3 col-lg-2 me-0 px-3">Company name</router-link>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
            <a class="nav-link" href="#" @click.prevent="signOut">Sign out</a>
            </li>
        </ul>
    </header>
</template>

<script>
export default {
    name:'topbar',
    methods:{
        signOut(){
            const api =`${process.env.APIPATH}/logout`;
            const vm = this;
            console.log(api)
            this.$http.post(api).then((response) => {
            console.log(response.data)
            if(response.data.success){
            vm.$router.push('/loging')
            }
            })
        }
    },
}
</script>