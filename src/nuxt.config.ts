export default defineNuxtConfig({
  app: {
    head: {
      title: 'Twitch журнал',
    },

    pageTransition: { name: 'transition-fade', mode: 'out-in' },
  },

  css: ['~/src/assets/css/main.css', '~/src/assets/css/rubik.fontface.css'],
})
