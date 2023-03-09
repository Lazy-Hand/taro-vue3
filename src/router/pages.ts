// 主包
export const mainPackage = {
	index: '/pages/index/index',
	car: '/pages/car/index',
	login: '/pages/login/index',
	agreement: '/pages/agreement/index'
}

// 分包1
export const packageA = {}
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
