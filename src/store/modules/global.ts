import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Tabbar } from '@/store/interface'
import category from '@/assets/images/goods.png'
import activeCategory from '@/assets/images/seleceGoods.png'
import logo from '@/assets/images/tab8.png'
import activeLogo from '@/assets/images/tab7.png'
import cart from '@/assets/images/tab4.png'
import activeCart from '@/assets/images/tab5.png'
import my from '@/assets/images/tab1.png'
import activeMy from '@/assets/images/tab3.png'
import Taro from '@tarojs/taro'
export const useGlobalStore = defineStore('global', () => {
	const tabBarList = ref<Tabbar[]>([
		{
			id: 0,
			icon: logo,
			active: activeLogo,
			name: 'index',
			title: '首页',
			pagePath: '/pages/index/index'
		},
		{
			id: 1,
			icon: category,
			active: activeCategory,
			name: 'category',
			title: '分类',
			pagePath: '/pages/category/index'
		},
		{
			id: 2,
			icon: cart,
			active: activeCart,
			name: 'cart',
			title: '购物车',
			pagePath: '/pages/cart/index'
		},
		{
			id: 3,
			icon: my,
			active: activeMy,
			name: 'my',
			title: '我的',
			pagePath: '/pages/my/index'
		}
	])
	const tabBarActive = ref(0)
	const switchTab = (active: number) => {
		tabBarActive.value = active
		// 跳转tabbar
		Taro.switchTab({ url: tabBarList.value[active].pagePath })
	}
	const setTabBar = (tabbar: Tabbar[]) => {
		tabBarList.value = tabbar
	}
	return { tabBarList, switchTab, setTabBar, tabBarActive }
})
