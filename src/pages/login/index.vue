<template>
	<view>
		<image :src="background" :class="style.background"></image>
	</view>
</template>

<script setup lang="ts">
import background from '@/assets/images/bg.png'
import style from './index.module.scss'
</script>
