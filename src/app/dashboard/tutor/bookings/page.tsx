'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { demoBookings } from '@/lib/demo-data'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function TutorBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Booking Requests & Sessions</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Accept, manage, and complete tutoring sessions</p>
      </div>

      <div className="space-y-4">
        {demoBookings.map(b => (
          <Card key={b.id} className="premium-card">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">Session #{b.id.split('-')[1]}</h3>
                  <Badge variant={b.status === 'confirmed' ? 'success' : 'warning'}>{b.status}</Badge>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">📅 {formatDate(b.date)} • {b.start_time}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-[var(--primary)]">{formatCurrency(b.price)}</p>
                {b.status === 'pending' && (
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" className="bg-emerald-500 text-white">Accept</Button>
                    <Button size="sm" variant="outline">Decline</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
