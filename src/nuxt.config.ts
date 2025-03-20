export default defineNuxtConfig({
  app: {
    head: {
      title: 'Twitch журнал',
    },

    pageTransition: { name: 'page-fade', mode: 'out-in' },
  },

  css: ['~/src/assets/css/main.css'],
})
