<template>
  <Menubar :model="items" class="app-menubar" v-if="route.meta.showBreadcrumb">
    <template #start>
      <Button icon="pi pi-home" text @click="router.push({ name: 'start' })" />
    </template>
  </Menubar>
  <RouterView />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import type { MenuItem } from 'primevue/menuitem'
import Bolt from '@primeicons/vue/bolt'

const route = useRoute()
const router = useRouter()

const items = computed<MenuItem[]>(() => [
  {
    label: 'Ads',
    command: () => router.push({ name: 'ads' })
  },
  {
    icon: Bolt,
    label: 'Shop',
    command: () => router.push({ name: 'shop' })
  },
  {
    label: 'History',
    command: () => router.push({ name: 'history' })
  },
  {
    label: 'Reputation',
    command: () => router.push({ name: 'reputation' })
  }
])
</script>

<style scoped>
.app-menubar {
  margin-bottom: 1.5rem;
}
</style>
