<template>
  <header class="flex items-center justify-end p-4">
    <transition name="transition-fade" mode="out-in">
      <div v-if="state.status.value === 'authenticated'" class="flex flex-1 justify-between">
        <Chip :label="state.data.value?.username">
          <template #icon>
            <Icon name="prime:user" />
          </template>
        </Chip>
        <Button text @click="logout({ redirectTo: '/auth' })">Выйти</Button>
      </div>
    </transition>

    <ColorModeSwitch />
  </header>
</template>

<script setup lang="ts">
const { state, logout } = useAuth()
</script>
