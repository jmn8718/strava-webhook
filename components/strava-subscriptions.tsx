"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function StravaSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([])
  const [callbackUrl, setCallbackUrl] = useState("")

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    const response = await fetch("/api/subscribe")
    const data = await response.json()
    setSubscriptions(data)
  }

  const createSubscription = async () => {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ callbackUrl }),
    })
    const data = await response.json()
    console.log("Subscription created:", data)
    fetchSubscriptions()
  }

  const deleteSubscription = async (id: number) => {
    const response = await fetch("/api/subscribe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    const data = await response.json()
    console.log("Subscription deleted:", data)
    fetchSubscriptions()
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Subscription</CardTitle>
          <CardDescription>Enter the callback URL for your webhook</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            value={callbackUrl}
            onChange={(e) => setCallbackUrl(e.target.value)}
            placeholder="https://your-app.vercel.app/api/webhook"
            className="mb-2"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={createSubscription}>Create Subscription</Button>
        </CardFooter>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          {subscriptions.length === 0 ? (
            <p>No active subscriptions</p>
          ) : (
            <ul>
              {subscriptions.map((sub: any) => (
                <li key={sub.id} className="flex justify-between items-center mb-2">
                  <span>{sub.callback_url}</span>
                  <Button variant="destructive" onClick={() => deleteSubscription(sub.id)}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

