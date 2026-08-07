import { ref } from 'vue'
import { getShopListApi  } from '../api/shop'
import type { ShopListResponse } from '../types/shop'
import { useGameStore } from '../stores/game'
import type { APIError } from '@/types/game'

export function useShopList() {
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
