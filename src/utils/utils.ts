class Util {
	private flag: boolean
	private timeout: NodeJS.Timeout | null
	private timer: NodeJS.Timeout | null
	constructor() {
		this.timer = null
		this.timeout = null
		this.flag = false
	}
	/**
	 * @description 节流原理：在一定时间内，只能触发一次
	 * @param event 事件执行函数
	 * @param immediate 是否立即执行
	 * @param wait 节流时间
	 * @param info 事件参数
	 */
	throttle(event: (info: any) => void, immediate: boolean = true, wait: number = 500, info?: any) {
		console.log(this.timer)

		if (immediate) {
			if (!this.flag) {
				this.flag = true
				typeof event === 'function' && event(info)
				this.timer = setTimeout(() => {
					this.flag = false
				}, wait)
			}
		} else if (!this.flag) {
			this.flag = true
			this.timer = setTimeout(() => {
				this.flag = false
				typeof event === 'function' && event(info)
			}, wait)
		}
	}
	/**
	 * @description  防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
	 * @param event 事件执行函数
	 * @param immediate 是否立即执行
	 * @param wait 防抖时间
	 * @param info 事件参数
	 */
	debounce(event: (info: any) => void, immediate: boolean = true, wait: number = 500, info?: any) {
		if (this.timeout !== null) clearTimeout(this.timeout)
		if (immediate) {
			const callNow = !this.timeout
			this.timeout = setTimeout(() => {
				this.timeout = null
			}, wait)
			if (callNow) typeof event === 'function' && event(info)
		} else {
			this.timeout = setTimeout(() => {
				typeof event === 'function' && event(info)
			}, wait)
		}
	}
}

export default new Util()
