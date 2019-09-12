<template>
	<div>
		<button @click='btn'>按钮</button>
		<router-link :to="{ name:'son1', params:{userId:1111}}">params传参</router-link>
		<router-link :to="{ path:'/son1', query:{userId:1111}}">query传参</router-link>
		<router-link to="/son1/1111">：id传参{{id}}11111</router-link>
		<router-link to="/son1/2222">：id传参{{id}}22222</router-link>

		<router-link to="/he">heheheheheh</router-link>


		<!-- <ul class="list">
           <li v-for="(item,aid) in list" :key="aid">
               <router-link :to="'/son1/'+item.aid">{{item.title}}</router-link>
           </li>
        </ul> -->
	</div>
</template>
<script>
	export default {
		name:'Nav',
		data(){
			return {
				id:'aaaa',
				list:[]
			}
		},
		methods:{
			btn(){
				this.$router.push({
					path:'/son1',
					query:{userId:123}
				})
			},
			requestData(){
             /* 请求数据
                如果用jsonp请求数据的话，后台一定要支持jsonp
             */
           
		}

	},
	mounted(){
        //  在dom渲染完成即开始向后台请求数据
         this.requestData();
 
         }
     }

</script>