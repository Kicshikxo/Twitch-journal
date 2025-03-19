export default defineNuxtConfig({
  compatibilityDate: "2025-03-19",

  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page-fade', mode: 'out-in' },
  },

  extends: ['./auth', './primevue', './prisma', './tailwind'],

  css: ['~/assets/css/main.css']
})
