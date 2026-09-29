'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Bot, Send, Sparkles, User, Loader2, RefreshCcw, Trash2, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/store'
import ReactMarkdown from 'react-markdown'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  is_demo?: boolean
}

export default function AIAssistantPage() {
  const { user } = useAuthStore()
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: 'assistant',
    content: `## 👋 Hello${user ? `, ${user.full_name.split(' ')[0]}` : ''}!\n\nI'm the **HomeTutor AI Assistant**. I can help you with:\n\n- 🔍 Finding the right tutor\n- 📚 Creating study plans\n- 🛡️ Safety information\n- 📅 Booking sessions\n- 💡 Learning tips\n\nHow can I help you today?`,
    timestamp: new Date(),
    is_demo: true,
  }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || data.error || 'Sorry, I could not generate a response.',
        timestamp: new Date(),
        is_demo: data.is_demo,
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ I apologize, something went wrong. Please try again.',
        timestamp: new Date(),
        is_demo: true,
      }])
    }

    setIsLoading(false)
    inputRef.current?.focus()
  }

  const quickPrompts = [
    'Find me a Math tutor near me',
    'Create a study plan for Class 10',
    'How does the SOS system work?',
    'How to book a trial session?',
    'Tips for board exam preparation',
    'What qualifications do tutors need?',
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">AI Assistant</h1>
            <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
              Powered by AI
              <Badge variant="warning" className="text-[10px]">DEMO</Badge>
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMessages(prev => [prev[0]])}
        >
          <Trash2 className="w-3 h-3" /> Clear Chat
        </Button>
      </div>

      {/* Chat messages */}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden" style={{ height: 'calc(100vh - 300px)' }}>
        <div className="h-full overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((message, i) => (
            <div key={i} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''} animate-fade-in`}>
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : 'bg-[var(--secondary)]'
              }`}>
                {message.role === 'assistant' ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none text-sm [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mb-2 [&_p]:mb-2 [&_ul]:mb-2 [&_li]:mb-0.5 [&_a]:text-[var(--primary)]">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <p className={`text-[10px] ${message.role === 'user' ? 'text-white/60' : 'text-[var(--muted-foreground)]'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {message.is_demo && message.role === 'assistant' && (
                    <Badge variant="outline" className="text-[8px] py-0">DEMO</Badge>
                  )}
                </div>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-[var(--secondary)] rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick prompts */}
      {messages.length <= 2 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {quickPrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => { setInput(prompt); }}
              className="px-3 py-1.5 rounded-full bg-[var(--secondary)] text-xs font-medium hover:bg-[var(--accent)] transition-colors flex items-center gap-1"
            >
              <Lightbulb className="w-3 h-3 text-amber-500" />
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="mt-3 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me anything about tutoring..."
          className="flex-1 h-12 px-4 rounded-xl border border-[var(--input)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] text-sm"
          disabled={isLoading}
        />
        <Button onClick={sendMessage} disabled={isLoading || !input.trim()} className="h-12 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white" aria-label="Send message">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
