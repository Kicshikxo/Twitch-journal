<template>
  <Listbox :options="participations ?? []" optionLabel="id" filter filter-placeholder="Participations" listStyle="max-height: 300px" />
</template>

<script setup lang="ts">
const { state } = useAuth()

const { data: participations } = useFetch('/api/user/get-participations', {
  query: { userId: state.data.value?.username },
})
</script>
