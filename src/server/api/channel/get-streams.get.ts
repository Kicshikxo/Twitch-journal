import readTokenData from '~/auth/server/utils/readTokenData'
import { AuthRole } from '~/auth/types'
import { prisma } from '~/prisma/client'

export default defineEventHandler(async (event) => {
  const tokenData = readTokenData(event)
  if (!tokenData || tokenData.role !== AuthRole.CHANNEL_STREAMER || !tokenData.channel) return sendError(event, createError({ statusCode: 401 }))

  return await prisma.stream.findMany({
    where: { channel: { name: tokenData.channel } },
    include: { _count: { select: { participations: true } } },
    orderBy: { createdAt: 'desc' },
  })
})
