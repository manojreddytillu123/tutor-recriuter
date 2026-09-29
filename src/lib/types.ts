// ==========================================
// HomeTutor AI - Type Definitions
// ==========================================

// === User Roles ===
export type UserRole = 'parent' | 'tutor' | 'admin'

// === User ===
export interface User {
  id: string
  email: string
  phone?: string
  role: UserRole
  full_name: string
  avatar_url?: string
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

// === Parent Profile ===
export interface ParentProfile {
  id: string
  user_id: string
  phone: string
  location_lat?: number
  location_lng?: number
  location_area?: string
  city?: string
  state?: string
  onboarding_complete: boolean
  created_at: string
}

// === Student Profile ===
export interface StudentProfile {
  id: string
  parent_id: string
  name: string
  age: number
  grade: string
  board: string
  school?: string
  subjects: string[]
  weak_subjects: string[]
  strong_subjects: string[]
  target_grades?: Record<string, string>
  learning_style: LearningStyle
  learning_goals: string[]
  current_grades?: Record<string, string>
  upcoming_exams?: string[]
  created_at: string
}

export type LearningStyle = 'visual' | 'auditory' | 'reading_writing' | 'kinesthetic' | 'mixed'

// === Tutor Profile ===
export interface TutorProfile {
  id: string
  user_id: string
  headline?: string
  bio?: string
  education: TutorEducation[]
  qualifications: string[]
  certifications: string[]
  experience_years: number
  subjects: string[]
  grade_levels: string[]
  languages: string[]
  teaching_methodology: string[]
  learning_styles_supported: LearningStyle[]
  hourly_rate: number
  currency: string
  travel_radius_km: number
  online_available: boolean
  inperson_available: boolean
  location_lat?: number
  location_lng?: number
  location_area?: string
  city?: string
  state?: string
  rating: number
  total_reviews: number
  completed_sessions: number
  intro_video_url?: string
  profile_completion: number
  is_verified: boolean
  verification_status: VerificationStatus
  admin_approved: boolean
  created_at: string
  updated_at: string
  // Computed fields
  ai_summary?: string
  match_score?: number
  match_reasons?: string[]
  distance_km?: number
}

export interface TutorEducation {
  degree: string
  institution: string
  year: number
  field: string
}

// === Verification ===
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'suspended'
export type VerificationType = 'email' | 'phone' | 'identity' | 'education' | 'certification' | 'video' | 'admin'

export interface TutorVerification {
  id: string
  tutor_id: string
  type: VerificationType
  status: 'pending' | 'approved' | 'rejected'
  document_url?: string
  verified_at?: string
  verified_by?: string
  notes?: string
  is_demo: boolean
  created_at: string
}

// === Availability ===
export interface AvailabilitySlot {
  id: string
  tutor_id: string
  day_of_week: number // 0=Sunday, 6=Saturday
  start_time: string // HH:mm
  end_time: string // HH:mm
  is_recurring: boolean
  specific_date?: string
  is_blocked: boolean
  created_at: string
}

// === Booking ===
export type BookingType = 'trial' | 'single' | 'recurring'
export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'

export interface Booking {
  id: string
  parent_id: string
  student_id: string
  tutor_id: string
  type: BookingType
  status: BookingStatus
  date: string
  start_time: string
  end_time: string
  duration_minutes: number
  is_online: boolean
  location_lat?: number
  location_lng?: number
  location_address?: string
  goals?: string
  notes?: string
  price: number
  platform_fee: number
  total_amount: number
  payment_status: PaymentStatus
  payment_id?: string
  created_at: string
  updated_at: string
  // Joined
  tutor?: TutorProfile
  student?: StudentProfile
  parent?: ParentProfile
}

// === Session ===
export type SessionStatus = 'not_started' | 'in_progress' | 'completed' | 'cancelled'

export interface Session {
  id: string
  booking_id: string
  tutor_id: string
  student_id: string
  status: SessionStatus
  started_at?: string
  ended_at?: string
  duration_minutes?: number
  tutor_lat?: number
  tutor_lng?: number
  notes?: string
  ai_summary?: string
  topics_covered?: string[]
  student_understanding?: string
  homework?: string
  next_steps?: string
  created_at: string
}

// === Payment ===
export type PaymentStatus = 'pending' | 'processing' | 'successful' | 'failed' | 'refunded'

export interface Payment {
  id: string
  booking_id: string
  parent_id: string
  tutor_id: string
  amount: number
  platform_fee: number
  tutor_amount: number
  currency: string
  status: PaymentStatus
  provider: string
  provider_order_id?: string
  provider_payment_id?: string
  provider_signature?: string
  refund_id?: string
  refund_amount?: number
  is_demo: boolean
  created_at: string
  updated_at: string
}

// === Wallet ===
export interface TutorWallet {
  id: string
  tutor_id: string
  total_earnings: number
  pending_earnings: number
  available_balance: number
  currency: string
  updated_at: string
}

// === Messages ===
export interface Conversation {
  id: string
  participant_1: string
  participant_2: string
  last_message?: string
  last_message_at?: string
  unread_count_1: number
  unread_count_2: number
  is_blocked: boolean
  created_at: string
  // Joined
  other_user?: User
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  type: 'text' | 'image' | 'attachment' | 'system' | 'safety_warning'
  is_read: boolean
  created_at: string
}

// === Reviews ===
export interface Review {
  id: string
  booking_id: string
  reviewer_id: string
  reviewee_id: string
  reviewer_role: UserRole
  rating: number
  categories: Record<string, number>
  comment?: string
  is_visible: boolean
  created_at: string
}

// === Study Plan ===
export interface StudyPlan {
  id: string
  student_id: string
  tutor_id?: string
  subject: string
  current_score?: number
  target_score?: number
  exam_date?: string
  weekly_hours: number
  duration_weeks: number
  status: 'draft' | 'active' | 'completed'
  weeks: StudyPlanWeek[]
  created_at: string
  updated_at: string
}

export interface StudyPlanWeek {
  week_number: number
  goals: string[]
  topics: string[]
  daily_activities: Record<string, string[]>
  practice: string[]
  revision: string[]
  assessment?: string
}

// === Notification ===
export type NotificationType =
  | 'otp' | 'verification' | 'booking_request' | 'booking_accepted'
  | 'booking_rejected' | 'upcoming_session' | 'payment' | 'message'
  | 'study_plan' | 'session_summary' | 'review' | 'sos' | 'safety_alert'
  | 'system'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, unknown>
  is_read: boolean
  created_at: string
}

