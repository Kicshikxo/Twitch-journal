export default defineNuxtConfig({
  compatibilityDate: '2025-03-20',
  devtools: { enabled: true },

  extends: ['./auth', './color-mode', './icons', './primevue', './prisma', './src', './tailwind'],
})
