<template>
  <Listbox
    :options="participations ?? []"
    filter
    :filter-fields="['stream.channel.name', 'stream.title']"
    filter-placeholder="Поиск стрима"
    listStyle="height: 100%"
    class="flex flex-1 flex-col"
    :highlightOnSelect="false"
    :virtualScrollerOptions="{ itemSize: 56 }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">Участия в стримах {{ participations?.length ? `(${participations?.length})` : '' }}</span>
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
          <span>{{ option.stream.channel.name }} - {{ option.stream.title }}</span>
        </Chip>
        <div class="flex items-center gap-2">
          <Chip v-if="option.assessment && option.assessment !== 'NONE'" class="h-[32px]">
            <Rating :model-value="assessments.indexOf(option.assessment) + 1" readonly />
          </Chip>
          <Chip class="h-[32px]">
            <span>{{ option.messagesCount }}</span>
            <Icon name="prime:comments" size="1.25rem" />
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
