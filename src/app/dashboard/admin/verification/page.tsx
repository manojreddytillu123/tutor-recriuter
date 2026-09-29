'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function GenericAdminPage({ title = 'Admin Management' }: { title?: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-[var(--muted-foreground)]">System administration and control panel</p>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">System logs and settings active.</p>
          <Badge variant="warning" className="mt-2">DEMO ADMIN MODE</Badge>
        </CardContent>
      </Card>
    </div>
  )
}
