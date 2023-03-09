<template>
	<view>
		<nut-button type="primary" @click="test">跳转</nut-button>
		<Tabbar />
	</view>
</template>

<script setup lang="ts">
import Tabbar from '@/components/Tabbar/index.vue'
import router from '@/router'
const test = () => {
	router.navigate('chart')
}
</script>
