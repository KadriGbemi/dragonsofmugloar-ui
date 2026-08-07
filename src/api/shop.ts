import { http } from './index'
import type { APIResponse } from '../types/game'
import type { ShopListResponse, PurchaseShopItemResponse } from '../types/shop'

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


export const purchaseItem = async (
  gameId: string,
  itemId: string
): Promise<PurchaseShopItemResponse> => {
  const res = await http.post<APIResponse<PurchaseShopItemResponse>>(
    `/shop/${encodeURIComponent(gameId)}/buy/${encodeURIComponent(itemId)}`
  )
  const body = res.data
  if (!body.success) throw body.error
  return body.data
}
