<template>
  <main class="relative min-h-screen bg-slate-10 font-inter antialiased">
    <div class="mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-14">
 
      <!-- header -->
      <div class="mb-12">
        <div class="text-2xl font-medium text-indigo-500">Game history</div>
        <h1 class="text-3xl font-bold text-slate-900">Recent game runs</h1>
        <p v-if="!loading && !error" class="mt-1 text-sm text-slate-500">
          {{ games.length }} run{{ games.length === 1 ? '' : 's' }} recorded
        </p>
      </div>
 
      <!-- loading state -->
      <div v-if="loading" class="space-y-8">
        <div v-for="n in 4" :key="n" class="flex items-center gap-4 md:gap-6">
          <div class="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200" />
          <div class="h-20 w-full animate-pulse rounded border border-slate-200 bg-slate-100" />
        </div>
      </div>
 
      <!-- error state -->
      <div
        v-else-if="error"
        class="flex flex-col items-center gap-2 rounded border border-rose-200 bg-rose-50 px-6 py-14 text-center"
      >
        <svg class="h-7 w-7 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <p class="font-bold text-slate-900">Couldn't load the log</p>
        <p class="max-w-sm text-sm text-slate-500">
          {{ typeof error === 'string' ? error : (error?.message || 'Something went wrong fetching game data.') }}
        </p>
      </div>
 
      <!-- empty state -->
      <div
        v-else-if="!games.length"
        class="flex flex-col items-center gap-1 rounded border border-dashed border-slate-300 px-6 py-16 text-center"
      >
        <p class="font-bold text-slate-900">No runs yet</p>
        <p class="text-sm text-slate-500">Start a game to see it appear here.</p>
      </div>
 
      <!-- vertical timeline -->
      <div
        v-else
        class="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent md:before:ml-[8.75rem]"
      >
        <div v-for="game in games" :key="game._id" class="relative">
          <div class="mb-3 items-center md:flex md:space-x-4">
            <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
              <!-- icon -->
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow md:order-1">
                <svg class="h-4 w-4 fill-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2c-.4 2.6-2 4-3.5 5.5C7 9 6 10.6 6 13a6 6 0 0 0 12 0c0-1.8-.7-3-1.7-4.3.2 1.4-.3 2.4-1.1 3-.2-2.6-1.2-4.3-3.2-6.2C13 4.4 12.6 3.3 12 2Zm0 6.5c.6.8 1 1.6 1 2.7a1 1 0 1 1-2 0c0-.5.2-1 .5-1.6.2-.4.3-.7.5-1.1Z" />
                </svg>
              </div>
              <!-- date -->
              <time class="text-md font-medium text-indigo-500 md:w-28">
                {{ formatDate(game.createdAt) }}
              </time>
            </div>
            <!-- title -->
            <div class="ml-10 text-slate-500 md:ml-0">
              <span class="font-bold text-slate-900">{{ game?.playerName || 'Unnamed rider' }}</span>
              reached level {{ game.level }}, turn {{ game.turn }}
            </div>
          </div>
 
          <!-- card -->
          <div class="ml-14 rounded border border-slate-100 bg-white p-4 shadow-2 md:ml-44">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <!-- lives -->
              <div class="flex items-center gap-1">
                <svg
                  v-for="i in MAX_LIVES"
                  :key="i"
                  class="h-4 w-4"
                  :class="i <= game.lives ? 'fill-rose-500' : 'fill-slate-200'"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21s-6.716-4.35-9.428-8.03C.803 10.49 1.08 7.36 3.343 5.6 5.51 3.92 8.5 4.36 10 6.2l2 2.44 2-2.44c1.5-1.84 4.49-2.28 6.657-.6 2.263 1.76 2.54 4.89.77 7.37C18.716 16.65 12 21 12 21Z" />
                </svg>
              </div>
              <time class="text-xs text-slate-400">{{ formatTime(game.createdAt) }}</time>
            </div>
 
            <dl class="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-100 pt-3 sm:grid-cols-5">
              <div>
                <dt class="text-xs text-slate-400">Gold</dt>
                <dd class="font-bold text-amber-500">{{ game.gold }}</dd>
              </div>
              <div>
                <dt class="text-xs text-slate-400">Score</dt>
                <dd class="font-bold text-slate-900">{{ game.score }}</dd>
              </div>
              <div>
                <dt class="text-xs text-slate-400">Lives</dt>
                <dd class="font-bold text-yellow-500">{{ game.lives}}</dd>
              </div> 
              <div>
                <dt class="text-xs text-slate-400">Best</dt>
                <dd class="font-bold text-emerald-500">{{ game.highScore }}</dd>
              </div>
              <div>
                <dt class="text-xs text-slate-400">Turn</dt>
                <dd class="truncate font-mono text-xs text-slate-400">{{ game.turn }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
 
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHistory } from '../composables/useHistory'

const {
  games,
  loading,
  error,
  fetchHistory
} = useHistory()

onMounted(() => {
  fetchHistory()
})

const formatDate = (iso: Date): string => {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
 
const formatTime = (iso: Date): string => {
  const d = new Date(iso)
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}
 
const MAX_LIVES = 3
</script>