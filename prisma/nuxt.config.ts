export default defineNuxtConfig({
  vite: {
    resolve: {
      alias: { '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js' },
    },
  },
})
