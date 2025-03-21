<template>
  <div class="flex flex-col gap-4 w-full">
    <StreamerStreamsList v-model="selectedStream" />
    <StreamerParticipationList :stream="selectedStream" />
  </div>
</template>

<script setup lang="ts">
import type { Stream } from '@prisma/client'

const selectedStream = ref<Stream>()
</script>
