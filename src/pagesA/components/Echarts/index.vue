<template>
	<view :class="style.pieChart">
		<e-canvas ref="ecCanvasRef" :ec="ec"></e-canvas>
	</view>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import style from './index.module.scss'
import ECanvas from '@/pagesA/components/EcCanvas/index.vue'
// @ts-expect-error
import * as echarts from '@/pagesA/components/EcCanvas/echarts'
interface EchartsProps {
	option: object
}
const props = withDefaults(defineProps<EchartsProps>(), {
	option: () => ({})
})
watch(props, () => {
	refresh()
})
let chart
const ecCanvasRef = ref()
const initChart = (canvas, width, height, dpr) => {
	chart = echarts.init(canvas, null, {
		width,
		height,
		devicePixelRatio: dpr
	})
	canvas.setChart(chart)
	refresh()
	return chart
}
const ec: {
	lazyLoad?: boolean
	onInit: (canvas, width, height, dpr) => void
} = {
	lazyLoad: true,
	onInit: initChart
}
const refresh = () => {
	chart?.setOption(props.option)
}
const init = () => {
	ecCanvasRef.value.init((canvas, width, height, dpr) => {
		chart = echarts.init(canvas, null, {
			width,
			height,
			devicePixelRatio: dpr
		})
		canvas.setChart(chart)
		refresh()
		return chart
	})
}
onMounted(() => {
	setTimeout(() => {
		ec.lazyLoad && init()
	}, 300)
})
defineExpose({
	refresh
})
</script>
