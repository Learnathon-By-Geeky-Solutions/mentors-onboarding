'use client'

import { useEffect, useState } from 'react'
import { DiscordList } from "./discord-list"
import { getDiscordStacks, type Stack } from './actions/discord'

export default function DiscordPage() {
  const [stacks, setStacks] = useState<Stack[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStacks = async () => {
      try {
        const data = await getDiscordStacks()
        setStacks(data)
      } catch (error) {
        console.error('Failed to fetch Discord stacks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStacks()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Discord Servers</h1>
        <div className="max-w-3xl">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Discord Servers</h1>
      <div className="max-w-3xl">
        <DiscordList initialStacks={stacks} />
      </div>
    </div>
  )
}