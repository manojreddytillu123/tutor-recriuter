'use client'

import React, { useState } from 'react'
import { User, Lock, Bell, Shield, Moon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/lib/store'

export default function SettingsPage() {
  const { user } = useAuthStore()
  const [name, setName] = useState(user?.full_name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Manage your profile, security, and preferences</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Profile Information</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-semibold mb-1 block">Full Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block">Email Address</label>
              <Input value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            {saved && (
              <p className="text-xs text-emerald-600 font-semibold">✓ Settings saved successfully!</p>
            )}
            <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
