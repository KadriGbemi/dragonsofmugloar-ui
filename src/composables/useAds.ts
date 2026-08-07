import { ref } from 'vue'
import { getAdsApi } from '../api/ads'
import type { Ad } from '../types/ads'
import { useGameStore } from '../stores/game'
import type { APIError } from '@/types/game'

export function useAds() {
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
    fetchAds,
  }
}
