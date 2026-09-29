'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TutorCalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Availability & Calendar</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Set open slots for parents to book tutoring sessions</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">+ Add Slot</Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--secondary)]">
                <p>{d}</p>
                <p className="text-[10px] text-emerald-600 font-normal mt-2">Available 4-8 PM</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
