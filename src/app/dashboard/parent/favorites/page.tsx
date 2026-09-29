'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, Star, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { demoTutorProfiles } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'

export default function FavoritesPage() {
  const favoriteTutors = demoTutorProfiles.slice(0, 2)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Favorite Tutors</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Saved tutor profiles for quick booking</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {favoriteTutors.map(tutor => (
          <Card key={tutor.id} className="premium-card">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {tutor.id.split('-')[1]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold">{`Tutor #${tutor.id.split('-')[1]}`}</h3>
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-xs text-[var(--muted-foreground)]">{tutor.subjects.join(', ')}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold">{tutor.rating}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">• {tutor.experience_years}y exp</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-[var(--primary)]">{formatCurrency(tutor.hourly_rate)}/hr</span>
                  <Link href={`/tutors/${tutor.id}`}>
                    <Button size="sm">Book Session</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
