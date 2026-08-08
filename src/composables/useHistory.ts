import { ref } from 'vue'
import { getHistoryApi } from '@/api/game'
import type { Game } from '@/types/game'
import { useGameStore } from '@/stores/game'
import type { APIError } from '@/types/game'

export const useHistory = () => {
  const games = ref<Game[]>([])
  const loading = ref(false)
  const error = ref<APIError | null>(null)

  const gameStore = useGameStore()

  const fetchHistory = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      games.value = await getHistoryApi(gameStore.playerId)

    } catch (err) {
      error.value = err as APIError
    } finally {
      loading.value = false
    }
  }

  return {
    games,
    loading,
    error,
    fetchHistory
  }
}