export interface LoginOptions {
  password: string
  redirectTo?: string
}
export interface LoginData {
  password: string
}
export interface LoginResult {
  status: number
  error: string | null
}

export interface LogoutOptions {
  redirectTo?: string
}
export interface LogoutResult {
  status: number
  error: string | null
}

export interface AuthTokenData {
  password: string | null
}

export interface SessionData {
  loggedIn: boolean
}
export interface GetSessionResult {
  status: number
  error: string | null
  data: SessionData | null
}
