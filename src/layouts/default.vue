<template>
  <div class="flex flex-col h-dvh">
    <Toast />

    <AppHeader />
    <main class="relative flex flex-1 overflow-y-auto">
      <section class="absolute flex px-4 w-full min-h-full">
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
