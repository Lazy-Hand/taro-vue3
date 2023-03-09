import { PageNames } from '@/router/interface/routes'
/**
 * 个人信息
 */
export interface UserInfo {
	auth: string
	avatarPath: string
	businessAvatar: string
	businessName: string
	businessPhone: string
	co: string
	coAdmin: boolean
	coId: number
	enabled: boolean
	id: number
	joinCoAuditStatus: string
	nickName: string
	phone: string
	role: string
	roleText: string
	warehouseId: number
}

/**
 * tabbar
 */
export interface Tabbar {
	id: number
	icon: string
	active: string
	name: PageNames
	title: string
	pagePath: string
}
