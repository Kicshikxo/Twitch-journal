import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { ru } from 'primelocale/js/ru.js'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'preload',
          href: '/fonts/Rubik-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
  },

  modules: ['@primevue/nuxt-module'],

  primevue: {
    options: {
      locale: ru,
      ripple: true,
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              50: '{purple.50}',
              100: '{purple.100}',
              200: '{purple.200}',
              300: '{purple.300}',
              400: '{purple.400}',
              500: '{purple.500}',
              600: '{purple.600}',
              700: '{purple.700}',
              800: '{purple.800}',
              900: '{purple.900}',
              950: '{purple.950}',
            },
          },
        }),
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    },
  },
})
