<template>
  <div class="flex flex-1 flex-col gap-4 w-full">
    <Panel :toggleable="!!selectedStream" :collapsed="streamsPanelCollapsed" :pt="{ header: { style: 'height: 52px; padding: 0.375rem 1.125rem' }, content: { style: 'padding: 0' } }" @update:collapsed="streamsPanelCollapsed = $event">
      <template #header>
        <div v-if="selectedStream" class="flex items-center gap-2">
          <span>{{ selectedStream.title }}</span>
          <Chip class="h-[32px]">
            <span>{{ new Date(selectedStream.createdAt).toLocaleString('ru-RU') }}</span>
            <Icon name="prime:clock" size="1.25rem" />
          </Chip>
        </div>
        <span v-else>Выбор стрима</span>
      </template>
      <StreamerStreamsList v-model="selectedStream" />
    </Panel>
    <transition name="transition-fade" mode="out-in">
      <StreamerParticipationsList v-show="!!selectedStream && streamsPanelCollapsed" :stream="selectedStream" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { Stream } from '@prisma/client'

const selectedStream = ref<Stream | undefined>()
const streamsPanelCollapsed = ref(false)

watch(selectedStream, () => {
  if (selectedStream.value) {
    streamsPanelCollapsed.value = true
  }
})
</script>
