import readTokenData from '~/auth/server/utils/readTokenData'
import { AuthRole } from '~/auth/types'
import { prisma } from '~/prisma/client'

export default defineEventHandler(async (event) => {
  const tokenData = readTokenData(event)
  if (!tokenData || tokenData.role !== AuthRole.CHANNEL_ADMIN) return sendError(event, createError({ statusCode: 401 }))

  const { streamId } = getQuery(event) as { streamId: string }
  if (!streamId) return sendError(event, createError({ statusCode: 400 }))

  const stream = await prisma.stream.findFirst({
    where: {
      id: streamId,
    },
  })
  if (!stream) return sendError(event, createError({ statusCode: 400 }))

  return await prisma.user.findMany({
    where: {
      participations: {
        some: {
          streamId: stream.id,
        }
      }
    },
  })
})
