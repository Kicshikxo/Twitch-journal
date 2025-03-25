import type { GetSessionResult, SessionData, LoginStreamerData, LoginResult, LogoutOptions, LogoutResult, LoginStreamerOptions, LoginViewerData, LoginViewerOptions } from '~/auth/types'

const useAuthState = () => {
  const data = useState<SessionData | null>('session:data', () => null)
  const status = computed(() => (data.value ? 'authenticated' : 'unauthenticated'))

  return { data, status }
}

const loginAsStreamer = async (options: LoginStreamerOptions): Promise<LoginResult> => {
  const router = useRouter()

  try {
    await $fetch('/api/auth/login-streamer', {
      method: 'POST',
      body: { channel: options.channel, password: options.password } as LoginStreamerData,
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

const loginAsViewer = async (options: LoginViewerOptions): Promise<LoginResult> => {
  const router = useRouter()

  try {
    await $fetch('/api/auth/login-viewer', {
      method: 'POST',
      body: { username: options.username } as LoginViewerData,
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
  } catch (error: any) {
    if (error.statusCode === 401) {
      sessionData.value = null
    }

    return {
      status: error?.statusCode ?? 500,
      error: error?.message ?? null,
      data: null,
    }
  }
}

export default () => {
  const { data, status } = useAuthState()

  return {
    loginAsStreamer,
    loginAsViewer,
    logout,
    getSession,
    state: {
      data,
      status,
    },
  }
}
