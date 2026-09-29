'use client'

import React, { useState } from 'react'
import { MessageSquare, Send, User, CheckCheck, Phone, Video } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { demoTutorProfiles } from '@/lib/demo-data'

export default function MessagesPage() {
  const [selectedTutor, setSelectedTutor] = useState(demoTutorProfiles[0])
  const [messages, setMessages] = useState([
    { id: 1, sender: 'tutor', text: 'Hello! Looking forward to our session tomorrow at 5 PM.', time: '10:30 AM' },
    { id: 2, sender: 'user', text: 'Hi! Yes, Rahul is ready with his Mathematics doubts.', time: '10:32 AM' },
    { id: 3, sender: 'tutor', text: 'Great! We will cover Quadratic Equations and solve previous board questions.', time: '10:35 AM' },
  ])
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages([...messages, {
      id: Date.now(),
      sender: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setInput('')
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-4">
      {/* Tutor Conversations List */}
      <Card className="w-full md:w-80 flex-shrink-0">
        <CardContent className="p-3 space-y-2">
          <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase px-2 py-1">Conversations</p>
          {demoTutorProfiles.slice(0, 4).map(tutor => (
            <div
              key={tutor.id}
              onClick={() => setSelectedTutor(tutor)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                selectedTutor.id === tutor.id ? 'bg-[var(--accent)]' : 'hover:bg-[var(--secondary)]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {tutor.id.split('-')[1]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{`Tutor #${tutor.id.split('-')[1]}`}</p>
                <p className="text-xs text-[var(--muted-foreground)] truncate">{tutor.subjects[0]}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Chat Window */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              {selectedTutor.id.split('-')[1]}
            </div>
            <div>
              <p className="font-semibold text-sm">{`Tutor #${selectedTutor.id.split('-')[1]}`}</p>
              <p className="text-xs text-emerald-600">● Online</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost"><Phone className="w-4 h-4" /></Button>
            <Button size="icon" variant="ghost"><Video className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-3.5 rounded-2xl text-sm ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none'
                  : 'bg-[var(--secondary)] rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-white/70' : 'text-[var(--muted-foreground)]'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="p-3 border-t border-[var(--border)] flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </Card>
    </div>
  )
}
