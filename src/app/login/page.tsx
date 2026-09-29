'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/store'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      const { user } = useAuthStore.getState()
      if (user?.role === 'admin') router.push('/dashboard/admin')
      else if (user?.role === 'tutor') router.push('/dashboard/tutor')
      else router.push('/dashboard/parent')
    } else {
      setError(result.error || 'Login failed')
    }
    setIsLoading(false)
  }

  const quickLogin = async (email: string) => {
    setEmail(email)
    setPassword('demo123')
    setIsLoading(true)
    const result = await login(email, 'demo123')
    if (result.success) {
      const { user } = useAuthStore.getState()
      if (user?.role === 'admin') router.push('/dashboard/admin')
      else if (user?.role === 'tutor') router.push('/dashboard/tutor')
      else router.push('/dashboard/parent')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl">HomeTutor AI</span>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-white/80 text-lg mb-8">Sign in to continue your learning journey with AI-powered tutoring.</p>
          
          <div className="space-y-4">
            {[
              { icon: Sparkles, text: 'AI-matched tutor recommendations' },
              { icon: Lock, text: 'Secure, verified tutoring sessions' },
              { icon: ArrowRight, text: 'Personalized study plans' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-white/90">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mb-20" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full" />
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">HomeTutor AI</span>
          </div>

          <Card className="border-0 shadow-none lg:border lg:shadow-sm">
            <CardHeader className="space-y-1 px-0 lg:px-6">
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription>Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <CardContent className="px-0 lg:px-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-[var(--muted-foreground)]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <Link href="/forgot-password" className="text-sm text-[var(--primary)] hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[var(--muted-foreground)]" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white" size="lg" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-[var(--background)] px-2 text-[var(--muted-foreground)]">Demo Quick Login</span></div>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    { label: 'Parent Demo', email: 'parent.demo@example.com', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800', icon: '👨‍👩‍👧' },
                    { label: 'Tutor Demo', email: 'tutor.demo@example.com', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800', icon: '👩‍🏫' },
                    { label: 'Admin Demo', email: 'admin.demo@example.com', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800', icon: '🔧' },
                  ].map(demo => (
                    <button
                      key={demo.email}
                      onClick={() => quickLogin(demo.email)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border ${demo.color} hover:opacity-80 transition-opacity`}
                      disabled={isLoading}
                    >
                      <span className="flex items-center gap-2">
                        <span>{demo.icon}</span>
                        <span className="font-medium text-sm">{demo.label}</span>
                      </span>
                      <span className="text-xs opacity-70">{demo.email}</span>
                    </button>
                  ))}
                </div>
                <div className="text-center text-xs text-[var(--muted-foreground)] mt-3 flex items-center justify-center gap-1">
                  <Badge variant="warning" className="text-[10px]">DEMO</Badge>
                  Password not required in demo mode
                </div>
              </div>

              <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-[var(--primary)] hover:underline font-medium">Sign up</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
