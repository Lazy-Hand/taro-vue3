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
						<nut-button size="small" type="info" @click="getCode" :disabled="codeNum < 30">{{
							codeNum === 30 ? '获取验证码' : `${codeNum}秒后获取`
						}}</nut-button>
					</template>
				</nut-input>
			</view>
			<view><nut-button block type="info" size="large" @click="handleLogin">登录</nut-button></view>
			<view :class="style.agreeBox">
				<nut-checkbox v-model="state.checkbox" />
				<view :class="style.arr">
					登录即代表同意
					<view :class="style.agreement" @click="agreement('https://data.millionsteel.com/xieyi/uagreement.html')"
						>《用户协议》</view
					>
					和
					<view :class="style.agreement" @click="agreement('https://data.millionsteel.com/xieyi/privacy.html')"
						>《隐私政策》</view
					>
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
import { showToast, showLoading, hideLoading, login } from '@tarojs/taro'
import { reqGetCode, reqLogin } from '@/api/login'
import { useUserStore, useGlobalStore } from '@/store'
import validate from '@/utils/validate'
import Router from 'tarojs-router-next'

export interface LoginForm {
	/**
	 * 手机号
	 */
	phoneNum: string

	/**
	 * 验证码
	 */
	code: string

	/**
	 * 登录凭证
	 */
	wechatCode: string

	/**
	 * 协议勾选
	 */
	checkbox: boolean
}

const userStore = useUserStore()
const globalStore = useGlobalStore()
const state = reactive<LoginForm>({
	checkbox: true,
	phoneNum: '',
	code: '',
	wechatCode: ''
})

/**
 * 验证码倒计时
 */
const codeNum = ref(30)

/**
 * 延时器ID
 */
const timer = ref<NodeJS.Timeout | null>(null)

/**
 * 获取验证码
 */
const getCode = async () => {
	if (!state.checkbox)
		return showToast({
			title: '请勾选用户协议',
			icon: 'error',
			mask: true
		})
	validate.checkPhoneNumber(state.phoneNum)
	if (!state.phoneNum)
		return showToast({
			title: '请输入手机号',
			icon: 'error'
		})
	if (!validate.checkPhoneNumber(state.phoneNum)) {
		return showToast({
			title: '手机号错误',
			icon: 'error'
		})
	}
	showLoading({
		title: '正在获取验证码'
	})

	setTimeout(async () => {
		hideLoading()
		await reqGetCode({ phoneNum: state.phoneNum })
	}, 1000)
	timer.value = setInterval(() => {
		codeNum.value--
		if (codeNum.value < 1) {
			codeNum.value = 30
			// @ts-expect-error
			clearInterval(timer.value)
			timer.value = null
		}
	}, 1000)
}

/**
 * 登录
 */
const handleLogin = () => {
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
	if (!validate.checkPhoneNumber(state.phoneNum)) {
		return showToast({
			title: '手机号错误',
			icon: 'error'
		})
	}
	if (!state.code)
		return showToast({
			title: '请输入验证码',
			icon: 'error'
		})
	login({
		async success(res) {
			state.wechatCode = res.code
			const { data } = await reqLogin(state)
			userStore.setToken(data.token)
			globalStore.switchTab(0)
		}
	})
}

/**
 * 跳转webview页面
 * @param url webview 路径
 */
const agreement = (url: string) => {
	Router.toAgreement({ params: { url } })
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
