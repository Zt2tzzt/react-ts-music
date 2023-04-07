import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

export interface ZTInternalRequestInterceptor<T = AxiosResponse, R = unknown> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: R) => R
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: R) => R
}

export interface ZTInternalRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: ZTInternalRequestInterceptor<T>
  showLoading?: boolean
}

export interface ZTRequestInterceptor<T = AxiosResponse, R = unknown> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: R) => R
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: R) => R
}

export interface ZTRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: ZTRequestInterceptor<T>
  showLoading?: boolean
}
