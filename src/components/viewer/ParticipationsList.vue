<template>
  <Listbox :options="participations ?? []" filter filter-placeholder="Участия" listStyle="max-height: 300px">
    <template #option="{ option }">
      <div class="flex justify-between w-full">
        <span>{{ option.stream.channel.name }} - {{ option.stream.title }}</span>
        <span>{{ new Date(option.createdAt).toLocaleString() }}</span>
      </div>
    </template>
  </Listbox>
</template>

<script setup lang="ts">
const { state } = useAuth()

const { data: participations } = useFetch('/api/viewer/get-participations', {
  query: { viewerId: state.data.value?.username },
})
</script>
