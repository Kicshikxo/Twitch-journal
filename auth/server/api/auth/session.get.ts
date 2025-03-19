import crc32 from 'crc/crc32'
import type { AuthTokenData, SessionData } from '~/auth/types'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const headerToken = getHeaders(event).authorization?.substring('Bearer '.length)
  const cookieToken = getCookie(event, useRuntimeConfig().auth.cookieName)

  if (!headerToken && !cookieToken) return { loggedIn: false } as SessionData

  let tokenData: AuthTokenData
  try {
    tokenData = jwt.verify(headerToken ?? cookieToken!, useRuntimeConfig().auth.jwtSecretKey) as AuthTokenData
  } catch (e) {
    return { loggedIn: false } as SessionData
  }

  return { loggedIn: tokenData.password === crc32(useRuntimeConfig().auth.password).toString(16) } as SessionData
})
