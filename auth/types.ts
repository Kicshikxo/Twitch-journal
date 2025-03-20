export enum AuthRole {
  CHANNEL_STREAMER = 'streamer',
  CHANNEL_VIEWER = 'viewer',
}

export interface LoginStreamerOptions {
  channel: string
  password: string
  redirectTo?: string
}
export interface LoginStreamerData {
  channel: string
  password: string
}
export interface LoginViewerOptions {
  username: string
  redirectTo?: string
}
export interface LoginViewerData {
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
  channel: string | null
  username: string | null
  password: string | null
}

export interface SessionData {
  role: AuthRole
  channel: string | null
  username: string
}
export interface GetSessionResult {
  status: number
  error: string | null
  data: SessionData | null
}
