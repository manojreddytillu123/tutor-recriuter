'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap, ArrowRight, CheckCircle2, Sparkles, BookOpen, Clock, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store'
import { saveTutor } from '@/lib/storage'

export default function TutorOnboardingPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  
  const [headline, setHeadline] = useState('Certified Mathematics & Science Educator')
  const [rate, setRate] = useState('750')
  const [experience, setExperience] = useState('5')
  const [subjects, setSubjects] = useState('Mathematics, Physics')

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault()

    saveTutor({
      id: `tutor-${Date.now()}`,
      user_id: user?.id || 'tutor-1',
      headline,
      bio: 'Experienced educator dedicated to student success and concept clarity.',
      education: [{ degree: 'B.Sc', institution: 'State University', year: 2020, field: 'Science' }],
      qualifications: ['B.Sc Science'],
      certifications: ['Certified Educator'],
      experience_years: Number(experience),
      subjects: subjects.split(',').map(s => s.trim()).filter(Boolean),
      grade_levels: ['8', '9', '10', '11', '12'],
      languages: ['English', 'Hindi'],
      teaching_methodology: ['Interactive Discussion', 'Problem Solving'],
      learning_styles_supported: ['visual', 'kinesthetic'],
      hourly_rate: Number(rate),
      currency: 'INR',
      travel_radius_km: 10,
      online_available: true,
      inperson_available: true,
      location_area: 'Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      rating: 5.0,
      total_reviews: 1,
      completed_sessions: 0,
      profile_completion: 100,
      is_verified: true,
      verification_status: 'approved',
      admin_approved: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    router.push('/dashboard/tutor')
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Welcome, Tutor!</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Set up your teaching profile to start receiving student bookings</p>
        </div>

        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-xl">Tutor Profile Setup</CardTitle>
            <CardDescription>Fill in your teaching details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFinish} className="space-y-4">
              <div>
                <label className="text-xs font-semibold mb-1 block">Profile Headline</label>
                <Input value={headline} onChange={e => setHeadline(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1 block">Hourly Rate (₹)</label>
                  <Input type="number" value={rate} onChange={e => setRate(e.target.value)} required />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Teaching Experience (Years)</label>
                  <Input type="number" value={experience} onChange={e => setExperience(e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block">Subjects Taught (comma separated)</label>
                <Input value={subjects} onChange={e => setSubjects(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white" size="lg">
                <Sparkles className="w-4 h-4" /> Go to Tutor Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
