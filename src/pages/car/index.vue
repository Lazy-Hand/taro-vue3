<template>
	<view :class="style.app">
		<nut-button type="primary">按钮</nut-button>
	</view>
</template>

<script setup lang="ts">
import router from '@/router'
import style from './index.module.scss'
console.log(router.getRouteParams('car').id)
console.log(process.env.NODE_ENV)
</script>

<style lang="scss"></style>
