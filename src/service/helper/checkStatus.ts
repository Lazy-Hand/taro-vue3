import Taro from '@tarojs/taro'
import { useUserStore } from '@/store'
import Router, { NavigateType } from 'tarojs-router-next'
const userStore = useUserStore()
const showToast = (title: string) => {
	Taro.showToast({
		title,
		icon: 'error',
		mask: true,
		duration: 1000
	})
}

export const checkStatus = (status: number): void => {
	switch (status) {
		case 400:
			showToast('请求错误(400)')
			break
		case 401:
			showToast('登录失效(401)')
			// 这里可以做清空storage并跳转到登录页的操作
			userStore.setToken(null)
			Router.toLogin({ type: NavigateType.redirectTo })
			break
		case 403:
			showToast('拒绝访问(403)')
			break
		case 404:
			showToast('请求出错(404)')
			break
		case 405:
			showToast('方式错误(405)')
			break
		case 408:
			showToast('请求超时(408)')
			break
		case 500:
			showToast('服务异常(500)')
			break
		case 501:
			showToast('未实现(500)')
			break
		case 502:
			showToast('网关错误(502)')
			break
		case 503:
			showToast('不可用(503)')
			break
		case 504:
			showToast('网关超时(504)')
			break
		default:
			showToast(`连接出错(${status})`)
	}
}
