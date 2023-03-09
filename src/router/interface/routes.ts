import pages from '../pages'
export interface Agreement {
	url: string
}
export type PageNames = keyof typeof pages
export type ObjectType<T> = T extends 'agreement' ? Agreement : never
