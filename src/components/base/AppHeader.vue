<template>
  <header class="flex items-center justify-end p-4">
    <div v-if="state.status.value === 'authenticated'" class="flex flex-1 justify-between">
      <Chip :label="state.data.value?.username">
        <template #icon>
          <Icon name="prime:user" />
        </template>
      </Chip>
      <Button text @click="logout({ redirectTo: '/auth' })">Logout</Button>
    </div>

    <div v-else class="flex justify-end gap-4">
      <NuxtLink to="/auth">
        <Button text>Login</Button>
      </NuxtLink>
    </div>

    <ThemeSwitch />
  </header>
</template>

<script setup lang="ts">
const { state, logout } = useAuth()
</script>
