<template>
  <Listbox :options="participations ?? []" filter :filter-fields="['stream.channel.name', 'stream.title']" filter-placeholder="Поиск стрима" :highlightOnSelect="false">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">Участия в стримах</span>
        <Button text :loading="loadingParticipationsStatus === 'pending'" @click="refreshParticipations()">
          <template #icon>
            <Icon name="prime:refresh" />
          </template>
        </Button>
      </div>
    </template>
    <template #option="{ option }">
      <div class="flex justify-between items-center w-full">
        <Chip>
          <span>{{ option.stream.channel.name }} - {{ option.stream.title }}</span>
        </Chip>
        <div class="flex items-center gap-2">
          <Chip v-if="option.assessment" class="h-[32px]">
            <Rating :model-value="assessments.indexOf(option.assessment) + 1" readonly />
          </Chip>
          <Chip class="h-[32px]">
            <span>{{ option.messagesCount }}</span>
            <Icon name="prime:comments" class="text-lg" />
          </Chip>
          <Chip class="h-[32px]">
            <span>{{ new Date(option.createdAt).toLocaleString() }}</span>
          </Chip>
        </div>
      </div>
    </template>
  </Listbox>
</template>

<script setup lang="ts">
import { Assessment } from '@prisma/client'

const { state } = useAuth()

const {
  data: participations,
  refresh: refreshParticipations,
  status: loadingParticipationsStatus,
} = useFetch('/api/viewer/get-participations', {
  query: { viewerId: state.data.value?.username },
})

const assessments = ref<Assessment[]>([Assessment.AWFUL, Assessment.BAD, Assessment.NEUTRAL, Assessment.GOOD, Assessment.EXCELLENT])
</script>
