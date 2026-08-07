import { ref, type Ref } from 'vue'
import { getAdsApi, solveAdApi } from '@/api/ads'
import type { Ad, SolveAdResponse } from '@/types/ads'
import { useGameStore } from '@/stores/game'
import type { APIError } from '@/types/game'

export const useAds = () => {
  const ads = ref<Ad[]>([])
  const loading = ref(false)
  const error = ref<APIError | null>(null)

  const gameStore = useGameStore()

  const fetchAds = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      ads.value = await getAdsApi(gameStore.gameId)

    } catch (err) {
      error.value = err as APIError
    } finally {
      loading.value = false
    }
  }

  return {
    ads,
    loading,
    error,
    fetchAds
  }
}

interface UseSolveAdReturn {
  solveAd: (gameId: string, adId: string) => Promise<SolveAdResponse>
  loading: Ref<boolean>
  error: Ref<APIError | null>
  result: Ref<SolveAdResponse | null>
  clearError: Function
}

export const useSolveAd = (): UseSolveAdReturn => {
  const loading = ref(false)
  const error = ref<APIError | null>(null)
  const result = ref<SolveAdResponse | null>(null)

  const solveAd = async (gameId: string, adId: string): Promise<SolveAdResponse> => {
    error.value = null
    loading.value = true

    try {
      const data = await solveAdApi(gameId, adId)
      result.value = data
      return data
    } catch (err) {
      error.value = err as APIError
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = (): void => {
    error.value = null
  }

  return { solveAd, loading, error, result, clearError }
}
