import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const apiKey = process.env.GROQ_API_KEY
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'

    if (!apiKey) {
      // Return a helpful demo response when API key is not configured
      const lastMessage = messages[messages.length - 1]?.content || ''
      const demoResponse = generateDemoResponse(lastMessage)
      
      return NextResponse.json({
        response: demoResponse,
        is_demo: true,
        message: 'AI service is not configured. Using demo responses.'
      })
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: `You are HomeTutor AI Assistant — a helpful, knowledgeable, and friendly AI assistant for the HomeTutor AI platform. You help parents find tutors, plan studies, understand the platform's safety features, and answer education-related questions.

Important rules:
- Be helpful, concise, and friendly
- Never claim an action was completed unless you actually did it
- For tutor recommendations, explain WHY a tutor might be a good fit
- For study advice, be specific and actionable
- Always prioritize student safety
- Use simple language parents can understand
- If asked about something you can't do, suggest what the user CAN do on the platform
- Format responses with markdown when helpful`
          },
          ...messages.slice(-10) // Limit context to last 10 messages
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Groq API error:', error)
      return NextResponse.json(
        { error: 'AI service temporarily unavailable', is_demo: false },
        { status: 502 }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content || 'I apologize, I was unable to generate a response.'

    return NextResponse.json({
      response: aiResponse,
      is_demo: false,
    })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    )
  }
}

function generateDemoResponse(query: string): string {
  const q = query.toLowerCase()
  
  if (q.includes('math') || q.includes('tutor') && q.includes('find')) {
    return `## 🎓 Finding a Math Tutor

I'd recommend looking at these factors when choosing a math tutor:

1. **Teaching Style Match** — Our AI analyzes your child's learning style (visual, auditory, kinesthetic) and matches with tutors who teach that way
2. **Experience Level** — We have tutors from IIT, NIT, and top universities
3. **Budget Fit** — Rates range from ₹400-₹1000/hr
4. **Location** — Find tutors within your preferred distance

👉 **Try our [Find Tutors](/tutors) page** to see AI-matched recommendations!

*Note: This is a demo response. Connect your Groq API key for full AI capabilities.*`
  }
  
  if (q.includes('study plan') || q.includes('study')) {
    return `## 📚 AI Study Plan

I can help create a personalized study plan! Here's what I'd consider:

- **Current Level**: Where your child stands now
- **Target**: Board exams, competitive exams, or general improvement
- **Timeline**: How many weeks until the exam
- **Available Hours**: How much time per week

A typical 4-week plan includes:
- 📅 **Week 1**: Foundation & basics review
- 📅 **Week 2**: Core concepts deep-dive
- 📅 **Week 3**: Practice & problem-solving
- 📅 **Week 4**: Revision & mock tests

👉 **Go to Study Plans** in your dashboard to generate one!

*Demo response — Connect Groq API for personalized plans.*`
  }
  
  if (q.includes('safe') || q.includes('sos')) {
    return `## 🛡️ Safety Features

HomeTutor AI takes safety very seriously:

- ✅ **Tutor Verification** — ID, education, and background checks
- ✅ **SOS Button** — One-tap emergency alert during sessions
- ✅ **Session Tracking** — Real-time location for in-person sessions
- ✅ **Safe Messaging** — Contact info protection
- ✅ **Parent Dashboard** — Full visibility into sessions
- ✅ **Safety Checklist** — Pre-session verification

The **🔴 SOS button** is always visible during active sessions. When pressed:
1. Alert sent to parent immediately
2. Platform safety team notified
3. Emergency contact information provided
4. Session can be terminated

👉 Visit the **[Safety Center](/safety)** for more details.`
  }
  
  if (q.includes('book') || q.includes('session')) {
    return `## 📅 Booking a Session

Here's how to book a tutoring session:

1. **Find a Tutor** — Browse our marketplace or use AI recommendations
2. **View Profile** — Check ratings, reviews, and teaching style
3. **Select Date & Time** — Pick from available slots
4. **Choose Type** — Trial, Single, or Recurring
5. **Payment** — Secure payment via UPI, Card, or Wallet
6. **Confirmation** — Both you and the tutor get notified

**Tips:**
- 💡 Start with a **Trial Session** at reduced rates
- 💡 Use the **AI Match Score** to find compatible tutors
- 💡 Check **Verified badges** for trusted tutors

👉 Head to **[Find Tutors](/tutors)** to get started!`
  }

  return `## 👋 Hello! I'm HomeTutor AI Assistant

I can help you with:

- 🔍 **Finding tutors** — "Find me a Math tutor"
- 📚 **Study plans** — "Create a study plan for Class 10"
- 🛡️ **Safety info** — "How does the SOS system work?"
- 📅 **Booking help** — "How do I book a session?"
- 📊 **Progress tracking** — "How can I track my child's progress?"
- 💡 **Learning tips** — "Study strategies for board exams"

Just ask me anything! I'm here to help. 😊

*Note: This is a demo response. Connect your Groq API key in .env.local for full AI-powered conversations.*`
}
