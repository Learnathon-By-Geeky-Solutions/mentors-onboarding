'use client'

import { useEffect, useState } from 'react'
import { AddStackButton } from "./add-stack-button"
import { StackList } from "./stack-list"
import { getStacks, type Stack } from './actions/stacks'

export default function StacksPage() {
  const [stacks, setStacks] = useState<Stack[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStacks = async () => {
      try {
        const data = await getStacks()
        setStacks(data)
      } catch (error) {
        console.error('Failed to fetch stacks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStacks()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Tech Stacks</h1>
          <AddStackButton />
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tech Stacks</h1>
        <AddStackButton />
      </div>

      <StackList initialStacks={stacks} />
    </div>
  )
}