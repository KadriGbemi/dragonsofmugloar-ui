<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGameErrorStore } from '@/stores/game.error'
import { useGameStore } from '@/stores/game'

const router = useRouter()

const gameErrorStore = useGameErrorStore()
const gameStore = useGameStore()


const startNewGame = () => {
  gameErrorStore.clearError()
  gameStore.clearGame()

  router.push({
    name: 'start'
  })
}
</script>


<template>
  <div class="flex flex-col items-center gap-4 p-6">

    <h2 class="text-xl font-bold">
      {{
        gameErrorStore.error?.type === 'game_over'
          ? 'Game Over'
          : 'Game Expired'
      }}
    </h2>


    <p>
      {{ gameErrorStore.error?.message }}
    </p>


    <button
      type="button"
      @click="startNewGame"
      class="inline-flex items-center justify-center gap-2 rounded-md bg-primary hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 shadow-sm transition-colors"
    >
      <i class="pi pi-refresh text-xs"></i>
      Start New Game
    </button>

  </div>
</template>
