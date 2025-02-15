export async function getAccessToken(): Promise<string> {
  const tokenUrl = "https://www.strava.com/oauth/token"
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID!,
    client_secret: process.env.STRAVA_CLIENT_SECRET!,
    grant_type: "client_credentials",
  })

  try {
    const response = await fetch(`${tokenUrl}?${params}`, {
      method: "POST",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error("Error getting access token:", error)
    throw error
  }
}

