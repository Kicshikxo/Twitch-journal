import readTokenData from "~/auth/server/utils/readTokenData"
import { prisma } from "~/prisma/client"

export default defineEventHandler(async (event) => {
  const tokenData = readTokenData(event)

  if (!tokenData) return

  return await prisma.stream.create({})
})
