<template>
  <header class="flex items-center justify-end gap-4 p-4">
    <NuxtLink to="/">
      <Button text>Home</Button>
    </NuxtLink>
    <NuxtLink to="/auth">
      <Button text>Auth</Button>
    </NuxtLink>
    <ThemeSwitch />
  </header>
</template>
