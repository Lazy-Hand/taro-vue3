<template>
	<view>
		<nut-button type="primary" @click="test">跳转</nut-button>
		<nut-button type="primary" @click="test1">跳转</nut-button>
		<Tabbar />
	</view>
</template>

<script setup lang="ts">
import Tabbar from '@/components/Tabbar/index.vue'
import { Router } from 'tarojs-router-next'
const test = () => {
	Router.pagesA.toChart()
}
const test1 = () => {
	Router.pagesA.toScreen()
}
</script>
