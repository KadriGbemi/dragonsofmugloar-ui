import { http } from './index'
import type { APIResponse } from '../types/game'
import type { Ad } from '../types/ads'

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
