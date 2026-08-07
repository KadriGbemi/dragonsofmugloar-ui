import { ref, type Ref } from 'vue'
import { getShopListApi, purchaseItem  } from '../api/shop'
import type { ShopListResponse, PurchaseShopItemResponse } from '../types/shop'
import { useGameStore } from '../stores/game'
import type { APIError } from '@/types/game'

export const useShopList = () => {
  const shopList = ref<ShopListResponse>([])
  const loading = ref(false)
  const error = ref<APIError | null>(null)

  const gameStore = useGameStore()

  const fetchShopList = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      shopList.value = await getShopListApi(gameStore.gameId)

    } catch (err) {
      error.value = err as APIError
    } finally {
      loading.value = false
    }
  }


  return {
    shopList,
    loading,
    error,
    fetchShopList,
  }
}

interface UsePurchaseShopItemReturn {
  purchaseShopItem: (gameId: string, adId: string) => Promise<PurchaseShopItemResponse>
  loading: Ref<boolean>
  error: Ref<APIError | null>
  result: Ref<PurchaseShopItemResponse | null>
  clearError: Function
}

export const usePurchaseShopItem = (): UsePurchaseShopItemReturn => {
  const loading = ref(false)
  const error = ref<APIError | null>(null)
  const result = ref<PurchaseShopItemResponse | null>(null)

  const purchaseShopItem = async (gameId: string, adId: string): Promise<PurchaseShopItemResponse> => {
    error.value = null
    loading.value = true

    try {
      const data = await purchaseItem(gameId, adId)
      result.value = data
      return data
    } catch (err) {
      error.value = err as APIError
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = (): void => {
    error.value = null
  }

  return { purchaseShopItem, loading, error, result, clearError }
}
