export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      password: process.env.PASSWORD ?? '$2b$08$aAcffS6A1BJ5TmkALgkC0OfKNHdDBeIhPjAn/nGgKZeTSCure2idu', // 'test'
      jwtSecretKey: process.env.JWT_SECRET_KEY ?? '<jwt_secret_key>',
      cookieName: process.env.AUTH_COOKIE_NAME ?? 'twitch-journal__auth-token',
    },
  },
})
