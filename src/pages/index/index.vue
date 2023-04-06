<template>
	<view class="index">
		<view>
			<img src="" alt="" />
		</view>
		{{ msg }} <Dongdong />
		<view class="btn">
			<nut-button type="primary" @click="handleClick('text', msg2, true)">点我</nut-button>
		</view>
		<nut-toast :msg="msg2" v-model:visible="show" :type="type" :cover="cover" />
		<Tabbar />
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dongdong } from '@nutui/icons-vue-taro'
import Tabbar from '@/components/Tabbar/index.vue'
import Router from 'tarojs-router-next'
const msg = ref('欢迎使用 NutUI4.0 开发小程序')
const msg2 = ref('你成功了～')
const type = ref('text')
const show = ref(false)
const cover = ref(false)
const handleClick = (typeVal: string, msgVal: string, coverVal = false) => {
	show.value = true
	msg2.value = msgVal
	type.value = typeVal
	cover.value = coverVal
	Router.toLogin()
}
</script>

<style lang="scss">
.index {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}
</style>
