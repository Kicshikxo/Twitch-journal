<template>
  <div class="flex flex-col h-dvh">
    <Toast />

    <AppHeader />
    <main class="relative flex flex-1 overflow-y-auto">
      <section class="absolute flex p-4 sm:p-8 w-full min-h-full">
        <slot />
      </section>
    </main>
  </div>
</template>
