<template>
    <div>
        <topbar/>
        <div class="container-fluid">
            <div class="row">
                <sidebar/>
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>



<script>
import sidebar from './sidebar'
import topbar from './topbar'


export default {
    components:{
        sidebar,
        topbar,
    }
}
</script>