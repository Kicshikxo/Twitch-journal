import jwt from 'jsonwebtoken'
import { AuthRole, type AuthTokenData, type LoginViewerData } from '~/auth/types'
import { prisma } from '~/prisma/client'

export default defineEventHandler(async (event) => {
  const loginData: LoginViewerData = await readBody(event)

  if (!loginData.username) {
    return sendError(event, createError({ statusCode: 400 }))
  }

  const viewer = await prisma.viewer.findUnique({
    where: { username: loginData.username },
  })
  if (viewer?.username) {
    const token = jwt.sign(
      {
        role: AuthRole.CHANNEL_VIEWER,
        username: viewer.username,
      } as AuthTokenData,
      useRuntimeConfig().auth.jwtSecretKey,
    )
    setCookie(event, useRuntimeConfig().auth.cookieName, token, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: true,
    })
    return { token }
  }

  return sendError(event, createError({ statusCode: 401 }))
})
