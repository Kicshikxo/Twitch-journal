<template>
  <Listbox :model-value="modelValue" :options="streams ?? []" filter :filter-fields="['title']" filter-placeholder="Поиск стрима" listStyle="height: 300px" :virtualScrollerOptions="{ itemSize: 56 }" @update:model-value="emits('update:modelValue', $event)">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">Стримы {{ streams?.length ? `(${streams?.length})` : '' }}</span>
        <Button text :loading="loadingStreamsStatus === 'pending'" @click="refreshStreams()">
          <template #icon>
            <Icon name="prime:refresh" size="1.25rem" />
          </template>
        </Button>
      </div>
    </template>
    <template #option="{ option }">
      <div class="flex justify-between items-center w-full">
        <Chip>
          <span>{{ option.title }}</span>
        </Chip>
        <div class="flex items-center gap-2">
          <Chip class="h-[32px]">
            <span>{{ option._count.participations }}</span>
            <Icon name="prime:users" size="1.25rem" />
          </Chip>
          <Chip class="h-[32px]">
            <span>{{ new Date(option.createdAt).toLocaleString('ru-RU') }}</span>
            <Icon name="prime:clock" size="1.25rem" />
          </Chip>
        </div>
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
