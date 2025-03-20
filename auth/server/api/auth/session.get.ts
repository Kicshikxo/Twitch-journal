import crc32 from 'crc/crc32'
import { AuthRole, type SessionData } from '~/auth/types'
import readTokenData from '~/auth/server/utils/readTokenData'
import { prisma } from '~/prisma/client'

export default defineEventHandler(async (event) => {
  const tokenData = readTokenData(event)

  if (!tokenData) return sendError(event, createError({ statusCode: 401 }))

  if (tokenData.role === AuthRole.CHANNEL_ADMIN && tokenData.channel) {
    const channel = await prisma.channel.findFirst({
      where: { name: tokenData.channel },
      orderBy: { createdAt: 'desc' },
    })
    if (channel?.password && crc32(channel.password).toString(16) === tokenData.password)
      return {
        role: tokenData.role,
        channel: tokenData.channel,
        username: tokenData.channel,
      } as SessionData
  }

  if (tokenData.role === AuthRole.CHANNEL_USER && tokenData.username) {
    const user = await prisma.user.findFirst({ where: { username: tokenData.username } })
    if (user)
      return {
        role: tokenData.role,
        username: tokenData.username,
      } as SessionData
  }
})
