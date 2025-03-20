import type { GetSessionResult, SessionData, LoginAdminData, LoginResult, LogoutOptions, LogoutResult, LoginAdminOptions, LoginUserData, LoginUserOptions } from '~/auth/types'

const useAuthState = () => {
  const data = useState<SessionData | null>('session:data', () => null)
  const status = computed(() => (data.value ? 'authenticated' : 'unauthenticated'))

  return { data, status }
}

const adminLogin = async (options: LoginAdminOptions): Promise<LoginResult> => {
  const router = useRouter()

  try {
    await $fetch('/api/auth/login-admin', {
      method: 'POST',
      body: { channel: options.channel, password: options.password } as LoginAdminData,
    })

    await getSession()

    if (options.redirectTo) {
      router.push(options.redirectTo)
    }

    return {
      status: 200,
      error: null,
    }
  } catch (error: any) {
    return {
      status: error?.statusCode ?? 500,
      error: error?.message ?? null,
    }
  }
}

const userLogin = async (options: LoginUserOptions): Promise<LoginResult> => {
  const router = useRouter()

  try {
    await $fetch('/api/auth/login-user', {
      method: 'POST',
      body: { channel: options.channel, username: options.username } as LoginUserData,
    })

    await getSession()

    if (options.redirectTo) {
      router.push(options.redirectTo)
    }

    return {
      status: 200,
      error: null,
    }
  } catch (error: any) {
    return {
      status: error?.statusCode ?? 500,
      error: error?.message ?? null,
    }
  }
}

const logout = async (options?: LogoutOptions): Promise<LogoutResult> => {
  const router = useRouter()

  try {
    await $fetch('/api/auth/logout')

    await getSession()

    if (options?.redirectTo) {
      router.push(options.redirectTo)
    }

    return {
      status: 200,
      error: null,
    }
  } catch (error: any) {
    return {
      status: error?.statusCode ?? 500,
      error: error?.message ?? null,
    }
  }
}

const getSession = async (): Promise<GetSessionResult> => {
  const { data: sessionData } = useAuthState()

  try {
    const data = await $fetch('/api/auth/session', {
      headers: useRequestHeaders(['cookie']),
    })

    sessionData.value = data

    return {
      status: 200,
      error: null,
      data: data,
    }
  } catch (erroe: any) {
    return {
      status: erroe?.statusCode ?? 500,
      error: erroe?.message ?? null,
      data: null,
    }
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
