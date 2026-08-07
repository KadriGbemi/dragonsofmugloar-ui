<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div v-if="loading || solveLoading" class="flex flex-col items-center justify-center p-12 gap-4">
      <svg class="animate-spin text-indigo-600" style="width: 50px; height: 50px" xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span class="text-gray-500 text-sm font-medium">Loading missions...</span>
    </div>

    <div v-else-if="error" class="mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
      {{ error.message || 'Failed to load advertisements.' }}
    </div>

    <!-- Empty State -->
    <div v-else-if="ads.length === 0"
      class="rounded-md border border-blue-200 bg-blue-50 text-blue-700 text-sm px-4 py-3">
      No advertisement missions available right now. Check back later!
    </div>

    <!-- Data List -->
    <ul v-else role="list" class="divide-y divide-gray-100">
      <li v-for="ad in ads" :key="ad.adId"
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-x-6 gap-y-4 py-5">
        <div class="flex min-w-0 gap-x-4">
          <div class="min-w-0 flex-auto">
            <p class="text-xs font-semibold text-indigo-600 tracking-wider uppercase">
              Advertisement Mission
            </p>
            <p class="mt-1 text-sm/6 font-semibold text-gray-900">{{ ad.message }}</p>

            <div class="mt-2 flex flex-wrap gap-2 items-center" v-if="ad.probability">
              <span
                class="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1">
                <i class="pi pi-percentage text-[10px]"></i>
                Complexity: {{ ad.probability }}
              </span>
              <span :class="[
                'inline-flex items-center gap-1 rounded-full text-xs font-medium px-2.5 py-1',
                ad.expiresIn <= 2
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-blue-100 text-blue-800'
              ]">
                <i class="pi pi-clock text-[10px]"></i>
                {{ ad.expiresIn }} days left
              </span>
              <span
                class="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-1">
                <i class="pi pi-star text-[10px]"></i>
                {{ ad.reward }}
              </span>
            </div>
          </div>
        </div>

        <!-- Action Layout -->
        <div class="flex shrink-0 items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-4">
          <div class="flex flex-col sm:items-end">
            <p class="text-xs/5 text-gray-500">Potential Reward</p>
            <p class="text-sm/6 font-semibold text-emerald-600">
              +{{ ad.reward }} <span class="font-medium text-gray-500">pts</span>
            </p>
          </div>

          <button type="button" @click="solveGame(ad.adId)"
            class="whitespace-nowrap inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-3 py-1.5 shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <i class="pi pi-play text-xs"></i>
            Play Mission
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useAds, useSolveAd } from '../composables/useAds'
const gameStore = useGameStore()

const {
  ads,
  loading,
  error,
  fetchAds,
} = useAds()

const {
  solveAd,
  loading: solveLoading,
  error: solveError,
} = useSolveAd()

onMounted(() => {
  fetchAds()
})

const solveGame = async (adId: string) => {
  const result = await solveAd(gameStore.gameId, adId)

  if (result && gameStore.game) {
    gameStore.setGame({
      ...gameStore.game,
      gold: result.gold,
      highScore: result.highScore,
      lives: result.lives,
      score: result.score,
      turn: result.turn,
    })
  }

  fetchAds();
}
</script>
