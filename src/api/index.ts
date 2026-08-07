import axios, { type AxiosInstance, type AxiosError } from 'axios'
import type { APIError, APIResponse } from '../types/game'

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL)

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<APIResponse<unknown>>) => {
    const body = error.response?.data

    if (body && body.success === false) {
      return Promise.reject(body.error)
    }

    const apiError: APIError = {
      message: error.message || 'Network error. Please check your connection.',
      status: error.response?.status ?? 0,
      type: 'NETWORK_ERROR'
    }
    return Promise.reject(apiError)
  }
)
