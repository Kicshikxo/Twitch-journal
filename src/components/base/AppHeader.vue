<template>
  <header class="flex items-center justify-end p-4 gap-1">
    <transition name="transition-fade" mode="out-in">
      <div v-if="state.status.value === 'authenticated'" class="flex flex-1 justify-between">
        <div class="flex gap-1">
          <NuxtLink to="/">
            <Chip>
              <Icon name="prime:user" size="1.25rem" />
              <span>{{ state.data.value?.username }}</span>
            </Chip>
          </NuxtLink>
          <NuxtLink v-if="state.data.value?.role === AuthRole.CHANNEL_STREAMER" to="/channel" class="flex">
            <Button severity="secondary" rounded>
              <template #icon>
                <Icon name="prime:cog" size="1.25rem" />
              </template>
            </Button>
          </NuxtLink>
        </div>

        <Button text label="Выйти" :loading="logoutLoading" @click="handleLogout">
          <template #icon>
            <Icon name="prime:sign-out" size="1.25rem" />
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

const logoutLoading = ref(false)

const handleLogout = async () => {
  logoutLoading.value = true

  await logout({ redirectTo: '/auth' })

  logoutLoading.value = false
}
</script>
