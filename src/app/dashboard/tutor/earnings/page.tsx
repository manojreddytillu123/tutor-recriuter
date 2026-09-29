'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

export default function TutorEarningsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Earnings & Payouts</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Track completed sessions, platform commissions, and direct bank payouts</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="premium-card">
          <CardContent className="p-5">
            <p className="text-xs text-[var(--muted-foreground)]">Total Earnings</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">{formatCurrency(24500)}</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-5">
            <p className="text-xs text-[var(--muted-foreground)]">Pending Escrow</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">{formatCurrency(3200)}</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-5">
            <p className="text-xs text-[var(--muted-foreground)]">Platform Commission (10%)</p>
            <p className="text-3xl font-bold text-[var(--primary)] mt-1">{formatCurrency(2450)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Payout History</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2026-09-25', amount: 8000, status: 'Completed', bank: 'HDFC Bank ****4921' },
              { date: '2026-09-18', amount: 11000, status: 'Completed', bank: 'HDFC Bank ****4921' },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[var(--secondary)]">
                <div>
                  <p className="font-semibold text-sm">{formatCurrency(p.amount)} Direct Deposit</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{p.date} to {p.bank}</p>
                </div>
                <Badge variant="success">{p.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
