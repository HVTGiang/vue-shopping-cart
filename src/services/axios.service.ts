import { ENV_CONFIG } from '@/core/constants/app'
import axios, { type AxiosRequestConfig } from 'axios'
import { StatusCodes } from 'http-status-codes'
const instance = axios.create({
  baseURL: ENV_CONFIG.API_BASE_URL,
  headers: {
    'content-type': 'application/json'
  }
})

instance.interceptors.request.use(
  async (config: any) => {
    const token = 'token_from_some_where'
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const statusCode = response?.data?.status_code

    switch (statusCode) {
      case StatusCodes.BAD_REQUEST:
        return

      case StatusCodes.UNAUTHORIZED:
        return

      case StatusCodes.INTERNAL_SERVER_ERROR:
        return

      default:
      // return
    }

    return response?.data
  },
  (error) => {
    return error
  }
)

const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => {
    return instance<T>(url, { method: 'get', url, ...config })
  },
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return instance<T>(url, { method: 'post', url, data, ...config })
  }
}

export default api
