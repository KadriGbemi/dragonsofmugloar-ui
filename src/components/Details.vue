<template>
    <div class="game-view-container">
    <template v-if="game">
      <Card class="game-card">
        <template #title>
          <h2>{{ game.playerName }}'s Game</h2>
        </template>
        <template #content>
          <div class="stats-grid">
            <div class="stat">
              <span class="stat-label">Lives</span>
              <span class="stat-value">{{ game.lives }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Gold</span>
              <span class="stat-value">{{ game.gold }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Score</span>
              <span class="stat-value">{{ game.score }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Turn</span>
              <span class="stat-value">{{ game.turn }}</span>
            </div>
          </div>
        </template>
      </Card>
    </template>

    <template v-else>
      <Message severity="warn" :closable="false">
        No active game found. Please start a new game.
      </Message>
      <Button
        label="Back to Start"
        icon="pi pi-arrow-left"
        class="mt-3"
        @click="router.push('/')"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import Card from 'primevue/card';
import Bolt from '@primeicons/vue/bolt';
import Home from '@primeicons/vue/home';

const router = useRouter()
import { useGameStore } from '../stores/game'

const gameStore = useGameStore()
const { game } = storeToRefs(gameStore)
</script>
