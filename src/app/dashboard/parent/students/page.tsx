'use client'

import React, { useState } from 'react'
import { Users, Plus, BookOpen, GraduationCap, Award, Trash2, Edit3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { demoStudentProfiles } from '@/lib/demo-data'
import { useAuthStore } from '@/lib/store'

export default function ParentStudentsPage() {
  const { user } = useAuthStore()
  const [students, setStudents] = useState(demoStudentProfiles.filter(s => s.parent_id === user?.id))
  const [showAddModal, setShowAddModal] = useState(false)
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('10')
  const [board, setBoard] = useState('CBSE')
  const [subjectsStr, setSubjectsStr] = useState('Mathematics, Physics, Chemistry')

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const newStudent = {
      id: `student-${Date.now()}`,
      parent_id: user?.id || 'user-parent-1',
      name: name.trim(),
      age: 15,
      grade,
      board,
      school: 'St. Xavier School',
      subjects: subjectsStr.split(',').map(s => s.trim()).filter(Boolean),
      weak_subjects: ['Physics'],
      strong_subjects: ['Mathematics'],
      learning_style: 'visual' as const,
      learning_goals: ['Score >90% in Board exams'],
      created_at: new Date().toISOString(),
    }

    setStudents([newStudent, ...students])
    setName('')
    setShowAddModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Students</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Manage your children&apos;s profiles and learning goals</p>
        </div>
        <Button onClick={() => setShowAddModal(!showAddModal)} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <Plus className="w-4 h-4" /> Add Student Profile
        </Button>
      </div>

      {showAddModal && (
        <Card className="border-[var(--primary)] animate-slide-up">
          <CardHeader><CardTitle className="text-lg">Add New Student</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1 block">Student Name</label>
                  <Input placeholder="e.g. Rahul Sharma" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Grade / Class</label>
                  <select value={grade} onChange={e => setGrade(e.target.value)} className="w-full h-10 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-sm">
                    {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={String(i + 1)}>Class {i + 1}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Board</label>
                  <select value={board} onChange={e => setBoard(e.target.value)} className="w-full h-10 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-sm">
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="IB">IB</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block">Subjects Needed (comma separated)</label>
                <Input value={subjectsStr} onChange={e => setSubjectsStr(e.target.value)} placeholder="Mathematics, Physics" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">Save Student</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Student List */}
      <div className="grid md:grid-cols-2 gap-6">
        {students.map(student => (
          <Card key={student.id} className="premium-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                    {student.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <p className="text-xs text-[var(--muted-foreground)]">Class {student.grade} • {student.board}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="capitalize">{student.learning_style} Learner</Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-semibold text-[var(--muted-foreground)] mb-1">Subjects Enrolled:</p>
                  <div className="flex flex-wrap gap-1">
                    {student.subjects.map(sub => (
                      <Badge key={sub} variant="outline" className="text-xs">{sub}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[var(--muted-foreground)] mb-1">Learning Goals:</p>
                  <ul className="list-disc list-inside text-xs text-[var(--muted-foreground)] space-y-0.5">
                    {(student.learning_goals || []).map((g: string, i: number) => <li key={i}>{g}</li>)}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
