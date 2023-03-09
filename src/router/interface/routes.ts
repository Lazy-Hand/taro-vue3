import pages from '../pages'
export interface Car {
	id: number
}
export interface Agreement {
	url: string
}
export type PageNames = keyof typeof pages
export type ObjectType<T> = T extends 'car' ? Car : T extends 'agreement' ? Agreement : never
