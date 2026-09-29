'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search, MapPin, Star, CheckCircle2, Heart, MessageSquare, Sparkles,
  SlidersHorizontal, X, Clock, BookOpen, GraduationCap, Video,
  ChevronDown, Grid3X3, List, ArrowUpDown, Filter, Globe, Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { demoTutorProfiles, demoSubjects } from '@/lib/demo-data'
import { formatCurrency, getMatchScoreColor, getMatchScoreBg } from '@/lib/utils'

export default function TutorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedGrade, setSelectedGrade] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [inPersonOnly, setInPersonOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState<string>('ai_recommended')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredTutors = useMemo(() => {
    let tutors = [...demoTutorProfiles]

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      tutors = tutors.filter(t =>
        t.subjects.some(s => s.toLowerCase().includes(q)) ||
        t.headline?.toLowerCase().includes(q) ||
        t.bio?.toLowerCase().includes(q) ||
        t.location_area?.toLowerCase().includes(q)
      )
    }

    // Filters
    if (selectedSubject) tutors = tutors.filter(t => t.subjects.includes(selectedSubject))
    if (selectedGrade) tutors = tutors.filter(t => t.grade_levels.includes(selectedGrade))
    if (onlineOnly) tutors = tutors.filter(t => t.online_available)
    if (inPersonOnly) tutors = tutors.filter(t => t.inperson_available)
    if (verifiedOnly) tutors = tutors.filter(t => t.is_verified)
    tutors = tutors.filter(t => t.hourly_rate >= priceRange[0] && t.hourly_rate <= priceRange[1])

    // Add match scores
    tutors = tutors.map(t => ({
      ...t,
      match_score: Math.floor(70 + Math.random() * 25),
      distance_km: Math.round((2 + Math.random() * 15) * 10) / 10,
    }))

    // Sort
    switch (sortBy) {
      case 'ai_recommended': tutors.sort((a, b) => (b.match_score || 0) - (a.match_score || 0)); break
      case 'rating': tutors.sort((a, b) => b.rating - a.rating); break
      case 'price_low': tutors.sort((a, b) => a.hourly_rate - b.hourly_rate); break
      case 'price_high': tutors.sort((a, b) => b.hourly_rate - a.hourly_rate); break
      case 'experience': tutors.sort((a, b) => b.experience_years - a.experience_years); break
      case 'distance': tutors.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0)); break
    }

    return tutors
  }, [searchQuery, selectedSubject, selectedGrade, priceRange, onlineOnly, inPersonOnly, verifiedOnly, sortBy])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-white/70 hover:text-white text-sm">Home</Link>
            <span className="text-white/50">/</span>
            <span className="text-sm">Find Tutors</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect Tutor</h1>
          <p className="text-white/80 mb-6">AI-powered search across {demoTutorProfiles.length}+ verified tutors</p>
          
          {/* Search bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search subject, tutor name, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 bg-white/20 hover:bg-white/30 text-white border-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="border-b border-[var(--border)] bg-[var(--card)] animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div>
                <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1 block">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full h-9 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-sm"
                >
                  <option value="">All Subjects</option>
                  {demoSubjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1 block">Grade</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full h-9 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-sm"
                >
                  <option value="">All Grades</option>
                  {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={String(i + 1)}>Class {i + 1}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1 block">Max Price</label>
                <select
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-9 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-sm"
                >
                  <option value={500}>Up to ₹500/hr</option>
                  <option value={800}>Up to ₹800/hr</option>
                  <option value={1000}>Up to ₹1000/hr</option>
                  <option value={1500}>Up to ₹1500/hr</option>
                  <option value={2000}>Any Price</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1 block">Mode</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setOnlineOnly(!onlineOnly); setInPersonOnly(false) }}
                    className={`flex-1 h-9 rounded-lg border text-xs font-medium transition-colors ${onlineOnly ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--border)] hover:bg-[var(--secondary)]'}`}
                  >
                    <Globe className="w-3 h-3 inline mr-1" />Online
                  </button>
                  <button
                    onClick={() => { setInPersonOnly(!inPersonOnly); setOnlineOnly(false) }}
                    className={`flex-1 h-9 rounded-lg border text-xs font-medium transition-colors ${inPersonOnly ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--border)] hover:bg-[var(--secondary)]'}`}
                  >
                    <Home className="w-3 h-3 inline mr-1" />Home
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-9 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-sm"
                >
                  <option value="ai_recommended">AI Recommended</option>
                  <option value="rating">Rating</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="experience">Experience</option>
                  <option value="distance">Distance</option>
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <button
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={`h-9 rounded-lg border text-xs font-medium transition-colors ${verifiedOnly ? 'bg-emerald-500 text-white border-emerald-500' : 'border-[var(--border)] hover:bg-[var(--secondary)]'}`}
                >
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />Verified Only
                </button>
              </div>
            </div>
            {(selectedSubject || selectedGrade || verifiedOnly || onlineOnly || inPersonOnly) && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-xs text-[var(--muted-foreground)]">Active filters:</span>
                {selectedSubject && <Badge variant="secondary" className="text-xs">{selectedSubject} <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedSubject('')} /></Badge>}
                {selectedGrade && <Badge variant="secondary" className="text-xs">Class {selectedGrade} <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedGrade('')} /></Badge>}
                {verifiedOnly && <Badge variant="secondary" className="text-xs">Verified <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setVerifiedOnly(false)} /></Badge>}
                {onlineOnly && <Badge variant="secondary" className="text-xs">Online <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setOnlineOnly(false)} /></Badge>}
                {inPersonOnly && <Badge variant="secondary" className="text-xs">In-Person <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setInPersonOnly(false)} /></Badge>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[var(--muted-foreground)]">
            <span className="font-semibold text-[var(--foreground)]">{filteredTutors.length}</span> tutors found
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[var(--secondary)]' : ''}`} aria-label="Grid view">
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[var(--secondary)]' : ''}`} aria-label="List view">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {filteredTutors.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto mb-4 text-[var(--muted-foreground)]" />
            <h3 className="text-xl font-semibold mb-2">No tutors found</h3>
            <p className="text-[var(--muted-foreground)]">Try adjusting your filters or search query</p>
            <Button className="mt-4" onClick={() => { setSearchQuery(''); setSelectedSubject(''); setSelectedGrade(''); setVerifiedOnly(false) }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredTutors.map(tutor => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                viewMode={viewMode}
                isFavorite={favorites.includes(tutor.id)}
                onToggleFavorite={() => toggleFavorite(tutor.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface TutorCardProps {
  tutor: typeof demoTutorProfiles[0] & { match_score?: number; distance_km?: number }
  viewMode: 'grid' | 'list'
  isFavorite: boolean
  onToggleFavorite: () => void
}

function TutorCard({ tutor, viewMode, isFavorite, onToggleFavorite }: TutorCardProps) {
  const matchScore = tutor.match_score || 0

  if (viewMode === 'list') {
    return (
      <Card className="premium-card overflow-hidden">
        <CardContent className="p-5">
          <div className="flex gap-5">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {tutor.id.split('-')[1]}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{tutor.headline?.split('|')[0]?.trim() || `Tutor #${tutor.id.split('-')[1]}`}</h3>
                    {tutor.is_verified && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{tutor.subjects.join(' • ')}</p>
                </div>
                <div className="flex items-center gap-2">
                  {matchScore > 0 && (
                    <span className={`match-badge ${getMatchScoreBg(matchScore)} ${getMatchScoreColor(matchScore)}`}>
                      <Sparkles className="w-3 h-3" /> {matchScore}%
                    </span>
                  )}
                  <button onClick={onToggleFavorite} className="p-1.5" aria-label="Toggle favorite">
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {tutor.rating} ({tutor.total_reviews})</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {tutor.experience_years}y exp</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {tutor.location_area}</span>
                {tutor.distance_km && <span className="text-[var(--muted-foreground)]">{tutor.distance_km}km</span>}
                <span className="font-semibold text-[var(--primary)]">{formatCurrency(tutor.hourly_rate)}/hr</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Link href={`/tutors/${tutor.id}`}><Button size="sm">View Profile</Button></Link>
                <Button size="sm" variant="outline"><MessageSquare className="w-3 h-3" /> Message</Button>
                <Button size="sm" variant="outline"><Calendar className="w-3 h-3" /> Book Trial</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="premium-card overflow-hidden group">
      <CardContent className="p-0">
        <div className="relative p-5">
          {/* Favorite button */}
          <button onClick={onToggleFavorite} className="absolute top-4 right-4 p-1.5 rounded-full bg-[var(--background)]/80 backdrop-blur z-10" aria-label="Toggle favorite">
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>

          {/* Avatar and basic info */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {tutor.id.split('-')[1]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold truncate">{`Tutor #${tutor.id.split('-')[1]}`}</h3>
                {tutor.is_verified && <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />}
              </div>
              <p className="text-sm text-[var(--muted-foreground)] truncate">{tutor.subjects.join(', ')}</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{tutor.rating}</span>
                <span className="text-xs text-[var(--muted-foreground)]">({tutor.total_reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="text-xs"><Clock className="w-3 h-3 mr-1" /> {tutor.experience_years}y exp</Badge>
            <Badge variant="secondary" className="text-xs"><MapPin className="w-3 h-3 mr-1" /> {tutor.location_area}</Badge>
            {tutor.online_available && <Badge variant="secondary" className="text-xs"><Globe className="w-3 h-3 mr-1" /> Online</Badge>}
            {tutor.inperson_available && <Badge variant="secondary" className="text-xs"><Home className="w-3 h-3 mr-1" /> In-Person</Badge>}
          </div>

          {/* Match score */}
          {matchScore > 0 && (
            <div className={`p-3 rounded-xl ${getMatchScoreBg(matchScore)} mb-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className={`w-4 h-4 ${getMatchScoreColor(matchScore)}`} />
                  <span className={`font-semibold text-sm ${getMatchScoreColor(matchScore)}`}>{matchScore}% Match</span>
                </div>
                <span className="text-[10px] text-[var(--muted-foreground)]">AI estimate</span>
              </div>
            </div>
          )}

          {/* Price and actions */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-[var(--primary)]">{formatCurrency(tutor.hourly_rate)}</p>
              <p className="text-xs text-[var(--muted-foreground)]">per hour</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/tutors/${tutor.id}`}>
                <Button size="sm">View Profile</Button>
              </Link>
              <Button size="sm" variant="outline" className="px-2" aria-label="Message tutor">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
    </svg>
  )
}
