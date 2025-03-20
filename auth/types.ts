export enum AuthRole {
  CHANNEL_ADMIN = 'admin',
  CHANNEL_USER = 'user',
}

export interface LoginAdminOptions {
  channel: string
  password: string
  redirectTo?: string
}
export interface LoginAdminData {
  channel: string
  password: string
}
export interface LoginUserOptions {
  channel: string
  username: string
  redirectTo?: string
}
export interface LoginUserData {
  channel: string
  username: string
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
  role: AuthRole
  channel: string
  username: string | null
  password: string | null
}

export interface SessionData {
  role: AuthRole
  channel: string
}
export interface GetSessionResult {
  status: number
  error: string | null
  data: SessionData | null
}
