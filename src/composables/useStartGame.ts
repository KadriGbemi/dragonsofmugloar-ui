import { ref, type Ref } from 'vue'
import { startGameApi } from '../api/game'
import type { Game, APIError } from '../types/game'

interface UseStartGameReturn {
  startGame: (playerName: string) => Promise<Game>
  loading: Ref<boolean>
  error: Ref<APIError | null>
  game: Ref<Game | null>
}

export const useStartGame = (): UseStartGameReturn => {
  const loading = ref(false)
  const error = ref<APIError | null>(null)
  const game = ref<Game | null>(null)

  const startGame = async (playerName: string): Promise<Game> => {
    error.value = null
    loading.value = true

    try {
      const result = await startGameApi(playerName)
      game.value = result
      return result
    } catch (err) {
      error.value = err as APIError
      throw err
    } finally {
      loading.value = false
    }
  }

  return { startGame, loading, error, game }
}
