<template>
  <Listbox :model-value="modelValue" :options="streams ?? []" option-label="id" filter filter-placeholder="Streams" @update:model-value="emits('update:modelValue', $event)" />
</template>

<script setup lang="ts">
import type { Stream } from '@prisma/client'

const props = defineProps<{ modelValue?: Stream }>()
const emits = defineEmits<{ (e: 'update:modelValue', value: Stream): void }>()

const { data: streams } = await useFetch('/api/channel/get-streams')
</script>
