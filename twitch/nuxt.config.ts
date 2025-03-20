export default defineNuxtConfig({
  runtimeConfig: {
    twitch: {
      clientId: process.env.TWITCH_CLIENT_ID,
      accessToken: process.env.TWITCH_ACCESS_TOKEN,
    },
  },
})
