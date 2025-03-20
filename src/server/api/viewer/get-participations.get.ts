import readTokenData from '~/auth/server/utils/readTokenData'
import { prisma } from '~/prisma/client'

export default defineEventHandler(async (event) => {
  const tokenData = readTokenData(event)
  if (!tokenData || !tokenData.username) return sendError(event, createError({ statusCode: 401 }))

  return await prisma.participation.findMany({
    where: { viewer: { username: tokenData.username } },
    include: {
      stream: {
        include: {
          channel: true
        }
      }
    }
  })
})
