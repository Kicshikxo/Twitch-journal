<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <Button label="go to admin" @click="navigateTo('/admin')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
})
</script>
