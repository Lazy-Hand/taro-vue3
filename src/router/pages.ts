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
export const packageA = {
	chart: '/packageA/pages/chart/index'
}
// 分包2
export const packageB = {}
// 分包2
export const packageC = {}
const pages = {
	...mainPackage,
	...packageA,
	...packageB,
	...packageC
}

export default pages
