<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <div v-if="state.data.value?.role === AuthRole.CHANNEL_ADMIN">Admin</div>

    <div v-if="state.data.value?.role === AuthRole.CHANNEL_USER">User</div>

    <Button label="logout" @click="logout({ redirectTo: '/auth' })" />
  </div>
</template>

<script setup lang="ts">
import { AuthRole } from '~/auth/types'

const { state, logout } = useAuth()
</script>
