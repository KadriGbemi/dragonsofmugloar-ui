import { http } from './index'
import type { APIResponse, Game } from '../types/game'

export const startGameApi = async (playerName: string): Promise<Game> => {
  const res = await http.post<APIResponse<Game>>(
    `/game/start/${encodeURIComponent(playerName)}`
  )
  const body = res.data
  if (!body.success) throw body.error
  return body.data
}
