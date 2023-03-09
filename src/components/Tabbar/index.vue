<template>
	<nut-tabbar
		@tab-switch="tabSwitch"
		bottom
		placeholder
		safe-area-inset-bottom
		v-model="globalStore.tabBarActive"
		active-color="#0080ff"
	>
		<nut-tabbar-item :tab-title="item.title" v-for="item in globalStore.tabBarList" :key="item.id">
			<template #icon="props">
				<image v-if="props.active" :src="item.active" :class="style.active"></image>
				<image v-else :src="item.icon" :class="style.active"></image>
			</template>
		</nut-tabbar-item>
	</nut-tabbar>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store'
import style from './index.module.scss'
const globalStore = useGlobalStore()
const tabSwitch = (_item: any, index: number) => {
	globalStore.switchTab(index)
}
</script>

<style lang="scss" scoped></style>
