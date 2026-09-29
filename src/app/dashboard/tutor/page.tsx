'use client'

import React from 'react'
import Link from 'next/link'
import {
  Calendar, Clock, Users, CreditCard, Star, TrendingUp,
  CheckCircle, ArrowRight, BookOpen, BarChart3, MessageSquare, Bell
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/store'
import { demoBookings, demoReviews } from '@/lib/demo-data'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function TutorDashboard() {
  const { user } = useAuthStore()
  if (!user) return null

  const bookings = demoBookings.filter(b => b.tutor_id === user.id)
  const todayBookings = bookings.filter(b => b.status === 'confirmed')
  const pendingBookings = bookings.filter(b => b.status === 'pending')
  const completedBookings = bookings.filter(b => b.status === 'completed')
  const totalEarnings = completedBookings.reduce((sum, b) => sum + (b.price * 0.9), 0)
  const monthlyEarnings = totalEarnings * 0.4

  const stats = [
    { label: "Today's Sessions", value: todayBookings.length.toString(), icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Pending Requests', value: pendingBookings.length.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Total Students', value: '15', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Monthly Earnings', value: formatCurrency(monthlyEarnings), icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Rating', value: '4.9', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Profile Completion', value: '95%', icon: CheckCircle, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.full_name.split(' ')[0]}! 👋</h1>
          <p className="text-[var(--muted-foreground)] text-sm mt-1">Manage your sessions and students here.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/tutor/calendar">
            <Button variant="outline" size="sm"><Calendar className="w-4 h-4" /> Availability</Button>
          </Link>
          <Link href="/dashboard/tutor/profile">
            <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">Edit Profile</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map(stat => (
          <Card key={stat.label} className="premium-card">
            <CardContent className="p-4">
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-2`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Requests */}
          {pendingBookings.length > 0 && (
            <Card className="border-amber-200 dark:border-amber-800">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bell className="w-5 h-5 text-amber-500" />
                  New Booking Requests
                  <Badge variant="warning">{pendingBookings.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingBookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="flex items-center gap-4 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Student #{booking.student_id.split('-')[1]}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{formatDate(booking.date)} • {booking.start_time} • {booking.duration_minutes}min</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-emerald-500 text-white hover:bg-emerald-600">Accept</Button>
                        <Button size="sm" variant="outline">Decline</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Today's Schedule */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="w-5 h-5 text-[var(--primary)]" />
                Today&apos;s Schedule
              </CardTitle>
              <Link href="/dashboard/tutor/calendar"><Button variant="ghost" size="sm">Full Calendar <ArrowRight className="w-3 h-3" /></Button></Link>
            </CardHeader>
            <CardContent>
              {todayBookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-[var(--muted-foreground)]" />
                  <p className="font-medium">No sessions today</p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">Your schedule is free today</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todayBookings.map(booking => (
                    <div key={booking.id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--secondary)]/50">
                      <div className="w-1 h-12 rounded-full bg-[var(--primary)]" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Session with Student #{booking.student_id.split('-')[1]}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{booking.start_time} - {booking.end_time} • {booking.is_online ? 'Online' : 'In-Person'}</p>
                      </div>
                      <Badge variant={booking.is_online ? 'default' : 'secondary'}>{booking.is_online ? 'Online' : 'In-Person'}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Star className="w-5 h-5 text-amber-500" /> Recent Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demoReviews.slice(0, 3).map(review => (
                  <div key={review.id} className="p-4 rounded-xl bg-[var(--secondary)]/50">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-xs text-[var(--muted-foreground)] ml-2">{formatDate(review.created_at)}</span>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Earnings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" /> Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                  <p className="text-sm text-[var(--muted-foreground)]">Total Earnings</p>
                  <p className="text-3xl font-bold text-emerald-600">{formatCurrency(totalEarnings)}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[var(--secondary)]">
                    <p className="text-xs text-[var(--muted-foreground)]">Pending</p>
                    <p className="font-semibold">{formatCurrency(monthlyEarnings * 0.3)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--secondary)]">
                    <p className="text-xs text-[var(--muted-foreground)]">Available</p>
                    <p className="font-semibold">{formatCurrency(totalEarnings * 0.7)}</p>
                  </div>
                </div>
              </div>
              <Link href="/dashboard/tutor/earnings">
                <Button variant="outline" size="sm" className="w-full mt-4">View Details</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { label: 'Email', done: true },
                  { label: 'Phone', done: true },
                  { label: 'Identity', done: true },
                  { label: 'Education', done: true },
                  { label: 'Intro Video', done: false },
                  { label: 'Admin Approved', done: true },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    <CheckCircle className={`w-4 h-4 ${item.done ? 'text-emerald-500' : 'text-gray-300'}`} />
                    <span>{item.label}</span>
                    {item.done && <Badge variant="success" className="ml-auto text-[10px]">✓</Badge>}
                  </div>
                ))}
              </div>
              <Link href="/dashboard/tutor/verification">
                <Button variant="outline" size="sm" className="w-full mt-4">Manage Verification</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { href: '/dashboard/tutor/calendar', icon: Calendar, label: 'Set Availability', color: 'text-blue-500' },
                  { href: '/dashboard/tutor/messages', icon: MessageSquare, label: 'Messages', color: 'text-purple-500' },
                  { href: '/dashboard/tutor/analytics', icon: BarChart3, label: 'Analytics', color: 'text-emerald-500' },
                ].map(action => (
                  <Link key={action.href} href={action.href}>
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--secondary)] transition-colors text-left">
                      <action.icon className={`w-4 h-4 ${action.color}`} />
                      <span className="text-sm font-medium">{action.label}</span>
                      <ArrowRight className="w-3 h-3 ml-auto text-[var(--muted-foreground)]" />
                    </button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
