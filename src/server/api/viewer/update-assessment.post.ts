import type { Assessment } from '@prisma/client'
import readTokenData from '~/auth/server/utils/readTokenData'
import { AuthRole } from '~/auth/types'
import { prisma } from '~/prisma/client'

export default defineEventHandler(async (event) => {
  const tokenData = readTokenData(event)
  if (!tokenData || tokenData.role !== AuthRole.CHANNEL_STREAMER) return sendError(event, createError({ statusCode: 401 }))

  const { participationId, viewerId, assessment }: { participationId: string; viewerId: string; assessment: Assessment } = await readBody(event)
  if (!participationId) return sendError(event, createError({ statusCode: 400 }))

  const participation = await prisma.participation.findUnique({
    where: { id: participationId },
    include: { stream: { include: { channel: true } } },
  })
  if (!participation || participation.stream.channel.name !== tokenData.channel) return sendError(event, createError({ statusCode: 400 }))

  const viewer = await prisma.viewer.findUnique({
    where: { id: viewerId },
  })
  if (!viewer) return sendError(event, createError({ statusCode: 400 }))

  return await prisma.participation.update({
    where: {
      id: participation.id,
    },
    data: {
      assessment: assessment,
    },
  })
})
