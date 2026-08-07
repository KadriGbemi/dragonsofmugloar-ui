<template>
  <div class="game-start-container">
    <Card class="game-start-card">
      <template #title>
        <h2 class="game-title">Enter Your Name</h2>
      </template>
      <template #content>
        <div class="input-wrapper">
          <FloatLabel>
            <InputText id="playerName" v-model="playerName" class="w-full" :invalid="showValidationError"
              :disabled="loading" @keyup.enter="handleStart" />
            <label for="playerName">Player Name</label>
          </FloatLabel>
          <small v-if="showValidationError" class="error-text">
            Please enter a name to continue
          </small>
          <Message v-if="error" severity="error" :closable="false" class="mt-2">
            {{ error.message }}
          </Message>
        </div>

        <Button label="Start Game" icon="pi pi-play" class="start-btn" :loading="loading" @click="handleStart" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import Message from 'primevue/message'

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

<style scoped>
.game-start-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.game-start-card {
  width: 100%;
  max-width: 400px;
}

.game-title {
  text-align: center;
  margin: 0;
}

.input-wrapper {
  margin-bottom: 1.5rem;
}

.error-text {
  color: var(--p-red-500);
  display: block;
  margin-top: 0.5rem;
}

.start-btn {
  width: 100%;
}
</style>
