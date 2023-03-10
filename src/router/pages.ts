// 主包
export const mainPackage = {
	index: '/pages/index/index',
	login: '/pages/login/index',
	agreement: '/pages/agreement/index',
	category: '/pages/category/index',
	cart: '/pages/cart/index',
	my: '/pages/my/index'
}

// 分包1
export const pagesA = {
	chart: '/pagesA/chart/index',
	screen: '/pagesA/screen/index'
}
// 分包2
export const pagesB = {}
// 分包2
export const pagesC = {}
const pages = {
	...mainPackage,
	...pagesA,
	...pagesB,
	...pagesC
}

export default pages
