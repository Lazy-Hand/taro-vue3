export default defineAppConfig({
	pages: [
		'pages/index/index',
		'pages/login/index',
		'pages/agreement/index',
		'pages/category/index',
		'pages/cart/index',
		'pages/my/index'
	],
	subPackages: [
		{
			root: 'packageA',
			pages: ['pages/chart/index'],
			independent: true
		}
	],
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black'
	},
	tabBar: {
		custom: true,
		color: '#a9b7b7',
		selectedColor: '#11cd6e',
		borderStyle: 'black',
		list: [
			{
				pagePath: 'pages/index/index',
				text: '首页'
			},
			{
				pagePath: 'pages/category/index',
				text: '分类'
			},
			{
				pagePath: 'pages/cart/index',
				text: '购物车'
			},
			{
				pagePath: 'pages/my/index',
				text: '我的'
			}
		]
	}
})
