import { showModal } from '@tarojs/taro'
import Router, { registerMiddleware } from 'tarojs-router-next'
import { useUserStore } from '@/store'
registerMiddleware(async (_ctx, next) => {
	const userStore = useUserStore()
	if (!userStore.token) {
		const { confirm } = await showModal({
			title: '温馨提示',
			content: '请先登录'
		})
		if (confirm) Router.toLogin()
		return
	}

	await next()
})
