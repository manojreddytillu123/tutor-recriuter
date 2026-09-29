// ==========================================
// HomeTutor AI - LocalStorage Backend Engine
// ==========================================

import {
  User, ParentProfile, StudentProfile, TutorProfile, Booking,
  Review, Notification, Message, StudyPlan
} from './types'
import {
  demoUsers, demoStudentProfiles,
  demoTutorProfiles, demoBookings, demoReviews, demoNotifications
} from './demo-data'

const KEYS = {
  USERS: 'hometutor_users',
  PARENTS: 'hometutor_parents',
  STUDENTS: 'hometutor_students',
  TUTORS: 'hometutor_tutors',
  BOOKINGS: 'hometutor_bookings',
  REVIEWS: 'hometutor_reviews',
  NOTIFICATIONS: 'hometutor_notifications',
  STUDY_PLANS: 'hometutor_study_plans',
  MESSAGES: 'hometutor_messages',
}

// Helper to check if browser environment
const isBrowser = typeof window !== 'undefined'

// Initialize LocalStorage with seed demo data if empty
export function initStorage() {
  if (!isBrowser) return

  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(demoUsers))
  }
  if (!localStorage.getItem(KEYS.PARENTS)) {
    localStorage.setItem(KEYS.PARENTS, JSON.stringify([]))
  }
  if (!localStorage.getItem(KEYS.STUDENTS)) {
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(demoStudentProfiles))
  }
  if (!localStorage.getItem(KEYS.TUTORS)) {
    localStorage.setItem(KEYS.TUTORS, JSON.stringify(demoTutorProfiles))
  }
  if (!localStorage.getItem(KEYS.BOOKINGS)) {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(demoBookings))
  }
  if (!localStorage.getItem(KEYS.REVIEWS)) {
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(demoReviews))
  }
  if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(demoNotifications))
  }
}

// Reset storage back to clean demo dataset
export function resetStorage() {
  if (!isBrowser) return
  localStorage.setItem(KEYS.USERS, JSON.stringify(demoUsers))
  localStorage.setItem(KEYS.PARENTS, JSON.stringify([]))
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(demoStudentProfiles))
  localStorage.setItem(KEYS.TUTORS, JSON.stringify(demoTutorProfiles))
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(demoBookings))
  localStorage.setItem(KEYS.REVIEWS, JSON.stringify(demoReviews))
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(demoNotifications))
  localStorage.removeItem(KEYS.STUDY_PLANS)
  localStorage.removeItem(KEYS.MESSAGES)
}

// === Generic Item Getter / Setter ===
function getItem<T>(key: string, defaultData: T[]): T[] {
  if (!isBrowser) return defaultData
  initStorage()
  const data = localStorage.getItem(key)
  if (!data) return defaultData
  try {
    return JSON.parse(data) as T[]
  } catch {
    return defaultData
  }
}

function setItem<T>(key: string, data: T[]) {
  if (!isBrowser) return
  localStorage.setItem(key, JSON.stringify(data))
}

// === USERS ===
export function getUsers(): User[] {
  return getItem<User>(KEYS.USERS, demoUsers)
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase())
}

export function saveUser(user: User): User {
  const users = getUsers()
  const index = users.findIndex(u => u.id === user.id)
  if (index >= 0) {
    users[index] = user
  } else {
    users.push(user)
  }
  setItem(KEYS.USERS, users)
  return user
}

// === TUTORS ===
export function getTutors(): TutorProfile[] {
  return getItem<TutorProfile>(KEYS.TUTORS, demoTutorProfiles)
}

export function getTutorById(id: string): TutorProfile | undefined {
  return getTutors().find(t => t.id === id || t.user_id === id)
}

export function saveTutor(tutor: TutorProfile): TutorProfile {
  const tutors = getTutors()
  const index = tutors.findIndex(t => t.id === tutor.id)
  if (index >= 0) {
    tutors[index] = tutor
  } else {
    tutors.push(tutor)
  }
  setItem(KEYS.TUTORS, tutors)
  return tutor
}

// === STUDENTS ===
export function getStudents(parentId?: string): StudentProfile[] {
  const students = getItem<StudentProfile>(KEYS.STUDENTS, demoStudentProfiles)
  if (parentId) {
    return students.filter(s => s.parent_id === parentId)
  }
  return students
}

export function saveStudent(student: StudentProfile): StudentProfile {
  const students = getStudents()
  const index = students.findIndex(s => s.id === student.id)
  if (index >= 0) {
    students[index] = student
  } else {
    students.push(student)
  }
  setItem(KEYS.STUDENTS, students)
  return student
}

export function deleteStudent(id: string) {
  const students = getStudents().filter(s => s.id !== id)
  setItem(KEYS.STUDENTS, students)
}

// === BOOKINGS ===
export function getBookings(userId?: string, role?: string): Booking[] {
  const bookings = getItem<Booking>(KEYS.BOOKINGS, demoBookings)
  if (!userId) return bookings
  if (role === 'tutor') {
    return bookings.filter(b => b.tutor_id === userId)
  }
  return bookings.filter(b => b.parent_id === userId)
}

export function saveBooking(booking: Booking): Booking {
  const bookings = getBookings()
  const index = bookings.findIndex(b => b.id === booking.id)
  if (index >= 0) {
    bookings[index] = booking
  } else {
    bookings.push(booking)
  }
  setItem(KEYS.BOOKINGS, bookings)
  return booking
}

export function updateBookingStatus(id: string, status: Booking['status']): Booking | undefined {
  const bookings = getBookings()
  const booking = bookings.find(b => b.id === id)
  if (booking) {
    booking.status = status
    booking.updated_at = new Date().toISOString()
    setItem(KEYS.BOOKINGS, bookings)
  }
  return booking
}

// === NOTIFICATIONS ===
export function getNotifications(userId: string): Notification[] {
  const notifs = getItem<Notification>(KEYS.NOTIFICATIONS, demoNotifications)
  return notifs.filter(n => n.user_id === userId)
}

// === REVIEWS ===
export function getReviews(tutorId?: string): Review[] {
  const reviews = getItem<Review>(KEYS.REVIEWS, demoReviews)
  if (tutorId) {
    return reviews.filter(r => r.reviewee_id === tutorId)
  }
  return reviews
}
