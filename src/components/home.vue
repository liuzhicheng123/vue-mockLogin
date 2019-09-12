<template>
  <div>
    <h1>欢迎您：{{ msg }}</h1>
    <Nav></Nav>
    <div >
      <input type="text" v-model='aa'>
      <div></div>
      <div>{{say}}</div>
    </div>
    <Son1 :son1Data='aa'></Son1>
    <Son2 @listerChildClick="childData"></Son2>
  </div>
</template>
<script>
  import Son1 from './son1'
  import Son2 from './son2'
  import Nav from './nav'
export default {
  name: 'home',
  components:{
    Son1,
    Son2,
    Nav
  },
  data () {
    return {
      msg: '',
      aa:'aaa',
      say: ''
    }
  },
  mounted () {
    console.log(JSON.parse(sessionStorage.getItem('user')).username)
      
    this.msg = JSON.parse(sessionStorage.getItem('user')).username;

  },
  methods:{
    dataList(){

    },
    childData(data){
      this.say = data
    }
  }
}
</script>