import { http } from './index'
import type { APIResponse } from '../types/game'
import type { ShopListResponse } from '../types/shop'

export const getShopListApi = async (
  gameId: string
): Promise<ShopListResponse > => {
  const res = await http.get<APIResponse<ShopListResponse>>(
    `/shop/list/${gameId}`
  )

  const body = res.data

  if (!body.success) {
    throw body.error
  }

  return body.data
}
