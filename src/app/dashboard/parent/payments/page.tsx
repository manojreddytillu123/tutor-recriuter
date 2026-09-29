'use client'

import React from 'react'
import { CreditCard, Download, ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function PaymentsPage() {
  const transactions = [
    { id: 'tx-1', tutor: 'Dr. Ananya Sharma', subject: 'Mathematics', amount: 1600, date: '2026-09-24', status: 'paid', method: 'UPI' },
    { id: 'tx-2', tutor: 'Prof. Rajesh Kumar', subject: 'Physics', amount: 1200, date: '2026-09-20', status: 'paid', method: 'Razorpay Card' },
    { id: 'tx-3', tutor: 'Sneha Patel', subject: 'English', amount: 800, date: '2026-09-15', status: 'paid', method: 'UPI' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payments & Transactions</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Manage payment methods, view invoices, and track session billing</p>
        </div>
        <Badge variant="warning" className="text-xs">Razorpay Demo Mode Enabled</Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="premium-card">
          <CardContent className="p-5">
            <p className="text-xs text-[var(--muted-foreground)]">Total Spent</p>
            <p className="text-3xl font-bold text-[var(--primary)] mt-1">{formatCurrency(3600)}</p>
            <p className="text-xs text-emerald-600 mt-2">✓ 100% Escrow Protection Active</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-5">
            <p className="text-xs text-[var(--muted-foreground)]">Saved Payment Methods</p>
            <p className="text-lg font-bold mt-1">UPI (Google Pay / PhonePe)</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-2">Razorpay Secured</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-5">
            <p className="text-xs text-[var(--muted-foreground)]">Escrow Balance</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">{formatCurrency(800)}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-2">Released upon session completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader><CardTitle className="text-base">Transaction History</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-[var(--secondary)]/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{tx.tutor}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{tx.subject} • {formatDate(tx.date)} via {tx.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{formatCurrency(tx.amount)}</p>
                  <Badge variant="success" className="text-[10px]">Paid</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
