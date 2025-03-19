<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <span>Admin page</span>
    <Button label="index" @click="navigateTo('/')" />
    <Button label="logout" @click="logout({redirectTo: '/'})"/>
  </div>
</template>

<script setup lang="ts">
const {logout} = useAuth();
</script>
