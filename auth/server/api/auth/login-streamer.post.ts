import { compare } from 'bcrypt'
import crc32 from 'crc/crc32'
import jwt from 'jsonwebtoken'
import { AuthRole, type AuthTokenData, type LoginStreamerData } from '~/auth/types'
import { prisma } from '~/prisma/client'

export default defineEventHandler(async (event) => {
  const loginData: LoginStreamerData = await readBody(event)
  if (!loginData.channel || !loginData.password) {
    return sendError(event, createError({ statusCode: 400 }))
  }
  loginData.channel = loginData.channel.toLowerCase()

  const channel = await prisma.channel.findUnique({
    where: { name: loginData.channel },
  })
  if (channel?.password && (await compare(loginData.password, channel.password))) {
    const token = jwt.sign(
      {
        role: AuthRole.CHANNEL_STREAMER,
        channel: channel.name,
        password: crc32(channel.password).toString(16),
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
