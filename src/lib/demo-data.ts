// ==========================================
// HomeTutor AI - Demo Data Store
// In-memory database for hackathon demo mode
// ==========================================

import {
  User, TutorProfile, ParentProfile, StudentProfile, Booking,
  Session, Payment, Message, Conversation, Review, Notification,
  AvailabilitySlot, StudyPlan, SOSEvent, SafetyReport, AuditLog,
  Subject, Favorite, TutorVerification, TutorWallet, AIConversation,
  UserRole
} from './types'

// === Demo Users ===
export const demoUsers: User[] = [
  { id: 'parent-1', email: 'parent.demo@example.com', phone: '+919876543210', role: 'parent', full_name: 'Priya Sharma', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-01-15T10:00:00Z', updated_at: '2025-01-15T10:00:00Z' },
  { id: 'parent-2', email: 'rajesh.kumar@example.com', phone: '+919876543211', role: 'parent', full_name: 'Rajesh Kumar', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-02-20T10:00:00Z', updated_at: '2025-02-20T10:00:00Z' },
  { id: 'parent-3', email: 'anita.gupta@example.com', phone: '+919876543212', role: 'parent', full_name: 'Anita Gupta', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-03-10T10:00:00Z', updated_at: '2025-03-10T10:00:00Z' },
  { id: 'parent-4', email: 'vikram.patel@example.com', phone: '+919876543213', role: 'parent', full_name: 'Vikram Patel', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-03-15T10:00:00Z', updated_at: '2025-03-15T10:00:00Z' },
  { id: 'parent-5', email: 'meera.reddy@example.com', phone: '+919876543214', role: 'parent', full_name: 'Meera Reddy', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-04-01T10:00:00Z', updated_at: '2025-04-01T10:00:00Z' },
  { id: 'parent-6', email: 'sunil.verma@example.com', phone: '+919876543215', role: 'parent', full_name: 'Sunil Verma', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-04-10T10:00:00Z', updated_at: '2025-04-10T10:00:00Z' },
  { id: 'parent-7', email: 'kavita.joshi@example.com', phone: '+919876543216', role: 'parent', full_name: 'Kavita Joshi', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-04-15T10:00:00Z', updated_at: '2025-04-15T10:00:00Z' },
  { id: 'parent-8', email: 'deepak.singh@example.com', phone: '+919876543217', role: 'parent', full_name: 'Deepak Singh', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-05-01T10:00:00Z', updated_at: '2025-05-01T10:00:00Z' },
  { id: 'parent-9', email: 'neha.agarwal@example.com', phone: '+919876543218', role: 'parent', full_name: 'Neha Agarwal', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-05-10T10:00:00Z', updated_at: '2025-05-10T10:00:00Z' },
  { id: 'parent-10', email: 'arun.menon@example.com', phone: '+919876543219', role: 'parent', full_name: 'Arun Menon', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-05-15T10:00:00Z', updated_at: '2025-05-15T10:00:00Z' },
  { id: 'tutor-1', email: 'tutor.demo@example.com', phone: '+919876543220', role: 'tutor', full_name: 'Dr. Arjun Mehta', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 'tutor-2', email: 'sneha.rao@example.com', phone: '+919876543221', role: 'tutor', full_name: 'Sneha Rao', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-01-05T10:00:00Z', updated_at: '2025-01-05T10:00:00Z' },
  { id: 'tutor-3', email: 'amit.chatterjee@example.com', phone: '+919876543222', role: 'tutor', full_name: 'Amit Chatterjee', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-01-10T10:00:00Z', updated_at: '2025-01-10T10:00:00Z' },
  { id: 'tutor-4', email: 'lakshmi.nair@example.com', phone: '+919876543223', role: 'tutor', full_name: 'Lakshmi Nair', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-01-15T10:00:00Z', updated_at: '2025-01-15T10:00:00Z' },
  { id: 'tutor-5', email: 'ravi.iyer@example.com', phone: '+919876543224', role: 'tutor', full_name: 'Ravi Iyer', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-02-01T10:00:00Z', updated_at: '2025-02-01T10:00:00Z' },
  { id: 'tutor-6', email: 'pooja.desai@example.com', phone: '+919876543225', role: 'tutor', full_name: 'Pooja Desai', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-02-05T10:00:00Z', updated_at: '2025-02-05T10:00:00Z' },
  { id: 'tutor-7', email: 'manoj.pillai@example.com', phone: '+919876543226', role: 'tutor', full_name: 'Manoj Pillai', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-02-10T10:00:00Z', updated_at: '2025-02-10T10:00:00Z' },
  { id: 'tutor-8', email: 'divya.sundaram@example.com', phone: '+919876543227', role: 'tutor', full_name: 'Divya Sundaram', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-02-15T10:00:00Z', updated_at: '2025-02-15T10:00:00Z' },
  { id: 'tutor-9', email: 'karthik.subramanian@example.com', phone: '+919876543228', role: 'tutor', full_name: 'Karthik Subramanian', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-03-01T10:00:00Z', updated_at: '2025-03-01T10:00:00Z' },
  { id: 'tutor-10', email: 'nandini.krishnan@example.com', phone: '+919876543229', role: 'tutor', full_name: 'Nandini Krishnan', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-03-05T10:00:00Z', updated_at: '2025-03-05T10:00:00Z' },
  { id: 'tutor-11', email: 'sanjay.mishra@example.com', phone: '+919876543230', role: 'tutor', full_name: 'Sanjay Mishra', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-03-10T10:00:00Z', updated_at: '2025-03-10T10:00:00Z' },
  { id: 'tutor-12', email: 'prachi.jain@example.com', phone: '+919876543231', role: 'tutor', full_name: 'Prachi Jain', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-03-15T10:00:00Z', updated_at: '2025-03-15T10:00:00Z' },
  { id: 'tutor-13', email: 'venkat.reddy@example.com', phone: '+919876543232', role: 'tutor', full_name: 'Venkat Reddy', avatar_url: '', is_verified: false, is_active: true, created_at: '2025-04-01T10:00:00Z', updated_at: '2025-04-01T10:00:00Z' },
  { id: 'tutor-14', email: 'swati.banerjee@example.com', phone: '+919876543233', role: 'tutor', full_name: 'Swati Banerjee', avatar_url: '', is_verified: false, is_active: true, created_at: '2025-04-05T10:00:00Z', updated_at: '2025-04-05T10:00:00Z' },
  { id: 'tutor-15', email: 'rohan.kapoor@example.com', phone: '+919876543234', role: 'tutor', full_name: 'Rohan Kapoor', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-04-10T10:00:00Z', updated_at: '2025-04-10T10:00:00Z' },
  { id: 'tutor-16', email: 'anjali.bhatt@example.com', phone: '+919876543235', role: 'tutor', full_name: 'Anjali Bhatt', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-04-15T10:00:00Z', updated_at: '2025-04-15T10:00:00Z' },
  { id: 'tutor-17', email: 'pranav.gopal@example.com', phone: '+919876543236', role: 'tutor', full_name: 'Pranav Gopal', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-05-01T10:00:00Z', updated_at: '2025-05-01T10:00:00Z' },
  { id: 'tutor-18', email: 'rashmi.hegde@example.com', phone: '+919876543237', role: 'tutor', full_name: 'Rashmi Hegde', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-05-05T10:00:00Z', updated_at: '2025-05-05T10:00:00Z' },
  { id: 'tutor-19', email: 'gaurav.saxena@example.com', phone: '+919876543238', role: 'tutor', full_name: 'Gaurav Saxena', avatar_url: '', is_verified: false, is_active: true, created_at: '2025-05-10T10:00:00Z', updated_at: '2025-05-10T10:00:00Z' },
  { id: 'tutor-20', email: 'simran.malhotra@example.com', phone: '+919876543239', role: 'tutor', full_name: 'Simran Malhotra', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-05-15T10:00:00Z', updated_at: '2025-05-15T10:00:00Z' },
  { id: 'admin-1', email: 'admin.demo@example.com', phone: '+919876543240', role: 'admin', full_name: 'Platform Admin', avatar_url: '', is_verified: true, is_active: true, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
]

// === Subjects ===
export const demoSubjects: Subject[] = [
  { id: 's-1', name: 'Mathematics', category: 'Core', icon: '📐', grade_levels: ['6','7','8','9','10','11','12'], is_active: true },
  { id: 's-2', name: 'Physics', category: 'Science', icon: '⚛️', grade_levels: ['9','10','11','12'], is_active: true },
  { id: 's-3', name: 'Chemistry', category: 'Science', icon: '🧪', grade_levels: ['9','10','11','12'], is_active: true },
  { id: 's-4', name: 'Biology', category: 'Science', icon: '🧬', grade_levels: ['9','10','11','12'], is_active: true },
  { id: 's-5', name: 'English', category: 'Language', icon: '📖', grade_levels: ['1','2','3','4','5','6','7','8','9','10','11','12'], is_active: true },
  { id: 's-6', name: 'Hindi', category: 'Language', icon: '📝', grade_levels: ['1','2','3','4','5','6','7','8','9','10','11','12'], is_active: true },
  { id: 's-7', name: 'Science', category: 'Science', icon: '🔬', grade_levels: ['6','7','8'], is_active: true },
  { id: 's-8', name: 'Social Studies', category: 'Humanities', icon: '🌍', grade_levels: ['6','7','8','9','10'], is_active: true },
  { id: 's-9', name: 'Computer Science', category: 'Technology', icon: '💻', grade_levels: ['9','10','11','12'], is_active: true },
  { id: 's-10', name: 'Economics', category: 'Commerce', icon: '📊', grade_levels: ['11','12'], is_active: true },
  { id: 's-11', name: 'Accountancy', category: 'Commerce', icon: '📒', grade_levels: ['11','12'], is_active: true },
  { id: 's-12', name: 'Business Studies', category: 'Commerce', icon: '💼', grade_levels: ['11','12'], is_active: true },
  { id: 's-13', name: 'Political Science', category: 'Humanities', icon: '🏛️', grade_levels: ['11','12'], is_active: true },
  { id: 's-14', name: 'History', category: 'Humanities', icon: '📜', grade_levels: ['6','7','8','9','10','11','12'], is_active: true },
  { id: 's-15', name: 'Geography', category: 'Humanities', icon: '🗺️', grade_levels: ['6','7','8','9','10','11','12'], is_active: true },
  { id: 's-16', name: 'Sanskrit', category: 'Language', icon: '🕉️', grade_levels: ['6','7','8','9','10'], is_active: true },
  { id: 's-17', name: 'French', category: 'Language', icon: '🇫🇷', grade_levels: ['6','7','8','9','10','11','12'], is_active: true },
  { id: 's-18', name: 'Art & Drawing', category: 'Creative', icon: '🎨', grade_levels: ['1','2','3','4','5','6','7','8'], is_active: true },
  { id: 's-19', name: 'Music', category: 'Creative', icon: '🎵', grade_levels: ['1','2','3','4','5','6','7','8','9','10'], is_active: true },
  { id: 's-20', name: 'Physical Education', category: 'Sports', icon: '🏃', grade_levels: ['6','7','8','9','10','11','12'], is_active: true },
]

// === Tutor Profiles ===
const bangaloreBase = { lat: 12.9716, lng: 77.5946 }

export const demoTutorProfiles: TutorProfile[] = [
  {
    id: 'tutor-1', user_id: 'tutor-1', headline: 'IIT-Bombay Graduate | 8+ Years Teaching Mathematics & Physics',
    bio: 'Passionate about making complex mathematical concepts simple and intuitive. I use visual aids, real-world examples, and interactive problem-solving to help students excel.',
    education: [{ degree: 'B.Tech', institution: 'IIT Bombay', year: 2016, field: 'Mechanical Engineering' }, { degree: 'M.Sc', institution: 'IISc Bangalore', year: 2018, field: 'Applied Mathematics' }],
    qualifications: ['B.Tech IIT Bombay', 'M.Sc IISc'], certifications: ['CTET Certified', 'NTA NET Mathematics'],
    experience_years: 8, subjects: ['Mathematics', 'Physics'], grade_levels: ['9', '10', '11', '12'],
    languages: ['English', 'Hindi', 'Marathi'], teaching_methodology: ['Visual Learning', 'Problem-Based Learning', 'Interactive Discussion'],
    learning_styles_supported: ['visual', 'kinesthetic'], hourly_rate: 800, currency: 'INR', travel_radius_km: 10,
    online_available: true, inperson_available: true,
    location_lat: bangaloreBase.lat + 0.01, location_lng: bangaloreBase.lng + 0.02, location_area: 'Koramangala', city: 'Bangalore', state: 'Karnataka',
    rating: 4.9, total_reviews: 127, completed_sessions: 856, profile_completion: 100,
    is_verified: true, verification_status: 'approved', admin_approved: true,
    ai_summary: 'Dr. Arjun Mehta is a highly qualified IIT-Bombay graduate with 8+ years of teaching experience. Specializes in Mathematics and Physics for senior grades. Known for visual and problem-based teaching methods.',
    created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z',
  },
  {
    id: 'tutor-2', user_id: 'tutor-2', headline: 'Cambridge Certified English Teacher | IELTS & Creative Writing Expert',
    bio: 'English language specialist with a focus on communication skills, creative writing, and exam preparation. I help students find their voice and express themselves confidently.',
    education: [{ degree: 'M.A.', institution: 'Delhi University', year: 2017, field: 'English Literature' }],
    qualifications: ['M.A. English Literature'], certifications: ['Cambridge CELTA', 'IELTS Trainer Certified'],
    experience_years: 6, subjects: ['English'], grade_levels: ['6', '7', '8', '9', '10', '11', '12'],
    languages: ['English', 'Hindi', 'Kannada'], teaching_methodology: ['Communicative Approach', 'Activity-Based', 'Storytelling'],
    learning_styles_supported: ['auditory', 'reading_writing'], hourly_rate: 600, currency: 'INR', travel_radius_km: 8,
    online_available: true, inperson_available: true,
    location_lat: bangaloreBase.lat - 0.015, location_lng: bangaloreBase.lng + 0.01, location_area: 'Indiranagar', city: 'Bangalore', state: 'Karnataka',
    rating: 4.8, total_reviews: 94, completed_sessions: 612, profile_completion: 95,
    is_verified: true, verification_status: 'approved', admin_approved: true,
    created_at: '2025-01-05T10:00:00Z', updated_at: '2025-01-05T10:00:00Z',
  },
  {
    id: 'tutor-3', user_id: 'tutor-3', headline: 'Chemistry Expert | JEE/NEET Specialist | 10+ Years Experience',
    bio: 'Chemistry teacher specializing in competitive exam preparation. My students have consistently achieved top ranks in JEE and NEET examinations.',
    education: [{ degree: 'M.Sc', institution: 'Jadavpur University', year: 2014, field: 'Chemistry' }, { degree: 'B.Ed', institution: 'University of Calcutta', year: 2015, field: 'Science Education' }],
    qualifications: ['M.Sc Chemistry', 'B.Ed'], certifications: ['NEET Subject Expert'],
    experience_years: 10, subjects: ['Chemistry', 'Science'], grade_levels: ['8', '9', '10', '11', '12'],
    languages: ['English', 'Hindi', 'Bengali'], teaching_methodology: ['Concept Mapping', 'Flipped Classroom', 'Lab-Based Learning'],
    learning_styles_supported: ['visual', 'kinesthetic', 'reading_writing'], hourly_rate: 900, currency: 'INR', travel_radius_km: 12,
    online_available: true, inperson_available: true,
    location_lat: bangaloreBase.lat + 0.025, location_lng: bangaloreBase.lng - 0.01, location_area: 'Rajajinagar', city: 'Bangalore', state: 'Karnataka',
    rating: 4.7, total_reviews: 156, completed_sessions: 1024, profile_completion: 100,
    is_verified: true, verification_status: 'approved', admin_approved: true,
    created_at: '2025-01-10T10:00:00Z', updated_at: '2025-01-10T10:00:00Z',
  },
  {
    id: 'tutor-4', user_id: 'tutor-4', headline: 'Biology & NEET Coach | PhD in Molecular Biology',
    bio: 'Making biology fascinating through visual models and real-world connections. PhD researcher turned educator with a passion for helping students understand life sciences.',
    education: [{ degree: 'PhD', institution: 'IISc Bangalore', year: 2019, field: 'Molecular Biology' }],
    qualifications: ['PhD Molecular Biology'], certifications: ['CSIR NET Life Sciences'],
    experience_years: 5, subjects: ['Biology', 'Science'], grade_levels: ['9', '10', '11', '12'],
    languages: ['English', 'Hindi', 'Malayalam'], teaching_methodology: ['Visual Models', 'Research-Based Teaching', 'Case Studies'],
    learning_styles_supported: ['visual', 'reading_writing'], hourly_rate: 700, currency: 'INR', travel_radius_km: 6,
    online_available: true, inperson_available: false,
    location_lat: bangaloreBase.lat - 0.02, location_lng: bangaloreBase.lng - 0.015, location_area: 'Jayanagar', city: 'Bangalore', state: 'Karnataka',
    rating: 4.8, total_reviews: 78, completed_sessions: 445, profile_completion: 92,
    is_verified: true, verification_status: 'approved', admin_approved: true,
    created_at: '2025-01-15T10:00:00Z', updated_at: '2025-01-15T10:00:00Z',
  },
  {
    id: 'tutor-5', user_id: 'tutor-5', headline: 'Computer Science & Programming | Ex-Google Engineer',
    bio: 'Former Google engineer passionate about teaching programming and computer science. I focus on building problem-solving skills and logical thinking.',
    education: [{ degree: 'B.Tech', institution: 'NIT Trichy', year: 2015, field: 'Computer Science' }],
    qualifications: ['B.Tech CSE NIT Trichy'], certifications: ['Google Certified Professional'],
    experience_years: 7, subjects: ['Computer Science', 'Mathematics'], grade_levels: ['9', '10', '11', '12'],
    languages: ['English', 'Tamil', 'Hindi'], teaching_methodology: ['Project-Based Learning', 'Coding Challenges', 'Pair Programming'],
    learning_styles_supported: ['kinesthetic', 'visual'], hourly_rate: 1000, currency: 'INR', travel_radius_km: 5,
    online_available: true, inperson_available: true,
    location_lat: bangaloreBase.lat + 0.005, location_lng: bangaloreBase.lng + 0.03, location_area: 'Whitefield', city: 'Bangalore', state: 'Karnataka',
    rating: 4.9, total_reviews: 112, completed_sessions: 678, profile_completion: 98,
    is_verified: true, verification_status: 'approved', admin_approved: true,
    created_at: '2025-02-01T10:00:00Z', updated_at: '2025-02-01T10:00:00Z',
  },
  {
    id: 'tutor-6', user_id: 'tutor-6', headline: 'Hindi & Sanskrit Teacher | Sahitya Academy Award Winner',
    bio: 'Award-winning author and language educator. I bring literature alive through storytelling and cultural immersion.',
    education: [{ degree: 'M.A.', institution: 'BHU', year: 2016, field: 'Hindi Literature' }],
    qualifications: ['M.A. Hindi Literature'], certifications: ['UGC NET Hindi'],
    experience_years: 7, subjects: ['Hindi', 'Sanskrit'], grade_levels: ['6', '7', '8', '9', '10'],
    languages: ['Hindi', 'Sanskrit', 'English'], teaching_methodology: ['Storytelling', 'Cultural Immersion', 'Grammar Games'],
    learning_styles_supported: ['auditory', 'reading_writing', 'visual'], hourly_rate: 500, currency: 'INR', travel_radius_km: 15,
    online_available: true, inperson_available: true,
    location_lat: bangaloreBase.lat - 0.01, location_lng: bangaloreBase.lng + 0.025, location_area: 'HSR Layout', city: 'Bangalore', state: 'Karnataka',
    rating: 4.6, total_reviews: 65, completed_sessions: 398, profile_completion: 88,
    is_verified: true, verification_status: 'approved', admin_approved: true,
    created_at: '2025-02-05T10:00:00Z', updated_at: '2025-02-05T10:00:00Z',
  },
  {
    id: 'tutor-7', user_id: 'tutor-7', headline: 'Economics & Commerce Expert | CA + MBA',
    bio: 'Chartered Accountant with an MBA, making economics and commerce subjects practical and interesting through real-world business case studies.',
    education: [{ degree: 'MBA', institution: 'IIM Ahmedabad', year: 2018, field: 'Finance' }],
    qualifications: ['CA', 'MBA IIM-A'], certifications: ['Chartered Accountant'],
    experience_years: 6, subjects: ['Economics', 'Accountancy', 'Business Studies'], grade_levels: ['11', '12'],
    languages: ['English', 'Hindi', 'Malayalam'], teaching_methodology: ['Case Study Method', 'Real-World Application', 'Financial Modeling'],
    learning_styles_supported: ['visual', 'reading_writing', 'kinesthetic'], hourly_rate: 850, currency: 'INR', travel_radius_km: 10,
    online_available: true, inperson_available: true,
    location_lat: bangaloreBase.lat + 0.018, location_lng: bangaloreBase.lng + 0.008, location_area: 'MG Road', city: 'Bangalore', state: 'Karnataka',
    rating: 4.7, total_reviews: 88, completed_sessions: 512, profile_completion: 95,
    is_verified: true, verification_status: 'approved', admin_approved: true,
    created_at: '2025-02-10T10:00:00Z', updated_at: '2025-02-10T10:00:00Z',
  },
  {
    id: 'tutor-8', user_id: 'tutor-8', headline: 'Primary & Middle School Specialist | Montessori Trained',
    bio: 'Montessori-trained educator specializing in foundational learning for primary and middle school students. Focus on building strong basics.',
    education: [{ degree: 'B.Ed', institution: 'Christ University', year: 2017, field: 'Elementary Education' }],
    qualifications: ['B.Ed Elementary Education'], certifications: ['Montessori AMI Certified'],
    experience_years: 7, subjects: ['Mathematics', 'Science', 'English'], grade_levels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    languages: ['English', 'Kannada', 'Tamil'], teaching_methodology: ['Montessori Method', 'Hands-On Learning', 'Play-Based Learning'],
    learning_styles_supported: ['kinesthetic', 'visual', 'auditory'], hourly_rate: 450, currency: 'INR', travel_radius_km: 8,
    online_available: false, inperson_available: true,
    location_lat: bangaloreBase.lat - 0.005, location_lng: bangaloreBase.lng - 0.02, location_area: 'Basavanagudi', city: 'Bangalore', state: 'Karnataka',
    rating: 4.9, total_reviews: 103, completed_sessions: 892, profile_completion: 90,
    is_verified: true, verification_status: 'approved', admin_approved: true,
    created_at: '2025-02-15T10:00:00Z', updated_at: '2025-02-15T10:00:00Z',
  },
  {
    id: 'tutor-9', user_id: 'tutor-9', headline: 'Physics & Advanced Maths | IIT JEE Top 100 Ranker',
    bio: 'JEE Top 100 ranker and passionate physics teacher. I break down complex problems into simple, intuitive steps.',
    education: [{ degree: 'B.Tech', institution: 'IIT Madras', year: 2017, field: 'Engineering Physics' }],
    qualifications: ['B.Tech IIT Madras'], certifications: ['JEE Advanced Top 100'],
    experience_years: 7, subjects: ['Physics', 'Mathematics'], grade_levels: ['10', '11', '12'],
    languages: ['English', 'Tamil', 'Telugu'], teaching_methodology: ['Problem-Based Learning', 'Socratic Method', 'Conceptual Understanding'],
    learning_styles_supported: ['visual', 'kinesthetic'], hourly_rate: 950, currency: 'INR', travel_radius_km: 7,
    online_available: true, inperson_available: true,
    location_lat: bangaloreBase.lat + 0.03, location_lng: bangaloreBase.lng + 0.015, location_area: 'Marathahalli', city: 'Bangalore', state: 'Karnataka',
    rating: 4.8, total_reviews: 145, completed_sessions: 923, profile_completion: 100,
    is_verified: true, verification_status: 'approved', admin_approved: true,
    created_at: '2025-03-01T10:00:00Z', updated_at: '2025-03-01T10:00:00Z',
  },
  {
    id: 'tutor-10', user_id: 'tutor-10', headline: 'Social Studies & History | National Award Winning Teacher',
    bio: 'Making history and social studies engaging through narratives, debates, and multimedia presentations.',
    education: [{ degree: 'M.A.', institution: 'JNU', year: 2015, field: 'History' }],
    qualifications: ['M.A. History JNU'], certifications: ['National Teacher Award 2022'],
    experience_years: 9, subjects: ['Social Studies', 'History', 'Political Science', 'Geography'], grade_levels: ['6', '7', '8', '9', '10', '11', '12'],
    languages: ['English', 'Hindi', 'Kannada'], teaching_methodology: ['Narrative Teaching', 'Debate-Based', 'Multimedia Presentations'],
    learning_styles_supported: ['auditory', 'visual', 'reading_writing'], hourly_rate: 550, currency: 'INR', travel_radius_km: 12,
    online_available: true, inperson_available: true,
    location_lat: bangaloreBase.lat - 0.025, location_lng: bangaloreBase.lng + 0.005, location_area: 'BTM Layout', city: 'Bangalore', state: 'Karnataka',
    rating: 4.6, total_reviews: 72, completed_sessions: 567, profile_completion: 85,
    is_verified: true, verification_status: 'approved', admin_approved: true,
    created_at: '2025-03-05T10:00:00Z', updated_at: '2025-03-05T10:00:00Z',
  },
  // tutors 11-20 with more variety
  ...Array.from({ length: 10 }, (_, i) => {
    const idx = i + 11
    const names = ['Sanjay Mishra', 'Prachi Jain', 'Venkat Reddy', 'Swati Banerjee', 'Rohan Kapoor', 'Anjali Bhatt', 'Pranav Gopal', 'Rashmi Hegde', 'Gaurav Saxena', 'Simran Malhotra']
    const subjectSets = [['Mathematics'], ['Physics', 'Chemistry'], ['Biology'], ['English', 'French'], ['Computer Science'], ['Mathematics', 'Physics'], ['Economics', 'Business Studies'], ['Hindi'], ['Chemistry'], ['English', 'History']]
    const areas = ['Electronic City', 'Yelahanka', 'Hebbal', 'Bannerghatta', 'JP Nagar', 'Malleshwaram', 'Sadashivanagar', 'Banaswadi', 'RT Nagar', 'Vijayanagar']
    const rates = [600, 750, 550, 650, 900, 700, 800, 500, 850, 600]
    const ratings = [4.5, 4.7, 4.3, 4.8, 4.6, 4.4, 4.7, 4.5, 4.2, 4.9]
    return {
      id: `tutor-${idx}`, user_id: `tutor-${idx}`,
      headline: `Experienced ${subjectSets[i].join(' & ')} Teacher`,
      bio: `Dedicated teacher with ${3 + i} years of experience in ${subjectSets[i].join(' and ')}.`,
      education: [{ degree: 'M.Sc', institution: 'University of Bangalore', year: 2016 + (i % 4), field: subjectSets[i][0] }],
      qualifications: [`M.Sc ${subjectSets[i][0]}`], certifications: [],
      experience_years: 3 + i, subjects: subjectSets[i],
      grade_levels: ['8', '9', '10', '11', '12'],
      languages: ['English', 'Hindi', 'Kannada'],
      teaching_methodology: ['Interactive', 'Practice-Based'],
      learning_styles_supported: ['visual' as const, 'mixed' as const],
      hourly_rate: rates[i], currency: 'INR', travel_radius_km: 8,
      online_available: true, inperson_available: i % 3 !== 0,
      location_lat: bangaloreBase.lat + (Math.random() - 0.5) * 0.06,
      location_lng: bangaloreBase.lng + (Math.random() - 0.5) * 0.06,
      location_area: areas[i], city: 'Bangalore', state: 'Karnataka',
      rating: ratings[i], total_reviews: 20 + i * 8, completed_sessions: 50 + i * 30,
      profile_completion: 75 + i * 2,
      is_verified: idx <= 18, verification_status: (idx <= 18 ? 'approved' : 'pending') as TutorProfile['verification_status'],
      admin_approved: idx <= 18,
      created_at: `2025-0${Math.min(idx - 7, 5)}-01T10:00:00Z`,
      updated_at: `2025-0${Math.min(idx - 7, 5)}-01T10:00:00Z`,
    }
  }) as TutorProfile[],
]

// === Student Profiles ===
export const demoStudentProfiles: StudentProfile[] = [
  { id: 'student-1', parent_id: 'parent-1', name: 'Aarav Sharma', age: 15, grade: '10', board: 'CBSE', school: 'Delhi Public School', subjects: ['Mathematics', 'Physics', 'Chemistry'], weak_subjects: ['Chemistry'], strong_subjects: ['Mathematics'], learning_style: 'visual', learning_goals: ['Exam preparation', 'Competitive exams'], current_grades: { Mathematics: 'A', Physics: 'B+', Chemistry: 'B' }, upcoming_exams: ['Board Exams 2026'], created_at: '2025-01-15T10:00:00Z' },
  { id: 'student-2', parent_id: 'parent-1', name: 'Diya Sharma', age: 12, grade: '7', board: 'CBSE', school: 'Delhi Public School', subjects: ['Mathematics', 'English', 'Science'], weak_subjects: ['Mathematics'], strong_subjects: ['English'], learning_style: 'reading_writing', learning_goals: ['Homework', 'Concept understanding'], created_at: '2025-01-15T10:00:00Z' },
  { id: 'student-3', parent_id: 'parent-2', name: 'Arjun Kumar', age: 17, grade: '12', board: 'CBSE', school: 'Kendriya Vidyalaya', subjects: ['Physics', 'Mathematics', 'Computer Science'], weak_subjects: ['Physics'], strong_subjects: ['Computer Science'], learning_style: 'kinesthetic', learning_goals: ['Exam preparation', 'Competitive exams'], created_at: '2025-02-20T10:00:00Z' },
  { id: 'student-4', parent_id: 'parent-3', name: 'Saanvi Gupta', age: 14, grade: '9', board: 'ICSE', school: 'Bishop Cotton School', subjects: ['Mathematics', 'Biology', 'English'], weak_subjects: ['Biology'], strong_subjects: ['Mathematics'], learning_style: 'visual', learning_goals: ['Concept understanding', 'Exam preparation'], created_at: '2025-03-10T10:00:00Z' },
  { id: 'student-5', parent_id: 'parent-4', name: 'Rohan Patel', age: 16, grade: '11', board: 'State Board', school: 'Government High School', subjects: ['Mathematics', 'Physics'], weak_subjects: ['Mathematics'], strong_subjects: ['Physics'], learning_style: 'auditory', learning_goals: ['Exam preparation'], created_at: '2025-03-15T10:00:00Z' },
  { id: 'student-6', parent_id: 'parent-5', name: 'Ishita Reddy', age: 11, grade: '6', board: 'CBSE', school: 'National Public School', subjects: ['Science', 'Mathematics', 'Hindi'], weak_subjects: ['Hindi'], strong_subjects: ['Science'], learning_style: 'mixed', learning_goals: ['Homework', 'General improvement'], created_at: '2025-04-01T10:00:00Z' },
  { id: 'student-7', parent_id: 'parent-6', name: 'Vivaan Verma', age: 16, grade: '11', board: 'CBSE', school: 'St. Joseph\'s School', subjects: ['Economics', 'Accountancy', 'Business Studies'], weak_subjects: ['Accountancy'], strong_subjects: ['Economics'], learning_style: 'reading_writing', learning_goals: ['Exam preparation', 'Skill development'], created_at: '2025-04-10T10:00:00Z' },
  { id: 'student-8', parent_id: 'parent-7', name: 'Ananya Joshi', age: 13, grade: '8', board: 'ICSE', school: 'Vidya Niketan School', subjects: ['English', 'French', 'Social Studies'], weak_subjects: ['French'], strong_subjects: ['English'], learning_style: 'auditory', learning_goals: ['Concept understanding', 'Skill development'], created_at: '2025-04-15T10:00:00Z' },
  { id: 'student-9', parent_id: 'parent-8', name: 'Aditya Singh', age: 17, grade: '12', board: 'CBSE', school: 'DAV Public School', subjects: ['Physics', 'Chemistry', 'Biology'], weak_subjects: ['Chemistry'], strong_subjects: ['Biology'], learning_style: 'visual', learning_goals: ['Competitive exams', 'Exam preparation'], created_at: '2025-05-01T10:00:00Z' },
  { id: 'student-10', parent_id: 'parent-9', name: 'Kavya Agarwal', age: 10, grade: '5', board: 'CBSE', school: 'Army Public School', subjects: ['Mathematics', 'English', 'Science'], weak_subjects: ['Science'], strong_subjects: ['English', 'Mathematics'], learning_style: 'kinesthetic', learning_goals: ['Homework', 'General improvement'], created_at: '2025-05-10T10:00:00Z' },
]

// === Bookings ===
export const demoBookings: Booking[] = Array.from({ length: 20 }, (_, i) => {
  const statuses: Booking['status'][] = ['completed', 'completed', 'completed', 'confirmed', 'confirmed', 'pending', 'completed', 'confirmed', 'completed', 'completed', 'pending', 'completed', 'confirmed', 'completed', 'cancelled', 'completed', 'confirmed', 'completed', 'pending', 'confirmed']
  const types: Booking['type'][] = ['single', 'trial', 'single', 'single', 'recurring', 'trial', 'single', 'single', 'trial', 'single', 'trial', 'single', 'single', 'recurring', 'single', 'single', 'trial', 'single', 'trial', 'single']
  const tutorIdx = (i % 10) + 1
  const studentIdx = (i % 10) + 1
  const parentIdx = (i % 10) + 1
  const rate = demoTutorProfiles[tutorIdx - 1]?.hourly_rate || 500
  const fee = Math.round(rate * 0.1)
  const d = new Date()
  d.setDate(d.getDate() + (i < 10 ? -(i * 3) : i - 10))
  return {
    id: `booking-${i + 1}`, parent_id: `parent-${parentIdx}`, student_id: `student-${studentIdx}`, tutor_id: `tutor-${tutorIdx}`,
    type: types[i], status: statuses[i],
    date: d.toISOString().split('T')[0], start_time: `${9 + (i % 8)}:00`, end_time: `${10 + (i % 8)}:00`, duration_minutes: 60,
    is_online: i % 3 === 0, goals: 'Focus on weak areas and exam preparation',
    price: rate, platform_fee: fee, total_amount: rate + fee,
    payment_status: statuses[i] === 'completed' || statuses[i] === 'confirmed' ? 'successful' : 'pending',
    created_at: d.toISOString(), updated_at: d.toISOString(),
  }
})

// === Reviews ===
export const demoReviews: Review[] = Array.from({ length: 10 }, (_, i) => ({
  id: `review-${i + 1}`, booking_id: `booking-${i + 1}`,
  reviewer_id: `parent-${(i % 10) + 1}`, reviewee_id: `tutor-${(i % 10) + 1}`,
  reviewer_role: 'parent' as const,
  rating: 4 + (i % 2 === 0 ? 0.5 : 0),
  categories: { Knowledge: 4 + (i % 2), Punctuality: 4 + (i % 3 === 0 ? 1 : 0), Communication: 4 + (i % 2), 'Teaching Quality': 5 - (i % 2) },
  comment: ['Excellent teacher! Made complex topics very easy to understand.', 'Very patient and knowledgeable. My child loves the sessions.', 'Great teaching methodology. Highly recommended.', 'Very professional and well-prepared for each session.', 'Amazing experience! My child\'s grades improved significantly.', 'Wonderful teacher with great communication skills.', 'Very structured approach to teaching. Perfect for exam preparation.', 'Highly knowledgeable and makes learning fun.', 'Great with kids. Very patient and encouraging.', 'Excellent problem-solving approach. My child gained a lot of confidence.'][i],
  is_visible: true, created_at: new Date(Date.now() - i * 86400000 * 5).toISOString(),
}))

// === Notifications ===
export const demoNotifications: Notification[] = [
  { id: 'notif-1', user_id: 'parent-1', type: 'booking_accepted', title: 'Booking Accepted', message: 'Dr. Arjun Mehta accepted your booking for Mathematics on Oct 2', is_read: false, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 'notif-2', user_id: 'parent-1', type: 'upcoming_session', title: 'Upcoming Session', message: 'You have a Mathematics session with Dr. Arjun Mehta tomorrow at 4:00 PM', is_read: false, created_at: new Date(Date.now() - 7200000).toISOString() },
  { id: 'notif-3', user_id: 'parent-1', type: 'study_plan', title: 'Study Plan Ready', message: 'AI has generated a personalized study plan for Aarav in Mathematics', is_read: true, created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 'notif-4', user_id: 'parent-1', type: 'session_summary', title: 'Session Summary', message: 'Session summary for Physics class is now available', is_read: true, created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: 'notif-5', user_id: 'tutor-1', type: 'booking_request', title: 'New Booking Request', message: 'Priya Sharma wants to book a Mathematics session for Aarav', is_read: false, created_at: new Date(Date.now() - 1800000).toISOString() },
  { id: 'notif-6', user_id: 'tutor-1', type: 'payment', title: 'Payment Received', message: '₹720 has been added to your wallet for the completed session', is_read: false, created_at: new Date(Date.now() - 43200000).toISOString() },
  { id: 'notif-7', user_id: 'tutor-1', type: 'review', title: 'New Review', message: 'Priya Sharma left a 5-star review for your Mathematics session', is_read: true, created_at: new Date(Date.now() - 259200000).toISOString() },
  { id: 'notif-8', user_id: 'admin-1', type: 'verification', title: 'Pending Verification', message: 'Venkat Reddy has submitted documents for verification', is_read: false, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 'notif-9', user_id: 'admin-1', type: 'safety_alert', title: 'Safety Report', message: 'A new safety report has been submitted for review', is_read: false, created_at: new Date(Date.now() - 7200000).toISOString() },
]

// === Conversations ===
export const demoConversations: Conversation[] = [
  { id: 'conv-1', participant_1: 'parent-1', participant_2: 'tutor-1', last_message: 'Looking forward to the session tomorrow!', last_message_at: new Date(Date.now() - 1800000).toISOString(), unread_count_1: 1, unread_count_2: 0, is_blocked: false, created_at: '2025-06-01T10:00:00Z' },
  { id: 'conv-2', participant_1: 'parent-1', participant_2: 'tutor-3', last_message: 'Can we schedule a trial session for Chemistry?', last_message_at: new Date(Date.now() - 86400000).toISOString(), unread_count_1: 0, unread_count_2: 1, is_blocked: false, created_at: '2025-06-05T10:00:00Z' },
  { id: 'conv-3', participant_1: 'parent-2', participant_2: 'tutor-5', last_message: 'Thank you for the great session today!', last_message_at: new Date(Date.now() - 172800000).toISOString(), unread_count_1: 0, unread_count_2: 0, is_blocked: false, created_at: '2025-06-10T10:00:00Z' },
]

export const demoMessages: Message[] = [
  { id: 'msg-1', conversation_id: 'conv-1', sender_id: 'parent-1', content: 'Hello Dr. Mehta! I wanted to discuss Aarav\'s progress in Mathematics.', type: 'text', is_read: true, created_at: new Date(Date.now() - 7200000).toISOString() },
  { id: 'msg-2', conversation_id: 'conv-1', sender_id: 'tutor-1', content: 'Hello Priya! Aarav has been making excellent progress. His problem-solving skills have improved significantly in the last few sessions.', type: 'text', is_read: true, created_at: new Date(Date.now() - 5400000).toISOString() },
  { id: 'msg-3', conversation_id: 'conv-1', sender_id: 'parent-1', content: 'That\'s wonderful to hear! Can we focus more on trigonometry next session?', type: 'text', is_read: true, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 'msg-4', conversation_id: 'conv-1', sender_id: 'tutor-1', content: 'Absolutely! I\'ll prepare some practice problems for trigonometry. Looking forward to the session tomorrow!', type: 'text', is_read: false, created_at: new Date(Date.now() - 1800000).toISOString() },
  { id: 'msg-5', conversation_id: 'conv-2', sender_id: 'parent-1', content: 'Hello Mr. Chatterjee, my son needs help with Chemistry. Can we schedule a trial session?', type: 'text', is_read: true, created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: 'msg-6', conversation_id: 'conv-2', sender_id: 'tutor-3', content: 'Sure! I have availability this Saturday at 10 AM. Would that work?', type: 'text', is_read: true, created_at: new Date(Date.now() - 129600000).toISOString() },
  { id: 'msg-7', conversation_id: 'conv-2', sender_id: 'parent-1', content: 'Can we schedule a trial session for Chemistry?', type: 'text', is_read: false, created_at: new Date(Date.now() - 86400000).toISOString() },
]

// === Platform Stats ===
export const demoPlatformStats = {
  total_tutors: 5240,
  total_students: 21350,
  total_subjects: 50,
  total_sessions: 108500,
  cities: 25,
  satisfaction_rate: 97,
}
