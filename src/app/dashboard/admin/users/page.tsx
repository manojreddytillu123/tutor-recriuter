'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { demoUsers } from '@/lib/demo-data'

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Manage parents, tutors, and admin accounts</p>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--secondary)] border-b border-[var(--border)] text-xs uppercase font-semibold text-[var(--muted-foreground)]">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {demoUsers.map(user => (
                <tr key={user.id} className="hover:bg-[var(--secondary)]/30">
                  <td className="p-4 font-semibold">{user.full_name}</td>
                  <td className="p-4 text-[var(--muted-foreground)]">{user.email}</td>
                  <td className="p-4 capitalize"><Badge variant="outline">{user.role}</Badge></td>
                  <td className="p-4">
                    <Badge variant={user.is_verified ? 'success' : 'warning'}>
                      {user.is_verified ? 'Verified' : 'Pending'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Button size="sm" variant="ghost">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
