import ZTRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const ztRequest = new ZTRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestInterceptor(config) {
      // console.log('单例拦截，请求成功')
      /* const token = localCache.getCache(LOGIN_TOKEN)
			if (config.headers && token) {
				config.headers.Authorization = `Bearer ${token}`
			} */
      return config
    },
    requestInterceptorCatch(err) {
      // console.log('单例拦截，请求失败')
      return err
    },
    responseInterceptor(res) {
      // console.log('单例拦截，响应成功')
      return res
    },
    responseInterceptorCatch(err) {
      // console.log('单例拦截，响应失败')
      return err
    }
  }
})

export default ztRequest
