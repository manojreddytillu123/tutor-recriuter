'use client'

import React from 'react'
import {
  Users, GraduationCap, BookOpen, CreditCard, Shield, AlertTriangle,
  TrendingUp, CheckCircle, Clock, Calendar, Star, BarChart3, ArrowUp, ArrowDown
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { demoUsers, demoBookings, demoTutorProfiles } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'

export default function AdminDashboard() {
  const parents = demoUsers.filter(u => u.role === 'parent')
  const tutors = demoUsers.filter(u => u.role === 'tutor')
  const verifiedTutors = tutors.filter(u => u.is_verified)
  const pendingTutors = tutors.filter(u => !u.is_verified)
  const totalBookings = demoBookings.length
  const completedBookings = demoBookings.filter(b => b.status === 'completed')
  const totalRevenue = completedBookings.reduce((s, b) => s + b.platform_fee, 0)

  const metrics = [
    { label: 'Total Users', value: demoUsers.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', trend: '+12%', trendUp: true },
    { label: 'Parents', value: parents.length.toString(), icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', trend: '+8%', trendUp: true },
    { label: 'Tutors', value: tutors.length.toString(), icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', trend: '+15%', trendUp: true },
    { label: 'Verified Tutors', value: verifiedTutors.length.toString(), icon: CheckCircle, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20', trend: '+5', trendUp: true },
    { label: 'Pending Verification', value: pendingTutors.length.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', trend: '-2', trendUp: false },
    { label: 'Total Bookings', value: totalBookings.toString(), icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20', trend: '+22%', trendUp: true },
    { label: 'Platform Revenue', value: formatCurrency(totalRevenue * 100), icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', trend: '+18%', trendUp: true },
    { label: 'SOS Incidents', value: '2', icon: Shield, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', trend: '-1', trendUp: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-[var(--muted-foreground)] text-sm mt-1">Platform overview and management</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(metric => (
          <Card key={metric.label} className="premium-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${metric.bg} flex items-center justify-center`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${metric.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                  {metric.trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {metric.trend}
                </div>
              </div>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Verifications */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-500" />
              Pending Verifications
              <Badge variant="warning">{pendingTutors.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingTutors.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-emerald-500" />
                <p className="font-medium">All caught up!</p>
                <p className="text-sm text-[var(--muted-foreground)]">No pending verifications</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingTutors.map(tutor => {
                  const profile = demoTutorProfiles.find(t => t.user_id === tutor.id)
                  return (
                    <div key={tutor.id} className="flex items-center gap-4 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                        {tutor.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{tutor.full_name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{profile?.subjects.join(', ') || 'Subjects pending'}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 transition-colors">Approve</button>
                        <button className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-medium hover:bg-[var(--secondary)] transition-colors">Review</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platform Health */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[var(--primary)]" /> Platform Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'Satisfaction Rate', value: '97%', color: 'bg-emerald-500' },
                  { label: 'Booking Completion', value: '94%', color: 'bg-blue-500' },
                  { label: 'Tutor Response Rate', value: '89%', color: 'bg-purple-500' },
                  { label: 'Safety Score', value: '99%', color: 'bg-teal-500' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                    <div className="h-2 bg-[var(--secondary)] rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: item.value }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Safety Alerts */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-500" /> Safety Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">1 Active SOS</p>
                  </div>
                  <p className="text-xs text-red-600/70 dark:text-red-400/70">Demo SOS alert — no real emergency</p>
                  <Badge variant="warning" className="mt-2 text-[10px]">DEMO ALERT</Badge>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">2 Reports Pending</p>
                  <p className="text-xs text-amber-600/70 dark:text-amber-400/70">Review needed for reported content</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Subjects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: 'Mathematics', bookings: 245, icon: '📐' },
                  { name: 'Physics', bookings: 189, icon: '⚛️' },
                  { name: 'Chemistry', bookings: 156, icon: '🧪' },
                  { name: 'English', bookings: 134, icon: '📖' },
                  { name: 'Biology', bookings: 112, icon: '🧬' },
                ].map((subject, i) => (
                  <div key={subject.name} className="flex items-center gap-3 p-2">
                    <span className="text-lg">{subject.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{subject.name}</p>
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)]">{subject.bookings} bookings</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
