<script setup lang="ts">
import { onMounted } from 'vue'

import { useShopList } from '../composables/useShop'

const {
  shopList,
  loading,
  error,
  fetchShopList,
} = useShopList()

onMounted(() => {
  fetchShopList()
})

const purchaseItem = (itemId: string) => {
  console.log('Purchase Item:', itemId)
}
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center p-12 gap-4"
    >
      <svg
        class="animate-spin text-indigo-600"
        style="width: 50px; height: 50px"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span class="text-gray-500 text-sm font-medium">Loading shop items...</span>
    </div>

    <div
      v-else-if="error"
      class="mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3"
    >
      {{ error.message || 'Failed to load shop items.' }}
    </div>

    <!-- Empty State -->
    <div
      v-else-if="shopList.length === 0"
      class="rounded-md border border-blue-200 bg-blue-50 text-blue-700 text-sm px-4 py-3"
    >
      No shop items available right now. Check back later!
    </div>

    <!-- Data List -->
    <ul v-else role="list" class="divide-y divide-gray-100">
      <li
        v-for="item in shopList"
        :key="item.id"
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-x-6 gap-y-4 py-5"
      >
        <div class="min-w-0 flex-auto">
          <p class="text-xs font-semibold text-indigo-600 tracking-wider uppercase">
            Shop Item
          </p>
          <p class="mt-1 text-sm/6 font-semibold text-gray-900">{{ item.name }}</p>
        </div>

        <!-- Action Layout -->
        <div class="flex shrink-0 items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-4">
          <div class="flex flex-col sm:items-end">
            <p class="text-xs/5 text-gray-500">Cost</p>
            <p class="text-sm/6 font-semibold text-emerald-600">
              {{ item.cost }} <span class="font-medium text-gray-500">pts</span>
            </p>
          </div>

          <button
            type="button"
            @click="purchaseItem(item.id)"
            class="whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-3 py-1.5 shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <i class="pi pi-shopping-cart text-xs"></i>
            Purchase Item
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
