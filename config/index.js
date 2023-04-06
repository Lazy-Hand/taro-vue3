import Components from 'unplugin-vue-components/webpack'
import path from 'path'
// 导入unocss
import UnoCSS from 'unocss/webpack'
const NutUIResolver = () => {
	return name => {
		if (name.startsWith('Nut')) {
			const partialName = name.slice(3)
			return {
				name: partialName,
				from: '@nutui/nutui-taro',
				sideEffects: `@nutui/nutui-taro/dist/packages/${partialName.toLowerCase()}/style`
			}
		}
	}
}

const config = {
	projectName: 'taro-vue',
	date: '2023-3-7',
	designWidth(input) {
		if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
			return 375
		}
		return 750
	},
	deviceRatio: {
		640: 2.34 / 2,
		750: 1,
		828: 1.81 / 2,
		375: 2 / 1
	},
	sourceRoot: 'src',
	outputRoot: 'dist',
	plugins: [
		'@tarojs/plugin-html',
		'taro-plugin-compiler-optimization',
		[
			'tarojs-router-next-plugin',
			{
				packages: [
					{
						name: 'pagesA',
						pagePath: path.resolve(__dirname, '../src/pagesA/pages')
					}
				]
			}
		]
	],
	defineConstants: {},
	alias: {
		'@': path.resolve(__dirname, '..', './src')
	},
	copy: {
		patterns: [],
		options: {}
	},
	framework: 'vue3',
	compiler: {
		type: 'webpack5',
		prebundle: { enable: false }
	},
	cache: {
		enable: true // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
	},
	sass: {
		data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
	},
	mini: {
		webpackChain(chain) {
			chain.merge({
				plugin: {
					install: {
						plugin: require('terser-webpack-plugin'),
						args: [
							{
								terserOptions: {
									compress: true, // 默认使用terser压缩
									// mangle: false,
									keep_classnames: true, // 不改变class名称
									keep_fnames: true // 不改变函数名称
								}
							}
						]
					}
				}
			})
			chain.plugin('unplugin-vue-components').use(
				Components({
					resolvers: [NutUIResolver()]
				})
			)
			chain.plugin('unocss').use(UnoCSS())
		},
		postcss: {
			pxtransform: {
				enable: true,
				config: {
					selectorBlackList: ['nut-']
				}
			},
			url: {
				enable: true,
				config: {
					limit: 1024 // 设定转换尺寸上限
				}
			},
			cssModules: {
				enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]'
				}
			}
		}
	},
	h5: {
		webpackChain(chain) {
			chain.plugin('unplugin-vue-components').use(
				Components({
					resolvers: [NutUIResolver()]
				})
			)
			chain.plugin('unocss').use()
		},
		publicPath: '/',
		staticDirectory: 'static',
		esnextModules: ['nutui-taro', 'icons-vue-taro'],
		postcss: {
			autoprefixer: {
				enable: true,
				config: {}
			},
			cssModules: {
				enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]'
				}
			}
		}
	}
}

module.exports = function (merge) {
	if (process.env.NODE_ENV === 'development') {
		return merge({}, config, require('./dev'))
	}
	return merge({}, config, require('./prod'))
}
