export default defineEventHandler((event) => {
  deleteCookie(event, useRuntimeConfig().auth.cookieName)

  return {
    statusCode: 200,
  }
})
