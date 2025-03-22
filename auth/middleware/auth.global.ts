export default defineNuxtRouteMiddleware(async (to) => {
  const { state, getSession } = useAuth()

  if (state.status.value === 'unauthenticated') await getSession()
  if (state.status.value === 'authenticated') return

  if (to.meta.auth === false) return

  return navigateTo(`/auth?redirectTo=${to.fullPath}`)
})
