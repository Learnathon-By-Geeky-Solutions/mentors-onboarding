'use client'

import { useEffect, useState } from 'react'
import { AddLicenseButton } from "./add-license-button"
import { LicenseList } from "./license-list"
import { UploadLicenses } from "./upload-licenses"
import type { License } from "./license-list"
import { getLicenses } from './actions/licenses'

export default function LicensesPage() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const data = await getLicenses()
        setLicenses(data)
      } catch (error) {
        console.error('Failed to fetch licenses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLicenses()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">JetBrains Licenses</h1>
          <div className="flex gap-2">
            <UploadLicenses />
            <AddLicenseButton />
          </div>
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
        <h1 className="text-2xl font-bold text-gray-900">JetBrains Licenses</h1>
        <div className="flex gap-2">
          <UploadLicenses />
          <AddLicenseButton />
        </div>
      </div>

      <LicenseList initialLicenses={licenses} />
    </div>
  )
}