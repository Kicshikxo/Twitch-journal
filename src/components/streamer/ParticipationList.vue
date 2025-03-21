<template>
  <Listbox :options="participations ?? []" filter :filter-fields="['viewer.username']" filter-placeholder="Поиск участника" listStyle="max-height: 250px">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">Участники стрима</span>
        <Button text :loading="loadingParticipationsStatus === 'pending'" @click="refreshParticipations()">
          <template #icon>
            <Icon name="prime:refresh" />
          </template>
        </Button>
      </div>
    </template>
    <template #option="{ option }">
      <div class="flex justify-between items-center w-full">
        <span>{{ option.viewer.username }}</span>
        <div class="flex items-center gap-4">
          <Chip>
            <span>{{ option.messagesCount }}</span>
            <Icon name="prime:comments" class="text-lg" />
          </Chip>
          <Select
            :model-value="assessments.find((assessment) => assessment.value === option.assessment)"
            :options="assessments"
            optionLabel="label"
            placeholder="Оценка"
            :loading="loadingParticipations.includes(option.id)"
            @value-change="updateViewerAssessment(option.id, option.viewer.id, $event.value)"
          />
        </div>
      </div>
    </template>
  </Listbox>
</template>

<script setup lang="ts">
import { Assessment, type Stream } from '@prisma/client'

const props = defineProps<{ stream?: Stream }>()

const toast = useToast()

const {
  data: participations,
  refresh: refreshParticipations,
  status: loadingParticipationsStatus,
} = useFetch('/api/stream/get-participations', {
  query: { streamId: computed(() => props.stream?.id) },
  immediate: !!props.stream,
})

const assessments = ref<{ label: string; value: Assessment }[]>([
  { label: 'Отлично', value: 'EXCELLENT' },
  { label: 'Хорошо', value: 'GOOD' },
  { label: 'Нейтрально', value: 'NEUTRAL' },
  { label: 'Плохо', value: 'BAD' },
  { label: 'Ужасно', value: 'AWFUL' },
])
const loadingParticipations = ref<string[]>([])

const updateViewerAssessment = async (participationId: string, viewerId: string, assessment: Assessment) => {
  loadingParticipations.value.push(participationId)
  try {
    await $fetch('/api/viewer/update-assessment', {
      method: 'post',
      body: { participationId, viewerId, assessment },
    })
  } catch (error: any) {
    toast.add({ severity: 'error', summary: error.statusMessage, life: 3000 })
  } finally {
    loadingParticipations.value = loadingParticipations.value.filter((id) => id !== participationId)
  }
}
</script>
