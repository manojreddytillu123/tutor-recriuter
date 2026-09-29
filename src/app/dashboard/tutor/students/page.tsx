'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { demoStudentProfiles } from '@/lib/demo-data'

export default function TutorStudentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Students</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Active students assigned to your tutoring sessions</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {demoStudentProfiles.map(s => (
          <Card key={s.id} className="premium-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {s.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{s.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">Class {s.grade} • {s.board}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {s.subjects.map(sub => <Badge key={sub} variant="outline" className="text-xs">{sub}</Badge>)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
