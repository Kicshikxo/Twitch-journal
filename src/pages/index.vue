<template>
  <div class="flex flex-1 flex-col items-center gap-4">
    <div v-if="state.data.value?.role === AuthRole.CHANNEL_STREAMER" class="flex flex-col gap-4 w-full">
      <StreamerStreamsList v-model="selectedStream" />
      <StreamerParticipationList :stream="selectedStream" />
    </div>

    <div v-if="state.data.value?.role === AuthRole.CHANNEL_VIEWER" class="w-full">
      <ViewerParticipationsList />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Stream } from '@prisma/client'
import { AuthRole } from '~/auth/types'

const { state } = useAuth()

const selectedStream = ref<Stream>()
</script>
