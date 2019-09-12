<template>
	<div>
		<h1>{{msg}}</h1>
		<p>{{son1Data}}</p>
    <button @click="emitNews()">发送给老二</button>
    <div>params传参路由参数{{this.$route.params.userId}}</div>
    <div>query传参路由参数{{this.$route.query.userId}}</div>
    <div>路由参数{{$route.params.id}}</div>
	</div>
</template>

<script>
  import VueEvent from '.././model/VueEvent'
export default {
  name: 'son1',
  data () {
    return {
      msg: 'son1',
      data:'发送给老二的数据'
    }
  },
  props: ['son1Data'],
  methods:{
    emitNews(){
      VueEvent.$emit('to-news',this.data)
    }
  }
}
</script>