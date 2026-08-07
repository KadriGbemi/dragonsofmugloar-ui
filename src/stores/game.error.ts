import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { APIError } from '@/types/game'

export const useGameErrorStore = defineStore('gameError', () => {
  const error = ref<APIError | null>(null)

  const setError = (newError: APIError) => {
    error.value = newError
  }

  const clearError = () => {
    error.value = null
  }

  return {
    error,
    setError,
    clearError,
  }
})
