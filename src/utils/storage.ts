import { setStorageSync, getStorageSync, removeStorageSync, clearStorageSync } from '@tarojs/taro'
import { StorageKeys } from '@/typings/storage'
interface StorageCla {
	set: <T>(key: StorageKeys, initValue: T) => void
	get: <T>(key: StorageKeys) => Result<T | null>
	remove: (key: StorageKeys) => void
	clear: () => void
}
/**
 * 返回数据
 */
interface Result<T> {
	message: string
	value: T | null
}
/**
 * 本地存储
 */
class Storage implements StorageCla {
	/**
	 * 本地存储 - 存
	 * @param {StorageKeys} key key
	 * @param {T} initValue value
	 */
	set<T>(key: StorageKeys, initValue: T) {
		setStorageSync(key, JSON.stringify(initValue))
	}

	/**
	 * 本地存储 - 取
	 * @param key key
	 */
	get<T>(key: StorageKeys): Result<T | null> {
		const value = getStorageSync(key)
		if (value) {
			const data: T = JSON.parse(value)
			return {
				message: '成功',
				value: data
			}
		} else {
			return {
				message: '无效',
				value: null
			}
		}
	}

	/**
	 * 本地存储 - 删
	 * @param key key
	 */
	remove(key: StorageKeys) {
		removeStorageSync(key)
	}

	/**
	 * 清空本地存储
	 */
	clear() {
		clearStorageSync()
	}
}

export default new Storage()
