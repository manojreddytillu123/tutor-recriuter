'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  GraduationCap, LayoutDashboard, Search, MapPin, Users, Calendar,
  BookOpen, MessageSquare, BarChart3, CreditCard, Heart, Shield,
  Bot, Settings, LogOut, Bell, Menu, X, Moon, Sun, ChevronDown,
  Star, ClipboardList, CheckCircle, FileText, AlertTriangle, User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/store'
import { demoNotifications } from '@/lib/demo-data'

const parentLinks = [
  { href: '/dashboard/parent', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tutors', label: 'Find Tutors', icon: Search },
  { href: '/map', label: 'Map', icon: MapPin },
  { href: '/dashboard/parent/students', label: 'My Students', icon: Users },
  { href: '/dashboard/parent/calendar', label: 'Calendar', icon: Calendar },
  { href: '/dashboard/parent/bookings', label: 'Bookings', icon: BookOpen },
  { href: '/dashboard/parent/messages', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/parent/study-plans', label: 'Study Plans', icon: ClipboardList },
  { href: '/dashboard/parent/progress', label: 'Progress', icon: BarChart3 },
  { href: '/dashboard/parent/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/parent/favorites', label: 'Favorites', icon: Heart },
  { href: '/safety', label: 'Safety', icon: Shield },
  { href: '/dashboard/parent/settings', label: 'Settings', icon: Settings },
]

const tutorLinks = [
  { href: '/dashboard/tutor', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/tutor/students', label: 'Students', icon: Users },
  { href: '/dashboard/tutor/bookings', label: 'Bookings', icon: BookOpen },
  { href: '/dashboard/tutor/calendar', label: 'Calendar', icon: Calendar },
  { href: '/dashboard/tutor/messages', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/tutor/earnings', label: 'Earnings', icon: CreditCard },
  { href: '/dashboard/tutor/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/tutor/verification', label: 'Verification', icon: CheckCircle },
  { href: '/dashboard/tutor/profile', label: 'Profile', icon: User },
  { href: '/dashboard/tutor/settings', label: 'Settings', icon: Settings },
]

const adminLinks = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/admin/users', label: 'Users', icon: Users },
  { href: '/dashboard/admin/verification', label: 'Verification', icon: CheckCircle },
  { href: '/dashboard/admin/bookings', label: 'Bookings', icon: BookOpen },
  { href: '/dashboard/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/admin/safety', label: 'Safety & SOS', icon: Shield },
  { href: '/dashboard/admin/reports', label: 'Reports', icon: AlertTriangle },
  { href: '/dashboard/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/admin/subjects', label: 'Subjects', icon: BookOpen },
  { href: '/dashboard/admin/audit', label: 'Audit Logs', icon: FileText },
  { href: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [isDark])

  if (!user) return null

  const links = user.role === 'admin' ? adminLinks : user.role === 'tutor' ? tutorLinks : parentLinks
  const userNotifs = demoNotifications.filter(n => n.user_id === user.id)
  const unreadCount = userNotifs.filter(n => !n.is_read).length

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[var(--muted)]/30 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:w-64 flex-col fixed inset-y-0 z-50 bg-[var(--card)] border-r border-[var(--border)]">
        <div className="p-4 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold">HomeTutor <span className="text-[var(--primary)]">AI</span></span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-1">
          {links.map(link => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.full_name}</p>
              <p className="text-xs text-[var(--muted-foreground)] capitalize">{user.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="sidebar-link w-full mt-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 inset-y-0 w-72 bg-[var(--card)] animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <Link href="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">HomeTutor AI</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X className="w-5 h-5" /></button>
            </div>
            <nav className="p-3 space-y-1">
              {links.map(link => (
                <Link key={link.href} href={link.href} className={`sidebar-link ${pathname === link.href ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-[var(--card)]/95 backdrop-blur-xl border-b border-[var(--border)]">
          <div className="flex items-center justify-between h-14 px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-sm font-semibold capitalize hidden sm:block">
                {user.role} Dashboard
              </h1>
              <Badge variant="warning" className="text-[10px]">DEMO</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/tutors">
                <Button variant="ghost" size="icon" className="hidden sm:flex" aria-label="Search tutors">
                  <Search className="w-4 h-4" />
                </Button>
              </Link>

              <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} aria-label="Toggle theme">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <div className="relative">
                <Button variant="ghost" size="icon" onClick={() => setNotifOpen(!notifOpen)} aria-label="Notifications">
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {notifOpen && (
                  <div className="absolute right-0 top-12 w-80 bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-xl overflow-hidden animate-scale-in">
                    <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      <button className="text-xs text-[var(--primary)]">Mark all read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {userNotifs.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-[var(--muted-foreground)]" />
                          <p className="text-sm text-[var(--muted-foreground)]">No notifications</p>
                        </div>
                      ) : (
                        userNotifs.map(notif => (
                          <div key={notif.id} className={`p-4 border-b border-[var(--border)] hover:bg-[var(--secondary)]/50 cursor-pointer ${!notif.is_read ? 'bg-[var(--accent)]/30' : ''}`}>
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-medium">{notif.title}</p>
                              {!notif.is_read && <div className="w-2 h-2 bg-[var(--primary)] rounded-full flex-shrink-0 mt-1.5" />}
                            </div>
                            <p className="text-xs text-[var(--muted-foreground)] mt-1">{notif.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                {user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6 animate-fade-in">
          {children}
        </main>
      </div>

      {/* AI Chatbot Floating Button */}
      <Link href="/dashboard/parent/ai-assistant" className="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8">
        <button className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center hover:shadow-xl hover:scale-105 transition-all" aria-label="AI Assistant">
          <Bot className="w-6 h-6" />
        </button>
      </Link>
    </div>
  )
}
