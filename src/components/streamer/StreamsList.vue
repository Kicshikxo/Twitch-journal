<template>
  <Listbox :model-value="modelValue" :options="streams ?? []" filter filter-placeholder="Стримы" @update:model-value="emits('update:modelValue', $event)">
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

const { data: streams } = await useFetch('/api/channel/get-streams')
</script>
