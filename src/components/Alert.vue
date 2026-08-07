<template>
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="shrink-0">
        <svg class="size-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">{{ title }}</h3>
        <div class="mt-2 text-sm text-red-700">
          <p>{{ message }}</p>
        </div>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button type="button" @click="$emit('dismiss')"
            class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            <span class="sr-only">Dismiss</span>
            <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
}>()

defineEmits<{
  dismiss: []
}>()
</script>