<template>
  <div class="flex flex-col h-dvh">
    <NuxtLoadingIndicator color="var(--p-primary-color)" :height="2" :throttle="0" />
    <AppHeader />
    <main class="relative flex flex-1 overflow-y-auto">
      <Toast />
      <section class="absolute flex p-4 pt-0 w-full min-h-full">
        <slot />
      </section>
    </main>
  </div>
</template>

<style>
.p-toast-message-content {
  align-items: center;
}
</style>
