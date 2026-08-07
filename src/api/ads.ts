import { http } from './index'
import type { APIResponse } from '../types/game'
import type { Ad, SolveAdResponse } from '../types/ads'

export const getAdsApi = async (
  gameId: string
): Promise<Ad[]> => {
  const res = await http.get<APIResponse<Ad[]>>(
    `/ads/${gameId}/messages`
  )

  const body = res.data

  if (!body.success) {
    throw body.error
  }

  return body.data
}

export const solveAdApi = async (
  gameId: string,
  adId: string
): Promise<SolveAdResponse> => {
  const res = await http.post<APIResponse<SolveAdResponse>>(
    `/ads/${encodeURIComponent(gameId)}/solve/${encodeURIComponent(adId)}`
  )
  const body = res.data
  if (!body.success) throw body.error
  return body.data
}
