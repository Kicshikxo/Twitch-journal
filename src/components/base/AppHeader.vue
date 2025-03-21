<template>
  <header class="flex items-center justify-end p-4">
    <transition name="transition-fade" mode="out-in">
      <div v-if="state.status.value === 'authenticated'" class="flex flex-1 justify-between">
        <NuxtLink to="/">
          <Chip>
            <Icon name="prime:user" size="1.25rem" />
            <span>{{ state.data.value?.username }}</span>
            <NuxtLink v-if="state.data.value?.role === AuthRole.CHANNEL_STREAMER && state.data.value?.username === state.data.value?.channel" to="/channel" class="flex">
              <Button text rounded class="p-0" style="width: 24px; height: 24px">
                <template #icon>
                  <Icon name="prime:cog" size="1.25rem" />
                </template>
              </Button>
            </NuxtLink>
          </Chip>
        </NuxtLink>
        <Button text label="Выйти" @click="logout({ redirectTo: '/auth' })">
          <template #icon>
            <Icon name="prime:sign-out" />
          </template>
        </Button>
      </div>
    </transition>

    <ColorModeSwitch />
  </header>
</template>

<script setup lang="ts">
import { AuthRole } from '~/auth/types'

const { state, logout } = useAuth()
</script>
