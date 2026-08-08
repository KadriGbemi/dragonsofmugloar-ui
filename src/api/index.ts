import axios, { type AxiosInstance} from 'axios'
import { useGameErrorStore } from '@/stores/game.error'

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

http.interceptors.response.use(
  (response) => {
    const body = response.data

    if (
      body?.success === false &&
      ['expired', 'game_over'].includes(body?.error?.type)
    ) {
      const gameErrorStore = useGameErrorStore()

      gameErrorStore.setError(body.error)
    }

    return response
  },

  (error) => {
    const body = error.response?.data

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
