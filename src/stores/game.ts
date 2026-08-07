import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { getGameApi } from '../api/game'
import { SESSION_KEYS } from '@/constants/session'
import type { Game, APIError } from '../types/game'

export const useGameStore = defineStore('game', () => {
  const game = ref<Game | null>(null)
  const loading = ref(false)
  const error = ref<APIError | null>(null)

  const playerId = ref('')
  const gameId = ref('')

  const setGame = (newGame: Game): void => {
    game.value = newGame
  }

  const getGame = async (id: string): Promise<Game> => {
    error.value = null
    loading.value = true

    try {
      const result = await getGameApi(id)
      game.value = result
      return result
    } catch (err) {
      error.value = err as APIError
      throw err
    } finally {
      loading.value = false
    }
  }

  watch(gameId, (newId) => {
    if (newId) {
      getGame(newId)
    }
  })

  const setGameSession = (playerId: string, gameId: string): void => {
    sessionStorage.setItem(SESSION_KEYS.PLAYERID, playerId)
    sessionStorage.setItem(SESSION_KEYS.GAMEID, gameId)
  }

  const restoreFromSession = (): boolean => {
    if (playerId.value && gameId.value) {
      return true
    }

    const storedPlayerId = sessionStorage.getItem(SESSION_KEYS.PLAYERID)
    const storedGameId = sessionStorage.getItem(SESSION_KEYS.GAMEID)

    if (!storedPlayerId || !storedGameId) {
      return false
    }

    playerId.value = storedPlayerId
    gameId.value = storedGameId

    return true
  }

  const clearGame = (): void => {
    game.value = null
    playerId.value = ''
    gameId.value = ''

    sessionStorage.removeItem(SESSION_KEYS.PLAYERID)
    sessionStorage.removeItem(SESSION_KEYS.GAMEID)
  }

  return {
    game,
    loading,
    error,
    playerId,
    gameId,
    setGame,
    getGame,
    setGameSession,
    restoreFromSession,
    clearGame,
  }
})
