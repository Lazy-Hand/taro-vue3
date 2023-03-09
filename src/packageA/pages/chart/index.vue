<template>
	<view class="echarts-page">
		<Echarts :option="option" ref="echarts" />
		<nut-button type="primary" @click="test">测试</nut-button>
	</view>
</template>

<script setup lang="ts">
import Echarts from '@/components/Echarts/index.vue'
import { ref } from 'vue'
const echarts = ref()
const option = ref({
	title: {
		text: '某站点用户访问来源',
		subtext: '纯属虚构',
		left: 'center'
	},
	tooltip: {
		trigger: 'item',
		formatter: '{a} \n{b} : {c} ({d}%)'
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
	},
	series: [
		{
			name: '访问来源',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: [
				{ value: 335, name: '直接访问' },
				{ value: 310, name: '邮件营销' },
				{ value: 234, name: '联盟广告' },
				{ value: 135, name: '视频广告' },
				{ value: 1548, name: '搜索引擎' }
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
	]
})
const test = () => {
	option.value.series[0].data = [
		{ value: 335, name: '直接访问' },
		{ value: 1685, name: '邮件营销' },
		{ value: 234, name: '联盟广告' },
		{ value: 135, name: '视频广告' },
		{ value: 1548, name: '搜索引擎' }
	]
}
</script>

<style lang="scss">
.echarts-page {
	width: 100%;
	height: 1000rpx;
}
</style>
