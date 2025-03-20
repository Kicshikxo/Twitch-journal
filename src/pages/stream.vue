<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <StreamerParticipationList :stream-id="streamId" />
  </div>
</template>

<script setup lang="ts">
const streamId = useRoute().query.id as string
</script>
