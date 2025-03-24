<template>
  <div class="flex flex-col justify-center items-center h-dvh gap-8">
    <div class="text-8xl font-bold">
      {{ error.statusCode }}
    </div>
    <div class="text-5xl font-bold mb-4">
      <span v-if="error.statusCode === 404">Страница не найдена</span>
      <span v-else-if="error.statusCode === 500">Ошибка сервера</span>
    </div>
    <NuxtLink v-if="error.statusCode === 404" to="/">
      <Button label="На главную">
        <template #icon>
          <Icon name="prime:home" size="1.25rem" />
        </template>
      </Button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: any }>()
</script>
