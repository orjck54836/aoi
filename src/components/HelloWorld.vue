<template>
  <div class="hello">
    <a hreh="#" @click.prevent="signout"> 登出 </a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    signout(){
       const api = `${process.env.APIPATH}/logout`
        // const api = 'https://vue-course-api.hexschool.io/api/orjck54836/products';
        const vm = this;
        this.$http.post(api).then((response) => {
          if(response.data.success){
            vm.$router.push('/loging')
          }
        })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
