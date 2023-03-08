import pages from '../pages'
export interface Car {
	id: number
}
export type PageNames = keyof typeof pages
export type ObjectType<T> = T extends 'car' ? Car : never
