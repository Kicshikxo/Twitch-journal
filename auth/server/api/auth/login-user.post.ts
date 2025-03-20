import jwt from 'jsonwebtoken'
import { AuthRole, type AuthTokenData, type LoginUserData } from '~/auth/types'
import { prisma } from '~/prisma/client'

export default defineEventHandler(async (event) => {
  const loginData: LoginUserData = await readBody(event)

  if (!loginData.channel || !loginData.username) {
    return sendError(event, createError({ statusCode: 400 }))
  }

  const channel = await prisma.channel.findFirst({
    where: { name: loginData.channel },
  })
  const user = await prisma.user.findFirst({
    where: { username: loginData.username },
  })
  if (channel?.name && user?.username) {
    const token = jwt.sign(
      {
        role: AuthRole.CHANNEL_USER,
        channel: channel.name,
        username: user.username,
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
