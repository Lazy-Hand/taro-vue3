import { createPinia } from 'pinia'
const pinia = createPinia()
export * from './modules/user'
export * from './modules/global'
export default pinia
