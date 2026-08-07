import axios, { type AxiosInstance, type AxiosError } from 'axios'
import type { APIError, APIResponse } from '../types/game'
import { useGameErrorStore } from '@/stores/game.error'

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL)

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

http.interceptors.response.use(
  (response) => {
    const body = response.data

    console.log("HTTP Success Response:", body)

    if (
      body?.success === false &&
      ['expired', 'game_over'].includes(body?.error?.type)
    ) {
      const gameErrorStore = useGameErrorStore()

      gameErrorStore.setError(body.error)
    }

    return response
  },

  (error: AxiosError<APIResponse<never>>) => {
    const body = error.response?.data

    console.log("HTTP Error Response:", body)

    if (
      body?.success === false &&
      ['expired', 'game_over'].includes(body?.error?.type ?? '')
    ) {
      const gameErrorStore = useGameErrorStore()

      gameErrorStore.setError(body.error)
    }

    return Promise.reject(body?.error ?? error)
  }
)
