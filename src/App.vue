<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  
  name: 'App',
  watch:{
    '$route':function(to,from){
　    document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  created(){
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}`
    // const api = 'https://vue-course-api.hexschool.io/api/orjck54836/products';
    console.log(process.env.APIPATH,process.env.CUSTOMPATH)
    this.$http.get(api).then((response) => {
      console.log(response.data)
    })
  },
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
