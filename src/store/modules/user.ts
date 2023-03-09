import { defineStore } from 'pinia'
import { ref } from 'vue'
import storage from '@/utils/storage'
export const useUserStore = defineStore('user', () => {
	const token = ref('token')
	const setToken = (tokenVal?: string) => {
		if (tokenVal) {
			token.value = tokenVal
			storage.set('token', tokenVal)
		} else {
			token.value = ''
			storage.remove('token')
		}
	}
	return { token, setToken }
})
