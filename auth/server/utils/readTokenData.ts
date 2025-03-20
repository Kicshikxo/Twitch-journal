import { H3Event } from 'h3'
import type { AuthTokenData } from '~/auth/types'
import jwt from 'jsonwebtoken'

export default function (event: H3Event): AuthTokenData | void {
  const headerToken = getHeaders(event).authorization?.substring('Bearer '.length)
  const cookieToken = getCookie(event, useRuntimeConfig().auth.cookieName)

  if (!headerToken && !cookieToken) return

  let tokenData: AuthTokenData
  try {
    tokenData = jwt.verify(headerToken ?? cookieToken ?? '', useRuntimeConfig().auth.jwtSecretKey) as AuthTokenData
  } catch (e) {
    return
  }

  return tokenData
}
