<template>
  <div class="flex flex-1">
    <StreamerIndexView v-if="state.data.value?.role === AuthRole.CHANNEL_STREAMER" />
    <ViewerIndexView v-if="state.data.value?.role === AuthRole.CHANNEL_VIEWER" />
  </div>
</template>

<script setup lang="ts">
import { AuthRole } from '~/auth/types'

const { state } = useAuth()
</script>
