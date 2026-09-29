'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GraduationCap, Mail, Lock, Eye, EyeOff, User, ArrowRight, Users, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store'
import { UserRole } from '@/lib/types'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<UserRole | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { register } = useAuthStore()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) return
    setError('')
    setIsLoading(true)

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    const result = await register(email, password, name, role)
    
    if (result.success) {
      if (role === 'tutor') router.push('/onboarding/tutor')
      else router.push('/onboarding/parent')
    } else {
      setError(result.error || 'Registration failed')
    }
    setIsLoading(false)
  }

  const passwordStrength = (() => {
    if (password.length === 0) return { level: 0, label: '', color: '' }
    if (password.length < 6) return { level: 1, label: 'Weak', color: 'bg-red-500' }
    if (password.length < 10) return { level: 2, label: 'Fair', color: 'bg-amber-500' }
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return { level: 4, label: 'Strong', color: 'bg-emerald-500' }
    return { level: 3, label: 'Good', color: 'bg-blue-500' }
  })()

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl">HomeTutor AI</span>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Join HomeTutor AI</h1>
          <p className="text-white/80 text-lg mb-8">Create your account and start your personalized learning journey today.</p>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '5K+', label: 'Verified Tutors' },
              { value: '21K+', label: 'Students' },
              { value: '50+', label: 'Subjects' },
              { value: '97%', label: 'Satisfaction' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mb-20" />
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">HomeTutor AI</span>
          </div>

          <Card className="border-0 shadow-none lg:border lg:shadow-sm">
            <CardHeader className="px-0 lg:px-6">
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription>
                {step === 1 ? 'How do you want to use HomeTutor AI?' : 'Fill in your details to get started'}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 lg:px-6">
              {step === 1 ? (
                <div className="space-y-4">
                  {[
                    { role: 'parent' as UserRole, icon: Users, label: 'Parent / Student', desc: 'Find tutors, book sessions, track learning progress', color: 'from-blue-500 to-indigo-600' },
                    { role: 'tutor' as UserRole, icon: BookOpen, label: 'Tutor', desc: 'Create profile, find students, manage sessions & earnings', color: 'from-emerald-500 to-teal-600' },
                  ].map(option => (
                    <button
                      key={option.role}
                      onClick={() => { setRole(option.role); setStep(2) }}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all hover:shadow-md ${role === option.role ? 'border-[var(--primary)] bg-[var(--accent)]' : 'border-[var(--border)] hover:border-[var(--primary)]/50'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center flex-shrink-0`}>
                        <option.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">{option.label}</p>
                        <p className="text-sm text-[var(--muted-foreground)]">{option.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-[var(--muted-foreground)]" />
                      <Input id="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-[var(--muted-foreground)]" />
                      <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-[var(--muted-foreground)]" />
                      <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[var(--muted-foreground)]" aria-label="Toggle password">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {password.length > 0 && (
                      <div className="space-y-1">
                        <div className="flex gap-1">
                          {[1,2,3,4].map(i => (
                            <div key={i} className={`h-1 flex-1 rounded-full ${i <= passwordStrength.level ? passwordStrength.color : 'bg-[var(--secondary)]'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-[var(--muted-foreground)]">Password strength: {passwordStrength.label}</p>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 text-sm p-3 rounded-lg">{error}</div>
                  )}

                  <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white" size="lg" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    ← Change role
                  </button>
                </form>
              )}

              <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
                Already have an account?{' '}
                <Link href="/login" className="text-[var(--primary)] hover:underline font-medium">Sign in</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