// === Safety ===
export interface SOSEvent {
  id: string
  session_id?: string
  booking_id?: string
  triggered_by: string
  user_role: UserRole
  location_lat?: number
  location_lng?: number
  status: 'active' | 'responded' | 'resolved' | 'false_alarm'
  notes?: string
  is_demo: boolean
  created_at: string
  resolved_at?: string
}

export interface SafetyReport {
  id: string
  reporter_id: string
  reported_id?: string
  category: 'harassment' | 'fraud' | 'unsafe_behavior' | 'inappropriate_content' | 'payment_problem' | 'other'
  subject_type: 'tutor' | 'parent' | 'message' | 'session' | 'payment' | 'safety'
  description: string
  evidence_urls?: string[]
  status: 'open' | 'investigating' | 'resolved' | 'rejected'
  admin_notes?: string
  created_at: string
  updated_at: string
}

// === AI ===
export interface AIConversation {
  id: string
  user_id: string
  title?: string
  messages: AIMessage[]
  created_at: string
  updated_at: string
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at: string
}

export interface AIMatchResult {
  tutor_id: string
  student_id: string
  overall_score: number
  breakdown: {
    subject_compatibility: number
    learning_style: number
    availability: number
    location: number
    budget: number
    experience: number
    teaching_method: number
  }
  explanation: string
  created_at: string
}

// === Audit Log ===
export interface AuditLog {
  id: string
  user_id?: string
  action: string
  entity_type: string
  entity_id?: string
  details?: Record<string, unknown>
  ip_address?: string
  created_at: string
}

// === Subject ===
export interface Subject {
  id: string
  name: string
  category: string
  icon?: string
  grade_levels: string[]
  is_active: boolean
}

// === Favorites ===
export interface Favorite {
  id: string
  parent_id: string
  tutor_id: string
  created_at: string
  tutor?: TutorProfile
}

// === Dashboard Stats ===
export interface AdminStats {
  total_users: number
  total_parents: number
  total_tutors: number
  verified_tutors: number
  pending_verification: number
  total_bookings: number
  total_revenue: number
  total_sessions: number
  total_reports: number
  sos_incidents: number
}

export interface TutorStats {
  todays_sessions: number
  upcoming_bookings: number
  total_students: number
  monthly_earnings: number
  rating: number
  profile_completion: number
}

export interface ParentStats {
  upcoming_sessions: number
  active_tutors: number
  total_students: number
  total_spent: number
}
