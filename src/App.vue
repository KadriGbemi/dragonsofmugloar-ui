<template>

  <GameStatusError v-if="gameErrorStore.error" />

  <div v-else>
    <nav v-if="route.meta.showBreadcrumb" class="border-b border-gray-200">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
          <li class="me-2">
            <button type="button" @click="router.push({ name: 'start' })" :class="[
              'inline-flex items-center justify-center p-4 border-b rounded-t-md group transition-colors',
              route.name === 'start'
                ? 'text-indigo-600 border-indigo-600'
                : 'text-gray-500 border-transparent hover:text-indigo-600 hover:border-indigo-300'
            ]">
              <i class="pi pi-home text-sm"></i>
            </button>
          </li>

          <li v-for="item in items" :key="item.label" class="me-2">
            <button type="button" @click="item.command" :class="[
              'inline-flex items-center justify-center p-4 border-b rounded-t-md group transition-colors',
              route.name === item.routeName
                ? 'text-indigo-600 border-indigo-600'
                : 'text-gray-500 border-transparent hover:text-indigo-600 hover:border-indigo-300'
            ]" :aria-current="route.name === item.routeName ? 'page' : undefined">
              <i v-if="item.icon" :class="[
                'pi',
                item.icon,
                'text-xs me-2',
                route.name === item.routeName ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-600'
              ]"></i>
              {{ item.label }}
            </button>
          </li>
        </ul>

        <!-- Player Stats -->
        <div v-if="gameStore.game" class="flex items-center gap-4 pe-2 text-sm text-gray-600">
          <span class="font-medium text-gray-900">
            Hi, {{ gameStore.game.playerName }}
          </span>

          <span class="inline-flex items-center gap-1.5">
            <i class="pi pi-star text-amber-500 text-xs"></i>
            Score: {{ gameStore.game.score }}
          </span>

          <span class="inline-flex items-center gap-1.5">
            <i class="pi pi-bolt text-amber-500 text-xs"></i>
            Gold: {{ gameStore.game.gold }}
          </span>

          <span class="inline-flex items-center gap-1.5">
            <i class="pi pi-heart-fill text-red-500 text-xs"></i>
            Lives: {{ gameStore.game.lives }}
          </span>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import GameStatusError from './components/GameStatusError.vue'
import { useGameErrorStore } from './stores/game.error'
import { useGameStore } from './stores/game'

const gameErrorStore = useGameErrorStore()
const gameStore = useGameStore()

const route = useRoute()
const router = useRouter()

const items = computed(() => [
  {
    label: 'Ads',
    routeName: 'ads',
    command: () => router.push({ name: 'ads' })
  },
  {
    label: 'Shop',
    routeName: 'shop',
    icon: 'pi-bolt',
    command: () => router.push({ name: 'shop' })
  },
  {
    label: 'History',
    routeName: 'history',
    command: () => router.push({ name: 'history' })
  },
  {
    label: 'Reputation',
    routeName: 'reputation',
    command: () => router.push({ name: 'reputation' })
  }
])
</script>
