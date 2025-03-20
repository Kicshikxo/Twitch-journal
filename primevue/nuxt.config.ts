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
              50: '{emerald.50}',
              100: '{emerald.100}',
              200: '{emerald.200}',
              300: '{emerald.300}',
              400: '{emerald.400}',
              500: '{emerald.500}',
              600: '{emerald.600}',
              700: '{emerald.700}',
              800: '{emerald.800}',
              900: '{emerald.900}',
              950: '{emerald.950}',
            },
          },
        }),
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    },
  },

  css: ['~/primevue/assets/css/rubik.fontface.css'],
})
