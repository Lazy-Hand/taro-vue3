<template>
	<web-view :src="route.url"></web-view>
</template>

<script setup lang="ts">
import { Router } from 'tarojs-router-next'
const route = Router.getParams()
</script>

<style lang="scss" scoped></style>
