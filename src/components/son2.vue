
<template>
	<div>{{msg}}
		<button @click="changeText">子组件</button>

		<div>来自老大的数据{{str}}</div>
	</div>
</template>

<script>
	import VueEvent from '.././model/VueEvent'
export default {
  name: 'son2',
  data () {
    return {
      msg: 'son2',
      str:''
    }
  },
  mounted() {
    var _this=this;
    VueEvent.$on('to-news',function(a){
    	console.log(a)
    	_this.str=a
    })

  },
  methods:{
  	changeText(){
  		this.$emit('listerChildClick','儿子的值')
  	}
  }
}
</script>