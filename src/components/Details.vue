<template>
  <div class="flex justify-center items-center min-h-screen p-6">
    <template v-if="game">
      <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-6">{{ game.playerName }}'s Game</h2>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col items-center justify-center gap-1 rounded-md bg-surface-50 dark:bg-surface-800 py-4">
            <span class="text-xs uppercase tracking-wide text-surface-500 dark:text-surface-400">Lives</span>
            <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">{{ game.lives }}</span>
          </div>
          <div class="flex flex-col items-center justify-center gap-1 rounded-md bg-surface-50 dark:bg-surface-800 py-4">
            <span class="text-xs uppercase tracking-wide text-surface-500 dark:text-surface-400">Gold</span>
            <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">{{ game.gold }}</span>
          </div>
          <div class="flex flex-col items-center justify-center gap-1 rounded-md bg-surface-50 dark:bg-surface-800 py-4">
            <span class="text-xs uppercase tracking-wide text-surface-500 dark:text-surface-400">Score</span>
            <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">{{ game.score }}</span>
          </div>
          <div class="flex flex-col items-center justify-center gap-1 rounded-md bg-surface-50 dark:bg-surface-800 py-4">
            <span class="text-xs uppercase tracking-wide text-surface-500 dark:text-surface-400">Turn</span>
            <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">{{ game.turn }}</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="w-full max-w-md flex flex-col items-center gap-4">
        <div class="w-full rounded-md border border-amber-200 bg-amber-50 text-amber-800 text-sm px-4 py-3">
          No active game found. Please start a new game.
        </div>

        <button
          type="button"
          @click="router.push('/')"
          class="mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 shadow-sm transition-colors"
        >
          <i class="pi pi-arrow-left text-xs"></i>
          Back to Start
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useGameStore } from '../stores/game'

const router = useRouter()

const gameStore = useGameStore()
const { game } = storeToRefs(gameStore)
</script>
