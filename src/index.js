export const createService = config => {
  const service = {
    default: {
      baseURL: '',
      header: {}
    },
    interceptors: {
      request: {
        use(handler) {
          this.handler = handler
        }
      },
      response: {
        use(handler, onerror) {
          this.handler = handler
          this.onerror = onerror
        }
      }
    },
    async request(options) {
      try {
        const requestInterceptor = this.interceptors.request
        const requestInterceptorHandler = requestInterceptor.handler
        const responseInterceptor = this.interceptors.response
        const responseInterceptorHandler = responseInterceptor.handler

        let _options = { ...this.default, ...config, ...options }
        _options.url = _options.baseURL + options.url

        if (typeof requestInterceptorHandler === 'function') {
          _options = requestInterceptorHandler.call(requestInterceptor, _options) || _options
        }

        let response = await uni.request(_options)

        // 当状态码非200时，应使用响应拦截的错误拦截
        if (response.statusCode !== 200) {
          return await Promise.reject(response)
        }

        if (typeof responseInterceptorHandler === 'function') {
          response = responseInterceptorHandler.call(responseInterceptor, response)
        }

        return response
      } catch (error) {
        const responseInterceptor = this.interceptors.response
        const responseInterceptorOnerror = responseInterceptor.onerror
        if (typeof responseInterceptorOnerror === 'function') {
          responseInterceptorOnerror.call(responseInterceptor, error)
        }
      }
    },
    get(url, data, options = {}) {
      return this.request({ url, data, method: 'GET', ...options })
    },
    post(url, data, options = {}) {
      return this.request({ url, data, method: 'POST', ...options })
    },
    put(url, data, options = {}) {
      return this.request({ url, data, method: 'PUT', ...options })
    },
    delete(url, data, options = {}) {
      return this.request({ url, data, method: 'DELETE', ...options })
    }
  }
  return service
}
