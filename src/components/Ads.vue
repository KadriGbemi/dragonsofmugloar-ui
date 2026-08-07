<template>
  <div>Ads compoenent</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAds } from '../composables/useAds'

const {
  ads,
  loading,
  error,
  fetchAds,
} = useAds()

onMounted(() => {
  fetchAds()
})

console.log('ads', ads.value, 'loading', loading.value, 'error', error.value)
</script>
