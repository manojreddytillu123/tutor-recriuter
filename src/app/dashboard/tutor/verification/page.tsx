'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ShieldCheck, Upload, FileText } from 'lucide-react'

export default function VerificationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tutor Verification Portal</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Upload government ID, degree certificates, and video intro to get verified</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Identity & Degree Verification</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl border border-[var(--border)] flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">Government Issued ID (Aadhaar / Passport)</p>
                <p className="text-xs text-[var(--muted-foreground)]">Status: Verified by Admin</p>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">Highest Degree Certificate (M.Sc Physics)</p>
                <p className="text-xs text-[var(--muted-foreground)]">Status: Verified by Admin</p>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Video Introduction</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white p-6 text-center">
              <p className="font-semibold text-sm">Intro Video Uploaded (1 min 30 sec)</p>
              <p className="text-xs text-white/70 mt-1">Reviewed and approved by HomeTutor AI safety team</p>
            </div>
            <Button variant="outline" className="w-full"><Upload className="w-4 h-4 mr-2" /> Re-upload Video</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
