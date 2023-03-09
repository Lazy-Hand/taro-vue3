class Validate {
	/**
	 * @description 正则表达式
	 */
	reg: RegExp

	constructor() {}

	/**
	 * @description 手机号正则
	 * @param {String} phone 待验证手机号
	 */
	checkPhoneNumber(phone: string) {
		this.reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
		if (phone && !this.reg.test(phone)) {
			return false
		}
		return true
	}
}

export default new Validate()
