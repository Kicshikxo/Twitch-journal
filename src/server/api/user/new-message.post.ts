import { prisma } from '~/prisma/client'

export default defineEventHandler(async (event) => {
  const { channel, username } = await readBody(event)
  if (!channel || !username) return sendError(event, createError({ statusCode: 400 }))

  const latestStream = await prisma.stream.findFirst({
    where: {
      channel: {
        name: channel,
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  if (!latestStream) return sendError(event, createError({ statusCode: 400 }))
  const user = await prisma.user.upsert({
    where: {
      username,
    },
    create: {
      username,
    },
    update: {},
  })
  if (!user) return sendError(event, createError({ statusCode: 400 }))

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
    update: {
      updatedAt: new Date(),
    },
  })
})
