import readTokenData from '~/auth/server/utils/readTokenData'
import { prisma } from '~/prisma/client'

export default defineEventHandler(async (event) => {
  const tokenData = readTokenData(event)

  if (!tokenData) return

  const { username } = await readBody(event)

  const latestStream = await prisma.stream.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  })

  const user = await prisma.user.upsert({
    where: {
      username,
    },
    create: {
      username,
    },
    update: {
      updatedAt: new Date(),
    },
  })

  if (latestStream && user) {
    return await prisma.participation.upsert({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: latestStream.id,
        },
      },
      create: {
        userId: user.id,
        streamId: latestStream?.id,
      },
      update: {},
    })
  }
})
