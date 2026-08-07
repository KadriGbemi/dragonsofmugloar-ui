import { ref, type Ref } from 'vue'
import { getGameApi } from '../api/game'
import type { Game, APIError } from '../types/game'

interface UseGetGameReturn {
  getGame: (gameId: string) => Promise<Game>
  loading: Ref<boolean>
  error: Ref<APIError | null>
  game: Ref<Game | null>
}

export const useGetGame = (): UseGetGameReturn => {
  const loading = ref(false)
  const error = ref<APIError | null>(null)
  const game = ref<Game | null>(null)

  const getGame = async (gameId: string): Promise<Game> => {
    error.value = null
    loading.value = true

    try {
      const result = await getGameApi(gameId)
      game.value = result
      return result
    } catch (err) {
      error.value = err as APIError
      throw err
    } finally {
      loading.value = false
    }
  }

  return { getGame, loading, error, game }
}
