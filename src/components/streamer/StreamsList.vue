<template>
  <Listbox :model-value="modelValue" :options="streams ?? []" filter :filter-fields="['title']" filter-placeholder="Поиск стрима" @update:model-value="emits('update:modelValue', $event)">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">Стримы</span>
        <Button text :loading="loadingStreamsStatus === 'pending'" @click="refreshStreams()">
          <template #icon>
            <Icon name="prime:refresh" />
          </template>
        </Button>
      </div>
    </template>
    <template #option="{ option }">
      <div class="flex justify-between items-center w-full">
        <span>{{ option.title }}</span>
        <span>{{ new Date(option.createdAt).toLocaleString() }}</span>
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
