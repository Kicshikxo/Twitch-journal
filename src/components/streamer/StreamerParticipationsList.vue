<template>
  <Listbox :options="participations ?? []" filter :filter-fields="['viewer.username']" filter-placeholder="Поиск участника" listStyle="height: 100%" class="flex flex-1 flex-col" :highlightOnSelect="false" :virtualScrollerOptions="{ itemSize: 56 }">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">Участники стрима {{ participations?.length ? `(${participations?.length})` : '' }}</span>
        <Button text :loading="loadingParticipationsStatus === 'pending'" @click="refreshParticipations()">
          <template #icon>
            <Icon name="prime:refresh" size="1.25rem" />
          </template>
        </Button>
      </div>
    </template>
    <template #option="{ option }">
      <div class="flex justify-between items-center w-full">
        <Chip>
          <Icon name="prime:user" size="1.25rem" />
          <span>{{ option.viewer.username }}</span>
        </Chip>
        <div class="flex items-center gap-2">
          <Chip class="h-[32px]">
            <span>{{ option.messagesCount }}</span>
            <Icon name="prime:comments" size="1.25rem" />
          </Chip>
          <Chip class="h-[32px]">
            <Rating :model-value="assessments.indexOf(option.assessment) + 1" :disabled="loadingParticipations.includes(option.id)" @value-change="updateViewerAssessment(option.id, option.viewer.id, assessments[$event - 1])" />
          </Chip>
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

const assessments = ref<Assessment[]>([Assessment.AWFUL, Assessment.BAD, Assessment.NEUTRAL, Assessment.GOOD, Assessment.EXCELLENT])
const loadingParticipations = ref<string[]>([])

const updateViewerAssessment = async (participationId: string, viewerId: string, assessment?: Assessment) => {
  loadingParticipations.value.push(participationId)
  try {
    await $fetch('/api/viewer/update-assessment', {
      method: 'post',
      body: { participationId, viewerId, assessment: assessment ?? 'NONE' },
    })
    refreshParticipations()
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Ошибка обновления оценки', life: 3000 })
  } finally {
    loadingParticipations.value = loadingParticipations.value.filter((id) => id !== participationId)
  }
}
</script>
