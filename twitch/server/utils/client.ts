import { ApiClient } from '@twurple/api'
import { StaticAuthProvider } from '@twurple/auth'

let twitchClient: ApiClient | null = null

export const getTwitchClient = () => {
  if (!twitchClient) {
    const clientId = useRuntimeConfig().twitch.clientId
    const accessToken = useRuntimeConfig().twitch.accessToken

    if (!clientId || !accessToken) {
      console.error('TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET not defined in runtime environment')
      return
    }

    const authProvider = new StaticAuthProvider(clientId, accessToken)

    twitchClient = new ApiClient({ authProvider })
  }

  return twitchClient
}
