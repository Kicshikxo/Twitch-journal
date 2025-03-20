<template>
  <Listbox :options="participations ?? []" optionLabel="user.username" filter filter-placeholder="Participations" listStyle="max-height: 300px" />
</template>

<script setup lang="ts">
import type { Stream } from '@prisma/client'

const props = defineProps<{ stream?: Stream }>()

const { data: participations } = useFetch('/api/stream/get-participations', {
  query: { streamId: computed(() => props.stream?.id) },
  immediate: !!props.stream,
})
</script>
