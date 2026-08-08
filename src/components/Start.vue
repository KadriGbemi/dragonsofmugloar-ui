<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Dragons of Mugloar Game</h2>
    </div>

    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <div v-if="error" class="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
            {{ error.message }}
          </div>

          <div class="relative">
            <input id="playerName" v-model="playerName" type="text" :disabled="loading" @keyup.enter="handleStart"
              placeholder="" :class="[
                'peer block w-full rounded-md bg-white px-3 pt-5 pb-2 text-base text-gray-900 outline-1 -outline-offset-1 sm:text-sm/6 transition-colors',
                'focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600',
                showValidationError ? 'outline-red-500' : 'outline-gray-300',
                loading ? 'opacity-60 cursor-not-allowed' : ''
              ]" />
            <label for="playerName" class="absolute left-3 top-2 text-xs text-gray-500 transition-all
                     peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                     peer-placeholder-shown:text-gray-400
                     peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600">
              Enter Player Name
            </label>
          </div>

          <small v-if="showValidationError" class="block mt-2 text-red-500 text-sm">
            Please enter a name to continue
          </small>
        </div>

        <div>
          <button type="button" :disabled="loading" @click="handleStart" class="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5
                   text-sm/6 font-semibold text-white shadow-xs transition-colors
                   hover:bg-indigo-500 cursor-pointer
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                   disabled:opacity-60 disabled:cursor-not-allowed">
            <svg v-if="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span v-else>▶</span>
            Start Game
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useStartGame } from '../composables/useStartGame'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const router = useRouter()

const playerName = ref<string>('')
const showValidationError = ref<boolean>(false)

const { startGame, loading, error } = useStartGame()

const handleStart = async (): Promise<void> => {
  const name = playerName.value.trim()
  if (!name) {
    showValidationError.value = true
    return
  }
  showValidationError.value = false

  const response = await startGame(name)

  if (response) {
    gameStore.setGame(response)
    gameStore.setGameSession(response.playerId, response.gameId)
    router.push('/ads')
  }
}
</script>
