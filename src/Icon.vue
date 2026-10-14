<script setup lang="ts">
defineProps<{ name?: 'arrow' | 'external' | 'menu' | 'close' | 'plus' | 'sun' | 'moon' }>()
</script>

<template>
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <g v-if="name === 'sun'"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" /></g>
    <path v-else-if="name === 'moon'" d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z" />
    <path v-else-if="name === 'external'" d="M14 4h6v6M20 4 10 14M10 4H4v16h16v-6" />
    <path v-else-if="name === 'menu'" d="M4 7h16M4 12h16M4 17h16" />
    <path v-else-if="name === 'close'" d="m5 5 14 14M19 5 5 19" />
    <path v-else-if="name === 'plus'" d="M12 5v14M5 12h14" />
    <path v-else d="M4 12h16m-6-6 6 6-6 6" />
  </svg>
</template>
