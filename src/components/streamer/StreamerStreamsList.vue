<template>
  <Listbox :model-value="modelValue" :options="streams ?? []" filter :filter-fields="['title']" filter-placeholder="Поиск стрима" @update:model-value="emits('update:modelValue', $event)">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">Стримы {{ streams?.length ? `(${streams?.length})` : '' }}</span>
        <Button text :loading="loadingStreamsStatus === 'pending'" @click="refreshStreams()">
          <template #icon>
            <Icon name="prime:refresh" />
          </template>
        </Button>
      </div>
    </template>
    <template #option="{ option }">
      <div class="flex justify-between items-center w-full">
        <Chip>
          <span>{{ option.title }}</span>
        </Chip>
        <Chip class="h-[32px]">
          <span>{{ new Date(option.createdAt).toLocaleString('ru-RU') }}</span>
          <Icon name="prime:calendar" size="1.25rem" />
        </Chip>
      </div>
    </template>
  </Listbox>
</template>

<script setup lang="ts">
import type { Stream } from '@prisma/client'

const props = defineProps<{ modelValue?: Stream }>()
const emits = defineEmits<{ (e: 'update:modelValue', value: Stream): void }>()

const { data: streams, refresh: refreshStreams, status: loadingStreamsStatus } = await useFetch('/api/channel/get-streams')
</script>
