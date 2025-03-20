<template>
  <div class="flex flex-1 flex-col items-center gap-4">
    <div v-if="state.data.value?.role === AuthRole.CHANNEL_ADMIN" class="flex flex-col gap-4 w-full">
      <AdminStreamList v-model="selectedStream" />
      <AdminParticipationList :stream="selectedStream" />
    </div>

    <div v-if="state.data.value?.role === AuthRole.CHANNEL_USER" class="w-full">
      <UserParticipationList />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Stream } from '@prisma/client'
import { AuthRole } from '~/auth/types'

const { state, logout } = useAuth()

const selectedStream = ref<Stream>()
</script>
