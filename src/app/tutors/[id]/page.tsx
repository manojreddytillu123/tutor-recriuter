'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  Star, CheckCircle2, MapPin, Clock, BookOpen, MessageSquare,
  Heart, Shield, Sparkles, Calendar, Video, Globe, Home,
  Award, GraduationCap, Users, ArrowLeft, Share2, X, Check, CreditCard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { demoTutorProfiles, demoUsers, demoReviews } from '@/lib/demo-data'
import { formatCurrency, getMatchScoreColor, getMatchScoreBg } from '@/lib/utils'
import { saveBooking } from '@/lib/storage'
import { useAuthStore } from '@/lib/store'

export default function TutorProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuthStore()
  const tutorId = params.id as string
  const tutor = demoTutorProfiles.find(t => t.id === tutorId)
  const tutorUser = demoUsers.find(u => u.id === tutor?.user_id)

  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'availability'>('about')

  // Modals state
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Booking form fields
  const [selectedDate, setSelectedDate] = useState('2026-10-05')
  const [selectedTime, setSelectedTime] = useState('05:00 PM')
  const [selectedMode, setSelectedMode] = useState<'online' | 'inperson'>('online')
  const [selectedSubject, setSelectedSubject] = useState(tutor?.subjects[0] || 'Mathematics')

  if (!tutor || !tutorUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Tutor Not Found</h2>
          <p className="text-[var(--muted-foreground)] mb-4">The tutor profile you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/tutors"><Button>Browse Tutors</Button></Link>
        </div>
      </div>
    )
  }

  const matchScore = Math.floor(75 + Math.random() * 20)
  const reviews = demoReviews.filter(r => r.reviewee_id === tutorId)

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault()

    const newBooking = {
      id: `book-${Date.now()}`,
      parent_id: user?.id || 'parent-1',
      student_id: 'student-1',
      tutor_id: tutor.id,
      type: 'trial' as const,
      status: 'confirmed' as const,
      date: selectedDate,
      start_time: selectedTime,
      end_time: '06:00 PM',
      duration_minutes: 60,
      is_online: selectedMode === 'online',
      location_address: selectedMode === 'inperson' ? `${tutor.location_area}, ${tutor.city}` : undefined,
      goals: `Trial session for ${selectedSubject}`,
      price: tutor.hourly_rate,
      platform_fee: tutor.hourly_rate * 0.1,
      total_amount: tutor.hourly_rate,
      payment_status: 'successful' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    saveBooking(newBooking)
    setBookingSuccess(true)
    setTimeout(() => {
      setShowBookingModal(false)
      setBookingSuccess(false)
      router.push('/dashboard/parent/bookings')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/tutors" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Tutors
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile card */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                    {tutorUser.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className="text-2xl font-bold">{tutorUser.full_name}</h1>
                          {tutor.is_verified && (
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30">
                              <CheckCircle2 className="w-4 h-4 text-blue-500" />
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Verified</span>
                            </div>
                          )}
                        </div>
                        <p className="text-[var(--muted-foreground)] mt-1">{tutor.headline}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setIsFavorite(!isFavorite)} className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)]" aria-label="Toggle favorite">
                          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                        <button className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)]" aria-label="Share">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{tutor.rating}</span>
                        <span className="text-sm text-[var(--muted-foreground)]">({tutor.total_reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                        <Clock className="w-4 h-4" /> {tutor.experience_years} years exp
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                        <MapPin className="w-4 h-4" /> {tutor.location_area}, {tutor.city}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                        <Users className="w-4 h-4" /> {tutor.completed_sessions} sessions
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {tutor.subjects.map(subject => (
                        <Badge key={subject} variant="secondary">{subject}</Badge>
                      ))}
                      {tutor.online_available && <Badge variant="outline"><Globe className="w-3 h-3 mr-1" /> Online</Badge>}
                      {tutor.inperson_available && <Badge variant="outline"><Home className="w-3 h-3 mr-1" /> In-Person</Badge>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Match */}
            <Card className={`border ${getMatchScoreBg(matchScore).replace('bg-', 'border-').replace('50', '200')}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className={`w-6 h-6 ${getMatchScoreColor(matchScore)}`} />
                    <div>
                      <p className="font-semibold">AI Compatibility Estimate</p>
                      <p className="text-xs text-[var(--muted-foreground)]">Based on your student profile analysis</p>
                    </div>
                  </div>
                  <span className={`text-3xl font-bold ${getMatchScoreColor(matchScore)}`}>{matchScore}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <div className="flex gap-1 bg-[var(--secondary)] rounded-xl p-1">
              {(['about', 'reviews', 'availability'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-[var(--card)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'about' && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader><CardTitle className="text-base">About</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{tutor.bio}</p></CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-base">Education</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tutor.education.map((edu, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--secondary)]">
                          <GraduationCap className="w-5 h-5 text-[var(--primary)] mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">{edu.degree} in {edu.field}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">{edu.institution} • {edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4 animate-fade-in">
                {reviews.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Star className="w-12 h-12 mx-auto mb-3 text-[var(--muted-foreground)]" />
                      <p className="font-medium">No reviews yet</p>
                      <p className="text-sm text-[var(--muted-foreground)]">Be the first to review this tutor</p>
                    </CardContent>
                  </Card>
                ) : (
                  reviews.map(review => (
                    <Card key={review.id}>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === 'availability' && (
              <Card className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                      <div key={day} className="text-center">
                        <p className="text-xs text-[var(--muted-foreground)] mb-2">{day}</p>
                        <div className={`py-3 rounded-lg text-xs font-medium ${i > 0 && i < 6 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'bg-[var(--secondary)] text-[var(--muted-foreground)]'}`}>
                          {i > 0 && i < 6 ? '9AM-6PM' : 'Off'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => setShowBookingModal(true)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <Calendar className="w-4 h-4" /> Book a Session
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Action Card */}
          <div className="space-y-6">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-[var(--primary)]">{formatCurrency(tutor.hourly_rate)}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">per hour</p>
                </div>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    size="lg"
                  >
                    <Calendar className="w-4 h-4" /> Book Trial Session
                  </Button>

                  <Button
                    onClick={() => router.push('/dashboard/parent/messages')}
                    className="w-full"
                    variant="outline"
                    size="lg"
                  >
                    <MessageSquare className="w-4 h-4" /> Send Message
                  </Button>

                  <Button
                    onClick={() => setShowVideoModal(true)}
                    className="w-full"
                    variant="outline"
                    size="lg"
                  >
                    <Video className="w-4 h-4" /> Video Interview
                  </Button>
                </div>

                <div className="mt-6 space-y-3 border-t border-[var(--border)] pt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">Response time</span>
                    <span className="font-semibold">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">Sessions completed</span>
                    <span className="font-semibold">{tutor.completed_sessions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[var(--card)] w-full max-w-md rounded-2xl border border-[var(--border)] shadow-2xl p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Book Tutoring Session</h3>
              <button onClick={() => setShowBookingModal(false)}><X className="w-5 h-5 text-[var(--muted-foreground)]" /></button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg">Booking Confirmed!</h4>
                <p className="text-xs text-[var(--muted-foreground)]">Redirecting to your bookings dashboard...</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold mb-1 block">Subject</label>
                  <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="w-full h-10 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-sm">
                    {tutor.subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold mb-1 block">Date</label>
                    <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 block">Time Slot</label>
                    <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} className="w-full h-10 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-sm">
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Session Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setSelectedMode('online')} className={`p-2.5 rounded-lg border text-xs font-semibold ${selectedMode === 'online' ? 'border-[var(--primary)] bg-[var(--accent)]' : 'border-[var(--border)]'}`}>Online Video</button>
                    <button type="button" onClick={() => setSelectedMode('inperson')} className={`p-2.5 rounded-lg border text-xs font-semibold ${selectedMode === 'inperson' ? 'border-[var(--primary)] bg-[var(--accent)]' : 'border-[var(--border)]'}`}>In-Person Home</button>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--secondary)] flex justify-between items-center text-sm">
                  <span>Total Hourly Rate</span>
                  <span className="font-bold text-[var(--primary)]">{formatCurrency(tutor.hourly_rate)}</span>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white" size="lg">
                  <CreditCard className="w-4 h-4" /> Confirm Booking & Pay
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Video Interview Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white w-full max-w-lg rounded-2xl border border-slate-800 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-400" /> Video Interview with {tutorUser.full_name}
              </h3>
              <button onClick={() => setShowVideoModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="aspect-video bg-slate-950 rounded-xl flex flex-col items-center justify-center p-6 text-center border border-slate-800 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl mb-3">
                {tutorUser.full_name.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="font-semibold text-sm">{tutorUser.full_name}</p>
              <p className="text-xs text-emerald-400 mt-1">● Ready for 5-minute intro call</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setShowVideoModal(false)} variant="outline" className="flex-1 text-slate-900">Cancel</Button>
              <Button onClick={() => { alert('Starting demo video stream...'); setShowVideoModal(false); }} className="flex-1 bg-emerald-500 text-white hover:bg-emerald-600">Start Interview</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
