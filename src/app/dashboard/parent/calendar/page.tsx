'use client'

import React from 'react'
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { demoBookings } from '@/lib/demo-data'
import { formatDate } from '@/lib/utils'

export default function CalendarPage() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Session Calendar</h1>
          <p className="text-sm text-[var(--muted-foreground)]">View scheduled classes and tutor availability</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-[var(--border)]"><ChevronLeft className="w-4 h-4" /></button>
          <span className="font-semibold text-sm">October 2026</span>
          <button className="p-2 rounded-lg border border-[var(--border)]"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-2 mb-4 text-center font-semibold text-xs text-[var(--muted-foreground)]">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map(d => {
              const hasBooking = d === 15 || d === 20 || d === 24
              return (
                <div
                  key={d}
                  className={`min-h-[80px] p-2 rounded-xl border flex flex-col justify-between ${
                    hasBooking ? 'border-[var(--primary)] bg-[var(--accent)]/30' : 'border-[var(--border)]'
                  }`}
                >
                  <span className="text-xs font-bold">{d}</span>
                  {hasBooking && (
                    <Badge variant="default" className="text-[9px] py-0 truncate">
                      5:00 PM Math
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
