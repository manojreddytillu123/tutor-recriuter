'use client'

import React from 'react'
import Link from 'next/link'
import {
  Calendar, Clock, Users, CreditCard, TrendingUp, BookOpen,
  Star, Sparkles, ArrowRight, MapPin, Shield, CheckCircle2, MessageSquare, Bell
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/store'
import { demoTutorProfiles, demoStudentProfiles, demoBookings, demoNotifications } from '@/lib/demo-data'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function ParentDashboard() {
  const { user } = useAuthStore()
  if (!user) return null

  const students = demoStudentProfiles.filter(s => s.parent_id === user.id)
  const bookings = demoBookings.filter(b => b.parent_id === user.id)
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending')
  const completedBookings = bookings.filter(b => b.status === 'completed')
  const totalSpent = completedBookings.reduce((sum, b) => sum + b.total_amount, 0)
  
  const recommendedTutors = demoTutorProfiles.slice(0, 4).map(t => ({
    ...t,
    match_score: Math.floor(75 + Math.random() * 20),
    match_reasons: ['Matches your Mathematics requirement', 'Available during your preferred time', 'Within your budget range'],
  }))

  const stats = [
    { label: 'Upcoming Sessions', value: upcomingBookings.length.toString(), icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Active Tutors', value: '3', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Student Progress', value: '↑18%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Total Spent', value: formatCurrency(totalSpent), icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ]

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user.full_name.split(' ')[0]}! 👋</h1>
          <p className="text-[var(--muted-foreground)] text-sm mt-1">Here&apos;s what&apos;s happening with your tutoring sessions.</p>
        </div>
        <Link href="/tutors">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <Sparkles className="w-4 h-4" /> Find New Tutor
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Card key={stat.label} className="premium-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[var(--primary)]" />
                Upcoming Sessions
              </CardTitle>
              <Link href="/dashboard/parent/bookings">
                <Button variant="ghost" size="sm">View All <ArrowRight className="w-3 h-3" /></Button>
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-[var(--muted-foreground)]" />
                  <p className="font-medium">No upcoming sessions</p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">Book a session with a tutor to get started</p>
                  <Link href="/tutors"><Button className="mt-4" size="sm">Find Tutors</Button></Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingBookings.slice(0, 3).map(booking => {
                    const tutor = demoTutorProfiles.find(t => t.id === booking.tutor_id)
                    return (
                      <div key={booking.id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--secondary)]/50 hover:bg-[var(--secondary)] transition-colors">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {tutor?.user_id ? demoTutorProfiles.find(t => t.id === booking.tutor_id)?.user_id.slice(-1) || 'T' : 'T'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">{tutor ? `Tutor #${tutor.id.split('-')[1]}` : 'Tutor'}</p>
                            <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'} className="text-[10px]">{booking.status}</Badge>
                          </div>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            {formatDate(booking.date)} • {booking.start_time} • {booking.duration_minutes}min • {booking.is_online ? 'Online' : 'In-Person'}
                          </p>
                        </div>
                        <p className="font-semibold text-sm">{formatCurrency(booking.total_amount)}</p>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Recommended Tutors */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                AI Recommended for You
              </CardTitle>
              <Link href="/tutors">
                <Button variant="ghost" size="sm">Browse All <ArrowRight className="w-3 h-3" /></Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {recommendedTutors.map(tutor => (
                  <div key={tutor.id} className="p-4 rounded-xl border border-[var(--border)] hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {tutor.id.split('-')[1]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium text-sm">Tutor #{tutor.id.split('-')[1]}</p>
                          {tutor.is_verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                        </div>
                        <p className="text-xs text-[var(--muted-foreground)]">{tutor.subjects.join(', ')}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-medium">{tutor.rating}</span>
                          </div>
                          <span className="text-xs text-[var(--muted-foreground)]">{tutor.experience_years}y exp</span>
                          <span className="text-xs font-semibold">{formatCurrency(tutor.hourly_rate)}/hr</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge className="match-badge bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <Sparkles className="w-3 h-3" /> {tutor.match_score}% Match
                      </Badge>
                      <Link href={`/tutors/${tutor.id}`}>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </Link>
                    </div>
                    <p className="text-[11px] text-[var(--muted-foreground)] mt-2 italic">AI compatibility estimate</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* My Students */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--primary)]" /> My Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              {students.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-[var(--muted-foreground)]">No students added yet</p>
                  <Button className="mt-2" size="sm" variant="outline">Add Student</Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {students.map(student => (
                    <div key={student.id} className="p-3 rounded-xl bg-[var(--secondary)]/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-[var(--muted-foreground)]">Class {student.grade} • {student.board}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px]">{student.subjects.length} subjects</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Safety Status */}
          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-sm">Safety Status</h3>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Email Verified', done: true },
                  { label: 'Phone Verified', done: true },
                  { label: 'SOS System Active', done: true },
                  { label: 'Emergency Contact', done: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className={`w-4 h-4 ${item.done ? 'text-emerald-500' : 'text-[var(--muted-foreground)]'}`} />
                    <span className={item.done ? '' : 'text-[var(--muted-foreground)]'}>{item.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/safety">
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Shield className="w-3 h-3" /> Safety Center
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { href: '/tutors', icon: Sparkles, label: 'Find Tutor', color: 'text-purple-600' },
                  { href: '/map', icon: MapPin, label: 'Map Search', color: 'text-rose-500' },
                  { href: '/dashboard/parent/messages', icon: MessageSquare, label: 'Messages', color: 'text-blue-500' },
                  { href: '/dashboard/parent/bookings', icon: BookOpen, label: 'My Bookings', color: 'text-emerald-500' },
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
