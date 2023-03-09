<template>
	<view class="container">
		<image :src="background" :class="style.background"></image>
		<view :class="style.logoBox">
			<image :src="logo" :class="style.logo"></image>
		</view>
		<view :class="style.loginCard">
			<view :class="style.username">
				<nut-input v-model="state.phoneNum" placeholder="请输入手机号" :border="false">
					<template #left> <My2></My2> </template>
				</nut-input>
			</view>
			<view :class="style.code">
				<nut-input v-model="state.code" placeholder="请输入短信验证码" :border="false">
					<template #left> <Ask></Ask> </template>
					<template #right>
						<nut-button size="small" type="info" @click="getCode">{{
							codeNum === 30 ? '获取验证码' : `${codeNum}秒后获取`
						}}</nut-button>
					</template>
				</nut-input>
			</view>
			<view><nut-button block type="info" size="large">登录</nut-button></view>
			<view :class="style.agreeBox">
				<nut-checkbox v-model="state.checkbox" />
				<view :class="style.arr">
					登录即代表同意
					<text :class="style.agreement">《用户协议》</text>
					和
					<text :class="style.agreement">《隐私政策》</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import background from '@/assets/images/bg.png'
import logo from '@/assets/images/tab7.png'
import style from './index.module.scss'
import { Ask, My2 } from '@nutui/icons-vue-taro'
import { reactive, ref } from 'vue'
import { showToast, showLoading, hideLoading } from '@tarojs/taro'
import { reqGetCode } from '@/api/login'
export interface LoginForm {
	phoneNum: string
	code: string
	wechatCode: string
	checkbox: boolean
}
const state = reactive<LoginForm>({
	checkbox: true,
	phoneNum: '',
	code: '',
	wechatCode: ''
})
const codeNum = ref(30)
const timer = ref<NodeJS.Timeout | null>(null)
const getCode = async () => {
	if (!state.checkbox)
		return showToast({
			title: '请勾选用户协议',
			icon: 'error',
			mask: true
		})
	if (!state.phoneNum)
		return showToast({
			title: '请输入手机号',
			icon: 'error'
		})
	showLoading({
		title: '正在获取验证码'
	})

	setTimeout(async () => {
		hideLoading()
		await reqGetCode({ phoneNum: state.phoneNum })
	}, 1000)
	timer.value = setInterval(() => {
		codeNum.value--
		if (codeNum.value < 0) {
			codeNum.value = 60
			timer.value = null
		}
	}, 1000)
}
</script>
<style lang="scss">
.nut-checkbox {
	width: 25rpx;
	.nut-checkbox__icon {
		color: #496cf2;
	}
}
</style>
