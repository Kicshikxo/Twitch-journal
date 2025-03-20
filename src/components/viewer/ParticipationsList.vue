<template>
  <Listbox :options="participations ?? []" filter filter-placeholder="Участия" listStyle="max-height: 300px">
    <template #option="{ option }">
      <div class="flex justify-between items-center w-full">
        <span>{{ option.stream.channel.name }} - {{ option.stream.title }}</span>
        <div class="flex items-center gap-4">
          <Chip v-if="option.assessment" :label="assessments.find((assessment) => assessment.value === option.assessment)?.label" class="py-1" />
          <span>{{ new Date(option.createdAt).toLocaleString() }}</span>
        </div>
      </div>
    </template>
  </Listbox>
</template>

<script setup lang="ts">
import type { Assessment } from '@prisma/client'

const { state } = useAuth()

const { data: participations } = useFetch('/api/viewer/get-participations', {
  query: { viewerId: state.data.value?.username },
})

const assessments = ref<{ label: string; value: Assessment }[]>([
  { label: 'Отлично', value: 'EXCELLENT' },
  { label: 'Хорошо', value: 'GOOD' },
  { label: 'Нейтрально', value: 'NEUTRAL' },
  { label: 'Плохо', value: 'BAD' },
  { label: 'Ужасно', value: 'AWFUL' },
])
</script>
