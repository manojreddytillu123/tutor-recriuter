'use client'

import React from 'react'
import { BarChart3, TrendingUp, Award, BookOpen, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Student Progress & Analytics</h1>
        <p className="text-sm text-[var(--muted-foreground)]">AI insights into academic performance and learning speed</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="premium-card">
          <CardContent className="p-5">
            <p className="text-xs text-[var(--muted-foreground)]">Overall Performance</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">88%</p>
            <p className="text-xs text-emerald-600 mt-2">↑ +14% since joining HomeTutor AI</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-5">
            <p className="text-xs text-[var(--muted-foreground)]">Hours Studied</p>
            <p className="text-3xl font-bold text-[var(--primary)] mt-1">24.5 hrs</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-2">Across 16 completed sessions</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-5">
            <p className="text-xs text-[var(--muted-foreground)]">Topics Mastered</p>
            <p className="text-3xl font-bold text-purple-600 mt-1">18 / 22</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-2">Class 10 CBSE Curriculum</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Subject Mastery Breakdown</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { subject: 'Mathematics', score: 92, status: 'Exceeding Expectations' },
            { subject: 'Physics', score: 84, status: 'On Track' },
            { subject: 'Chemistry', score: 78, status: 'Needs Practice' },
          ].map(item => (
            <div key={item.subject} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{item.subject}</span>
                <span className="font-bold">{item.score}%</span>
              </div>
              <div className="h-2 bg-[var(--secondary)] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" style={{ width: `${item.score}%` }} />
              </div>
              <p className="text-[10px] text-[var(--muted-foreground)]">{item.status}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
