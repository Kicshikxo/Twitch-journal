import type { GetSessionResult, SessionData, LoginAdminData, LoginResult, LogoutOptions, LogoutResult, LoginAdminOptions, LoginUserData, LoginUserOptions } from '~/auth/types'

const useAuthState = () => {
  const data = useState<SessionData | null>('session:data', () => null)
  const status = computed(() => (data.value ? 'authenticated' : 'unauthenticated'))

  return { data, status }
}

const adminLogin = async (options: LoginAdminOptions): Promise<LoginResult> => {
  const router = useRouter()

  const { error } = await useFetch('/api/auth/login-admin', {
    method: 'POST',
    body: { channel: options.channel, password: options.password } as LoginAdminData,
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

const userLogin = async (options: LoginUserOptions): Promise<LoginResult> => {
  const router = useRouter()

  const { error } = await useFetch('/api/auth/login-user', {
    method: 'POST',
    body: { channel: options.channel, username: options.username } as LoginUserData,
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
    adminLogin,
    userLogin,
    logout,
    getSession,
    state: {
      data,
      status,
    },
  }
}
