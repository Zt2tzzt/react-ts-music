/*
 * axios封装的2点好处。
 * 1. 如果axios某天不再维护，所有依赖axios的代码都不需要修改，只需要更改封装的代码。
 * 2. 发送请求代码，存在很多相同的逻辑。
 */
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ZTInternalRequestInterceptor, ZTInternalRequestConfig, ZTRequestConfig } from './type'

// const DEFAULT_LOADING = true

class ZTRequest {
  instance: AxiosInstance
  interceptors?: ZTInternalRequestInterceptor
  // showLoading: boolean

  constructor(config: ZTInternalRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    // this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptor

    // 使用拦截器（单个实例拦截器）
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 使用拦截器（全局拦截器）
    this.instance.interceptors.request.use(
      config => {
        // console.log('全局拦截，请求成功')
        /* if (this.showLoading) {
					this.loadingInstance = ElLoading.service({
						lock: true,
						text: '正在加载...',
						background: 'rgba(0,0,0,0.5)'
					})
				} */
        return config
      },
      err => {
        // console.log('全局拦截，请求失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      res => {
        // console.log('全局拦截，响应成功')
        // 关闭 loading 动画
        // this.loadingInstance?.close()
        const data = res.data
        return data
      },
      err => {
        // console.log('全局拦截，响应失败')
        // 关闭 loading 动画
        // this.loadingInstance?.close()
        return err
      }
    )
  }

  // 封装request方法
  request<T>(config: ZTRequestConfig<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptor?.requestInterceptor) {
        config = config.interceptor.requestInterceptor(config)
      }
      // 2.为单独的请求封装showloading功能，判断是否要显示loading，必须明确指定false，否则没设置showLoading，也会被判定为false。
      /* if (config.showLoading === false) {
				this.showLoading = config.showLoading
			} */

      this.instance
        .request<unknown, T>(config)
        // then方法中res，是经过全局拦截器处理后的数据，仅保留了data，所以类型不是AxiosResponse，所以在type中，responseInterceptor类型要调整。
        .then(res => {
          // 单个请求对数据的处理
          if (config.interceptor?.responseInterceptor) {
            res = config.interceptor.responseInterceptor(res)
          }
          // 将showLoading设置还原，不影响下一个请求
          // this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch(err => {
          // 将showLoading设置还原，不影响下一个请求
          // this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default ZTRequest

/**
 * 服务器返回失败的2种模式
	1. HttpErrorCode -> 在 resposeCatch 中拦截，返回一个 err -> err.respons.status
		- 2xx -> 成功
		- 4xx -> 失败
		- 5xx -> 一般指服务器端发生错误的失败
	2. HttpErrorCode
		- 200，数据 {data: "", success: false, returCode: -1001} - 在返回的数据中体现失败。
 */
