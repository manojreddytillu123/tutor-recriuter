'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, TrendingUp, Users, Star } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function TutorAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics & Performance</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Track profile views, conversion rate, student retention, and ratings</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="premium-card">
          <CardContent className="p-4">
            <p className="text-xs text-[var(--muted-foreground)]">Profile Impressions</p>
            <p className="text-2xl font-bold text-[var(--primary)]">1,420</p>
            <p className="text-xs text-emerald-600 mt-1">↑ +24% this month</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <p className="text-xs text-[var(--muted-foreground)]">Booking Conversion</p>
            <p className="text-2xl font-bold text-emerald-600">18.5%</p>
            <p className="text-xs text-emerald-600 mt-1">Above average</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <p className="text-xs text-[var(--muted-foreground)]">Student Retention</p>
            <p className="text-2xl font-bold text-purple-600">92%</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Repeat bookings</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <p className="text-xs text-[var(--muted-foreground)]">Avg. Rating</p>
            <p className="text-2xl font-bold text-amber-500">4.9 ★</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">From 48 reviews</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
