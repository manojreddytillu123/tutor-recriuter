'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap, ArrowRight, CheckCircle2, User, BookOpen, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store'
import { saveStudent } from '@/lib/storage'

export default function ParentOnboardingPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [step, setStep] = useState(1)
  
  // Form fields
  const [studentName, setStudentName] = useState('')
  const [grade, setGrade] = useState('10')
  const [board, setBoard] = useState('CBSE')
  const [subjectInput, setSubjectInput] = useState('Mathematics, Physics')
  const [area, setArea] = useState('Koramangala, Bangalore')
  const [learningStyle, setLearningStyle] = useState<'visual' | 'auditory' | 'kinesthetic'>('visual')

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentName.trim()) return

    // Create student profile in localStorage
    saveStudent({
      id: `student-${Date.now()}`,
      parent_id: user?.id || 'parent-1',
      name: studentName.trim(),
      age: 15,
      grade,
      board,
      school: 'St. Xavier School',
      subjects: subjectInput.split(',').map(s => s.trim()).filter(Boolean),
      weak_subjects: ['Physics'],
      strong_subjects: ['Mathematics'],
      learning_style: learningStyle,
      learning_goals: ['Score >90% in Board Exams', 'Concept clarity'],
      created_at: new Date().toISOString(),
    })

    router.push('/dashboard/parent')
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to HomeTutor AI</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Let&apos;s set up your student profile in 2 quick steps</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-6">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-[var(--primary)]' : 'bg-[var(--secondary)]'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-[var(--primary)]' : 'bg-[var(--secondary)]'}`} />
        </div>

        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-xl">
              {step === 1 ? 'Step 1: Student Information' : 'Step 2: Location & Preferences'}
            </CardTitle>
            <CardDescription>
              {step === 1 ? 'Tell us about your child to personalize AI tutor matching' : 'Where would you like tutoring sessions to take place?'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold mb-1 block">Student Name</label>
                  <Input placeholder="e.g. Rahul Sharma" value={studentName} onChange={e => setStudentName(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold mb-1 block">Class / Grade</label>
                    <select value={grade} onChange={e => setGrade(e.target.value)} className="w-full h-10 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-sm">
                      {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={String(i + 1)}>Class {i + 1}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 block">Educational Board</label>
                    <select value={board} onChange={e => setBoard(e.target.value)} className="w-full h-10 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-sm">
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="State Board">State Board</option>
                      <option value="IB">IB</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Subjects Needed (comma separated)</label>
                  <Input value={subjectInput} onChange={e => setSubjectInput(e.target.value)} placeholder="Mathematics, Physics, Chemistry" />
                </div>
                <Button onClick={() => { if (studentName) setStep(2) }} disabled={!studentName.trim()} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white" size="lg">
                  Next Step <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFinish} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold mb-1 block">Your Location / Area</label>
                  <Input value={area} onChange={e => setArea(e.target.value)} placeholder="e.g. Koramangala, Bangalore" required />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Learning Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: 'visual', label: 'Visual', desc: 'Diagrams & videos' },
                      { type: 'auditory', label: 'Auditory', desc: 'Discussions & explanations' },
                      { type: 'kinesthetic', label: 'Kinesthetic', desc: 'Hands-on practice' },
                    ].map(style => (
                      <button
                        key={style.type}
                        type="button"
                        onClick={() => setLearningStyle(style.type as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${learningStyle === style.type ? 'border-[var(--primary)] bg-[var(--accent)]' : 'border-[var(--border)]'}`}
                      >
                        <p className="font-semibold text-xs">{style.label}</p>
                        <p className="text-[10px] text-[var(--muted-foreground)]">{style.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white" size="lg">
                    <Sparkles className="w-4 h-4" /> Complete Setup
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
