import { getStorageSync, setStorageSync } from '@tarojs/taro'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
const pinia = createPinia().use(
	createPersistedState({
		storage: {
			getItem(key: string): string | null {
				return getStorageSync(key)
			},
			setItem(key: string, value: string) {
				setStorageSync(key, value)
			}
		}
	})
)
export * from './modules/user'
export * from './modules/global'
export default pinia
