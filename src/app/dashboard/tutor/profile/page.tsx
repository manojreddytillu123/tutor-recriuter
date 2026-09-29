'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/store'
import { demoTutorProfiles } from '@/lib/demo-data'

export default function TutorProfileEditPage() {
  const { user } = useAuthStore()
  const tutor = demoTutorProfiles[0]

  const [headline, setHeadline] = useState(tutor.headline)
  const [rate, setRate] = useState(tutor.hourly_rate.toString())
  const [bio, setBio] = useState(tutor.bio)

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Tutor Profile</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Keep your bio, hourly rate, and subjects updated for better AI matches</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Public Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs font-semibold mb-1 block">Profile Headline</label>
            <Input value={headline} onChange={e => setHeadline(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold mb-1 block">Hourly Rate (₹)</label>
            <Input type="number" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold mb-1 block">Bio / Teaching Experience</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={5}
              className="w-full p-3 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />
          </div>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">Save Profile</Button>
        </CardContent>
      </Card>
    </div>
  )
}
