export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      jwtSecretKey: process.env.JWT_SECRET_KEY ?? '<jwt_secret_key>',
      cookieName: process.env.AUTH_COOKIE_NAME ?? 'twitch-journal__auth-token',
    },
  },
})
