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
import Router, { NavigateType } from 'tarojs-router-next'
export const useGlobalStore = defineStore('global', () => {
	const tabBarList = ref<Tabbar[]>([
		{
			id: 0,
			icon: logo,
			active: activeLogo,
			name: 'index',
			title: '首页'
		},
		{
			id: 1,
			icon: category,
			active: activeCategory,
			name: 'category',
			title: '分类'
		},
		{
			id: 2,
			icon: cart,
			active: activeCart,
			name: 'cart',
			title: '购物车'
		},
		{
			id: 3,
			icon: my,
			active: activeMy,
			name: 'my',
			title: '我的'
		}
	])
	const tabBarActive = ref(0)
	const switchTab = (active: number) => {
		tabBarActive.value = active
		switch (active) {
			case 0:
				Router.toIndex({ type: NavigateType.switchTab })
				break
			case 1:
				Router.toCategory({ type: NavigateType.switchTab })
				break
			case 2:
				Router.toCart({ type: NavigateType.switchTab })
				break
			case 3:
				Router.toMy({ type: NavigateType.switchTab })
				break
		}
	}
	const setTabBar = (tabbar: Tabbar[]) => {
		tabBarList.value = tabbar
	}
	return { tabBarList, switchTab, setTabBar, tabBarActive }
})
