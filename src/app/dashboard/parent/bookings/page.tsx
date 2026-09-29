'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Calendar, Clock, CheckCircle2, AlertCircle, XCircle, Sparkles, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { demoBookings, demoTutorProfiles } from '@/lib/demo-data'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function ParentBookingsPage() {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled'>('all')

  const filteredBookings = demoBookings.filter(b => {
    if (filter === 'all') return true
    return b.status === filter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Manage and track your tutoring sessions</p>
        </div>
        <Link href="/tutors">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <Sparkles className="w-4 h-4" /> Book New Session
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)] overflow-x-auto pb-2">
        {(['all', 'confirmed', 'pending', 'completed', 'cancelled'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${
              filter === tab
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-[var(--muted-foreground)]" />
              <p className="font-semibold text-lg">No bookings found</p>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">There are no {filter !== 'all' ? filter : ''} sessions scheduled.</p>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map(booking => {
            const tutor = demoTutorProfiles.find(t => t.id === booking.tutor_id)
            return (
              <Card key={booking.id} className="premium-card">
                <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {tutor?.id.split('-')[1] || 'T'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-base">Tutor #{tutor?.id.split('-')[1]}</h3>
                        <Badge
                          variant={
                            booking.status === 'confirmed' ? 'success' :
                            booking.status === 'pending' ? 'warning' :
                            booking.status === 'completed' ? 'default' : 'destructive'
                          }
                          className="capitalize text-xs"
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">
                        📅 {formatDate(booking.date)} • ⏰ {booking.start_time} - {booking.end_time} ({booking.duration_minutes} min)
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        📍 {booking.is_online ? 'Online Video Session' : `In-Person at ${booking.location_address || 'Registered Address'}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-[var(--border)]">
                    <p className="text-lg font-bold text-[var(--primary)]">{formatCurrency(booking.total_amount)}</p>
                    <div className="flex gap-2">
                      <Link href={`/tutors/${booking.tutor_id}`}>
                        <Button size="sm" variant="outline">View Tutor</Button>
                      </Link>
                      {booking.status === 'confirmed' && (
                        <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
                          Join Session
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
