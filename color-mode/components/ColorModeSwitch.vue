<template>
  <Button text rounded @click="toggleColorMode">
    <template #icon>
      <ClientOnly>
        <Icon :name="iconName" />
      </ClientOnly>
    </template>
  </Button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const colorModes = ref(['system', 'light', 'dark'])

const iconName = computed(() => {
  return { system: 'prime:desktop', light: 'prime:sun', dark: 'prime:moon' }[colorMode.preference] ?? 'prime:exclamation-triangle'
})

function toggleColorMode() {
  colorMode.preference = colorModes.value.at((colorModes.value.indexOf(colorMode.preference) + 1) % colorModes.value.length)!
}
</script>
