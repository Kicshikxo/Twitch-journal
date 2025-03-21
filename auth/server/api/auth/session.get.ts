import crc32 from 'crc/crc32'
import { AuthRole, type SessionData } from '~/auth/types'
import readTokenData from '~/auth/server/utils/readTokenData'
import { prisma } from '~/prisma/client'

export default defineEventHandler(async (event) => {
  const tokenData = readTokenData(event)
  if (!tokenData) return sendError(event, createError({ statusCode: 401 }))

  if (tokenData.role === AuthRole.CHANNEL_STREAMER && tokenData.channel) {
    const channel = await prisma.channel.findUnique({
      where: { name: tokenData.channel },
    })
    if (channel?.password && crc32(channel.password).toString(16) === tokenData.password)
      return {
        role: tokenData.role,
        channel: tokenData.channel,
        username: tokenData.channel,
      } as SessionData
  }

  if (tokenData.role === AuthRole.CHANNEL_VIEWER && tokenData.username) {
    const viewer = await prisma.viewer.findUnique({ where: { username: tokenData.username } })
    if (viewer)
      return {
        role: tokenData.role,
        username: tokenData.username,
      } as SessionData
  }
})
