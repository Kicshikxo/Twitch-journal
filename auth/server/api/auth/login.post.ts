import { compare } from 'bcrypt'
import crc32 from 'crc/crc32'
import jwt from 'jsonwebtoken'
import type { AuthTokenData, LoginData } from '~/auth/types'

export default defineEventHandler(async (event) => {
  const loginData: LoginData = await readBody(event)

  if (await compare(loginData.password, useRuntimeConfig().auth.password)) {
    const token = jwt.sign(
      {
        password: crc32(loginData.password).toString(16)
      } as AuthTokenData,
      useRuntimeConfig().auth.jwtSecretKey
    )
    setCookie(event, useRuntimeConfig().auth.cookieName, token, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: true
    })
    return { token }
  }

  return sendError(
    event,
    createError({
      statusCode: 401,
      statusMessage: 'Incorrect login credentials'
    })
  )
})
