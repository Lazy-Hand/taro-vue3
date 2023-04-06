import { showModal, showToast } from '@tarojs/taro'
import Router, { registerMiddleware } from 'tarojs-router-next'
import { useUserStore } from '@/store'
registerMiddleware(async (_ctx, next) => {
	const userStore = useUserStore()
	if (!userStore.token && _ctx.route.url !== '/pages/login/index') {
		const { confirm } = await showModal({
			title: '温馨提示',
			content: '请先登录'
		})
		if (confirm) Router.toLogin()
		return
	} else {
		if (_ctx.route.url === '/pages/login/index') {
			showToast({
				icon: 'error',
				title: '请先退出登录',
				mask: true,
				duration: 3000
			})
			return
		}
	}

	await next()
})
