import { prisma } from '~/prisma/client'
import { getTwitchClient } from '~/twitch/server/utils/client'

export default defineEventHandler(async (event) => {
  const body: { channel: string; username: string } = await readBody(event)
  if (!body.channel || !body.username) return sendError(event, createError({ statusCode: 400 }))

  const channelName = body.channel.toLowerCase()
  const username = body.username.toLowerCase()

  const channel = await prisma.channel.upsert({
    where: { name: channelName },
    create: { name: channelName },
    update: {},
    select: { id: true },
  })

  const twitchClient = getTwitchClient()
  if (!twitchClient) return sendError(event, createError({ statusCode: 500 }))

  let currentTwitchStream = await twitchClient.streams.getStreamByUserName(channelName)
  if (!currentTwitchStream) return sendError(event, createError({ statusCode: 400 }))

  const currentStream = await prisma.stream.upsert({
    where: { twitchId: currentTwitchStream.id },
    create: {
      twitchId: currentTwitchStream.id,
      title: currentTwitchStream.title,
      channelId: channel.id,
    },
    update: {},
    select: { id: true },
  })

  const viewer = await prisma.viewer.upsert({
    where: { username },
    create: { username },
    update: {},
    select: { id: true },
  })

  return await prisma.participation.upsert({
    where: {
      viewerId_streamId: {
        viewerId: viewer.id,
        streamId: currentStream.id,
      },
    },
    create: {
      viewerId: viewer.id,
      streamId: currentStream.id,
      messagesCount: 1,
    },
    update: {
      messagesCount: { increment: 1 },
      updatedAt: new Date(),
    },
  })
})
