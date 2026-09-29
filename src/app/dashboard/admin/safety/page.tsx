'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function AdminSafetyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Safety & Emergency SOS Command</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Monitor real-time safety alerts and emergency SOS triggers</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader><CardTitle className="text-base text-red-600 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Active SOS Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="flex justify-between">
                <span className="font-bold text-red-700 dark:text-red-400">SOS Triggered - Session #book-1</span>
                <Badge variant="warning">DEMO ALERT</Badge>
              </div>
              <p className="text-xs text-red-600 dark:text-red-300 mt-1">Parent: Parent User • Tutor: Dr. Ananya Sharma</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Location: Indiranagar, Bangalore</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" className="bg-red-600 text-white hover:bg-red-700">Acknowledge</Button>
                <Button size="sm" variant="outline">Contact Parent</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Pre-session Verification Log</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-xs flex justify-between items-center">
              <span>Session #book-2: All safety checks passed</span>
              <Badge variant="success">✓ Verified</Badge>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-xs flex justify-between items-center">
              <span>Session #book-3: Location tracking active</span>
              <Badge variant="success">✓ Tracking</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
