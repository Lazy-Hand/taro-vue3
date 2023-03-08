import axios from 'taro-axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'taro-axios'
import Taro from '@tarojs/taro'
import { useUserStore } from '@/store'
import { checkStatus } from '@/service/helper/checkStatus'
import type { ResultData } from '@/service/interface'
import RequestPort from '@/service/config/servicePort'
import { ResultEnum } from '@/service/config/httpEnum'
const userStore = useUserStore()
const config = {
	baseURL: RequestPort,
	timeout: ResultEnum.TIMEOUT as number,
	withCredentials: true
}
class Request {
	instance: AxiosInstance
	constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(config)
		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				Taro.showLoading({
					title: '加载中...',
					mask: true
				})
				if (userStore.token && config.headers) {
					config.headers.Authorization = userStore.token
				}
				return config
			},
			(err: AxiosError) => {
				return Promise.reject(err)
			}
		)
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response
				Taro.hideLoading()
				return data
			},
			(err: AxiosError) => {
				const { response } = err
				Taro.hideLoading()
				if (err.message.indexOf('timeout') !== -1)
					Taro.showToast({
						title: '请求超时！',
						icon: 'error',
						mask: true
					})
				if (response) checkStatus(response.status)
				return Promise.reject(err)
			}
		)
	}
	// 定义请求方法
	public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
		return this.instance.request(config)
	}
	public get<T>(url: string, config?: AxiosRequestConfig): Promise<ResultData<T>> {
		return this.instance.get(url, config)
	}
	public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResultData<T>> {
		return this.instance.post(url, data, config)
	}

	public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResultData<T>> {
		return this.instance.put(url, data, config)
	}

	public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResultData<T>> {
		return this.instance.delete(url, config)
	}
}

export default new Request(config)
