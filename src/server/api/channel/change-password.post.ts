import { hash } from 'bcrypt'
import readTokenData from '~/auth/server/utils/readTokenData'
import { AuthRole, type AuthTokenData } from '~/auth/types'
import { prisma } from '~/prisma/client'
import jwt from 'jsonwebtoken'
import crc32 from 'crc/crc32'

export default defineEventHandler(async (event) => {
  const tokenData = readTokenData(event)
  if (!tokenData || tokenData.role !== AuthRole.CHANNEL_STREAMER || !tokenData.channel) return sendError(event, createError({ statusCode: 401 }))

  const { password, repeatPassword }: { password: string; repeatPassword: string } = await readBody(event)
  if (!password || !repeatPassword || password !== repeatPassword) return sendError(event, createError({ statusCode: 400 }))

  const channel = await prisma.channel.update({
    where: {
      name: tokenData.channel,
    },
    data: {
      password: await hash(password, 8),
    },
  })
  if (!channel || !channel.password) return sendError(event, createError({ statusCode: 500 }))

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
})
