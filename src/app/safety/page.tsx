'use client'

import React from 'react'
import Link from 'next/link'
import {
  Shield, ShieldCheck, Lock, MapPin, MessageSquare, AlertTriangle,
  CheckCircle2, Eye, Phone, FileText, Users, Bell, GraduationCap,
  ArrowRight, Heart, UserCheck, Video, Calendar, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function SafetyPage() {
  const verificationSteps = [
    { icon: UserCheck, title: 'Email Verification', desc: 'Every user verifies their email address during registration.' },
    { icon: Phone, title: 'Phone Verification', desc: 'OTP-based phone number verification for identity confirmation.' },
    { icon: FileText, title: 'Identity Verification', desc: 'Government-issued ID verification for tutors. Documents reviewed by admin.' },
    { icon: GraduationCap, title: 'Education Verification', desc: 'Degree and certification documents verified before tutor approval.' },
    { icon: Video, title: 'Video Introduction', desc: 'Tutors submit introduction videos reviewed for professionalism.' },
    { icon: ShieldCheck, title: 'Admin Approval', desc: 'Final review and approval by our platform team before tutor goes live.' },
  ]

  const safetyFeatures = [
    { icon: Shield, title: 'SOS Emergency Alert', desc: 'One-tap SOS button during any session. Instantly alerts parents and platform safety team.', color: 'from-red-500 to-rose-600' },
    { icon: MapPin, title: 'Session Tracking', desc: 'Approximate location tracking during in-person sessions. Parents can monitor in real-time.', color: 'from-blue-500 to-indigo-600' },
    { icon: MessageSquare, title: 'Safe Messaging', desc: 'Contact information protection. Personal details are not shared until booking is confirmed.', color: 'from-emerald-500 to-teal-600' },
    { icon: Lock, title: 'Privacy Protection', desc: 'No exact addresses exposed. Only approximate service areas shown on maps.', color: 'from-purple-500 to-violet-600' },
    { icon: Eye, title: 'Parent Visibility', desc: 'Parents can see session status, tutor location, and receive real-time updates.', color: 'from-amber-500 to-orange-600' },
    { icon: AlertTriangle, title: 'Report System', desc: 'Report any concerns about tutors, sessions, or messages. Admin investigates all reports.', color: 'from-pink-500 to-rose-600' },
  ]

  const preSessionChecklist = [
    { label: 'Tutor identity verified', checked: true },
    { label: 'Booking confirmed', checked: true },
    { label: 'Parent notified', checked: true },
    { label: 'Session location shared', checked: true },
    { label: 'SOS system available', checked: true },
    { label: 'Emergency contact set', checked: false },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-6">
            <Shield className="w-3 h-3 mr-1" /> Safety Center
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Your Safety Is Our Priority</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Multi-layered safety system designed to protect students and parents during every tutoring experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login"><Button size="lg" className="bg-white text-emerald-600 hover:bg-white/90 border-0">Get Started Safely</Button></Link>
            <Link href="/tutors"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Find Verified Tutors</Button></Link>
          </div>
        </div>
      </div>

      {/* Tutor Verification */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tutor Verification Process</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">Every tutor undergoes a rigorous multi-step verification before they can teach on our platform.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verificationSteps.map((step, i) => (
              <Card key={i} className="premium-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xs font-bold text-emerald-700">{i + 1}</div>
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-[var(--muted-foreground)] mt-6 flex items-center justify-center gap-1">
            <Badge variant="warning" className="text-[10px]">DEMO</Badge>
            In demo mode, verification uses mock services. Clearly labeled as DEMO VERIFICATION.
          </p>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-20 bg-[var(--secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Safety Features</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">Comprehensive safety tools for every tutoring session.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyFeatures.map((feature, i) => (
              <Card key={i} className="premium-card">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SOS Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-red-200 dark:border-red-800 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-rose-600 p-8 text-white text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-2">🔴 SOS Emergency System</h2>
              <p className="text-white/80 max-w-xl mx-auto">
                Available during every in-person tutoring session. One tap sends an immediate alert.
              </p>
            </div>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">When SOS is Activated:</h3>
                  <div className="space-y-3">
                    {[
                      'Emergency incident record created',
                      'Session ID and timestamp recorded',
                      'Approximate location captured (if permitted)',
                      'Parent notified immediately',
                      'Platform safety team alerted',
                      'Safety instructions displayed',
                      'Emergency service contact provided',
                      'Session can be terminated',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Pre-Session Safety Checklist:</h3>
                  <div className="space-y-3">
                    {preSessionChecklist.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--secondary)]">
                        <CheckCircle2 className={`w-5 h-5 ${item.checked ? 'text-emerald-500' : 'text-gray-300'}`} />
                        <span className={`text-sm ${item.checked ? '' : 'text-[var(--muted-foreground)]'}`}>{item.label}</span>
                        {item.checked ? (
                          <Badge variant="success" className="ml-auto text-[10px]">✓</Badge>
                        ) : (
                          <Badge variant="outline" className="ml-auto text-[10px]">Pending</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-sm text-amber-800 dark:text-amber-400">Important Note</span>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  The SOS system does not automatically contact police or emergency services unless a real integration exists. 
                  In demo mode, SOS alerts are labeled as &quot;DEMO ALERT&quot;. For actual emergencies, always contact local emergency services directly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-20 bg-[var(--secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Privacy Protection</h2>
            <p className="text-[var(--muted-foreground)]">Your personal information is always protected.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Location Privacy', desc: 'Only approximate service areas shown. No exact home addresses are ever exposed to other users.' },
              { icon: Lock, title: 'Data Encryption', desc: 'All personal data, documents, and messages are encrypted and securely stored.' },
              { icon: Eye, title: 'Controlled Visibility', desc: 'Phone numbers and personal details are only shared after a booking is confirmed by both parties.' },
            ].map((item, i) => (
              <Card key={i} className="premium-card">
                <CardContent className="p-6 text-center">
                  <item.icon className="w-8 h-8 mx-auto mb-4 text-[var(--primary)]" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Learn with Confidence</h2>
          <p className="text-[var(--muted-foreground)] mb-8 max-w-xl mx-auto">Join our platform where every tutor is verified, every session is tracked, and safety is built into everything we do.</p>
          <Link href="/register">
            <Button size="xl" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
