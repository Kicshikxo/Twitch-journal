import type { GetSessionResult, SessionData, LoginData, LoginResult, LogoutOptions, LogoutResult, LoginOptions } from '~/auth/types'

const useAuthState = () => {
  const data = useState<SessionData | null>('session:data', () => null)
  const status = computed(() => (data.value ? 'authenticated' : 'unauthenticated'))

  return { data, status }
}

const login = async (options: LoginOptions): Promise<LoginResult> => {
  const router = useRouter()

  const { error } = await useFetch('/api/auth/login', {
    method: 'POST',
    body: { password: options.password } as LoginData
  })

  await getSession()

  if (options.redirectTo && !error.value) {
    router.push(options.redirectTo)
  }

  return {
    status: error.value?.data?.httpStatus ?? 200,
    error: error.value?.message ?? null,
  }
}

const logout = async (options?: LogoutOptions): Promise<LogoutResult> => {
  const router = useRouter()

  const { error } = await useFetch('/api/auth/logout')

  await getSession()

  if (options?.redirectTo && !error.value) {
    router.push(options.redirectTo)
  }

  return {
    status: error.value?.data?.httpStatus ?? 200,
    error: error.value?.message ?? null,
  }
}

const getSession = async (): Promise<GetSessionResult> => {
  const { data: sessionData } = useAuthState()

  const { data, error } = await useFetch('/api/auth/session')

  sessionData.value = data.value ?? null

  return {
    status: error.value?.data?.httpStatus ?? 200,
    error: error.value?.message ?? null,
    data: data.value ?? null,
  }
}

export default () => {
  const { data, status } = useAuthState()

  return {
    login,
    logout,
    getSession,
    state: {
      data,
      status,
    },
  }
}
