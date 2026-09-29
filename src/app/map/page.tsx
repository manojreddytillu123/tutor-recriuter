'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  MapPin, Search, Star, CheckCircle2, Navigation, Layers, SlidersHorizontal,
  GraduationCap, Phone, Globe, Home, Sparkles, Filter, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { demoTutorProfiles, demoSubjects } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'

export default function MapPage() {
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(demoTutorProfiles[0].id)
  const [radiusKm, setRadiusKm] = useState<number>(10)
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [mode, setMode] = useState<'all' | 'online' | 'inperson'>('all')

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const tutorsWithCoords = demoTutorProfiles.map((t, idx) => {
    // Simulated Bangalore area coordinates (~12.9716, 77.5946)
    const baseLat = 12.9716
    const baseLng = 77.5946
    const angle = (idx * 60) * (Math.PI / 180)
    const distance = 1.5 + (idx * 1.2)
    const lat = baseLat + (Math.sin(angle) * distance * 0.015)
    const lng = baseLng + (Math.cos(angle) * distance * 0.015)
    return {
      ...t,
      lat,
      lng,
      distance_km: Math.round(distance * 10) / 10,
    }
  }).filter(t => {
    if (t.distance_km > radiusKm) return false
    if (selectedSubject && !t.subjects.includes(selectedSubject)) return false
    if (mode === 'online' && !t.online_available) return false
    if (mode === 'inperson' && !t.inperson_available) return false
    return true
  })

  const selectedTutor = tutorsWithCoords.find(t => t.id === selectedTutorId) || tutorsWithCoords[0]

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Top Header */}
      <header className="bg-[var(--card)] border-b border-[var(--border)] px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold hidden sm:inline">HomeTutor AI Map</span>
          </Link>
          <Badge variant={mapboxToken ? "success" : "warning"} className="text-[10px]">
            {mapboxToken ? "MAPBOX LIVE" : "DEMO MAP"}
          </Badge>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar py-1">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="h-9 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 text-xs"
          >
            <option value="">All Subjects</option>
            {demoSubjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>

          <div className="flex items-center gap-1.5 bg-[var(--secondary)] px-3 py-1.5 rounded-lg text-xs">
            <span className="text-[var(--muted-foreground)]">Radius:</span>
            <span className="font-semibold">{radiusKm} km</span>
            <input
              type="range"
              min="2"
              max="25"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-20 accent-[var(--primary)]"
            />
          </div>

          <div className="flex gap-1 bg-[var(--secondary)] p-1 rounded-lg">
            {(['all', 'inperson', 'online'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors ${mode === m ? 'bg-[var(--card)] shadow-xs' : 'text-[var(--muted-foreground)]'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Map View Area */}
      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        {/* Tutor Sidebar List */}
        <div className="w-full md:w-96 bg-[var(--card)] border-r border-[var(--border)] overflow-y-auto p-4 space-y-3 max-h-[40vh] md:max-h-none z-10 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">Nearby Tutors ({tutorsWithCoords.length})</p>
            <span className="text-xs text-[var(--muted-foreground)]">Sorted by distance</span>
          </div>

          {tutorsWithCoords.length === 0 ? (
            <div className="text-center py-10">
              <MapPin className="w-10 h-10 mx-auto mb-2 text-[var(--muted-foreground)]" />
              <p className="text-sm font-medium">No tutors found in this radius</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Try increasing the radius slider above</p>
            </div>
          ) : (
            tutorsWithCoords.map(tutor => (
              <div
                key={tutor.id}
                onClick={() => setSelectedTutorId(tutor.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedTutorId === tutor.id
                    ? 'border-[var(--primary)] bg-[var(--accent)]/40 shadow-sm'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {tutor.id.split('-')[1]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm truncate">{`Tutor #${tutor.id.split('-')[1]}`}</h4>
                      <Badge variant="outline" className="text-[10px]">{tutor.distance_km} km away</Badge>
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)] truncate">{tutor.subjects.join(', ')}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{tutor.rating}</span>
                      </div>
                      <span className="text-xs font-bold text-[var(--primary)]">{formatCurrency(tutor.hourly_rate)}/hr</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Map Canvas with Mapbox Imagery */}
        <div className="flex-1 relative bg-slate-900 min-h-[50vh] md:min-h-0 overflow-hidden flex items-center justify-center">
          {/* Mapbox Imagery Tile Background */}
          {mapboxToken ? (
            <div className="absolute inset-0 bg-cover bg-center transition-all opacity-90"
              style={{
                backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/static/77.5946,12.9716,12,0/1200x800@2x?access_token=${mapboxToken}')`
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
          )}

          {/* Map overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 pointer-events-none" />

          {/* Central User Pin */}
          <div className="absolute z-20 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-lg animate-ping absolute inset-0 opacity-75" />
              <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold">
                You
              </div>
            </div>
            <span className="bg-slate-800/90 text-white text-[10px] px-2 py-0.5 rounded-full mt-1 border border-slate-700 shadow-sm backdrop-blur">Your Location</span>
          </div>

          {/* Simulated Radius Circle */}
          <div
            className="absolute rounded-full border-2 border-indigo-400/50 bg-indigo-500/15 pointer-events-none transition-all duration-300 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${radiusKm * 28}px`,
              height: `${radiusKm * 28}px`,
            }}
          />

          {/* Tutor Pins */}
          {tutorsWithCoords.map((tutor, idx) => {
            const isSelected = selectedTutorId === tutor.id
            const offsetX = Math.cos(idx * 60 * (Math.PI / 180)) * tutor.distance_km * 14
            const offsetY = Math.sin(idx * 60 * (Math.PI / 180)) * tutor.distance_km * 14

            return (
              <button
                key={tutor.id}
                onClick={() => setSelectedTutorId(tutor.id)}
                className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${isSelected ? 'scale-125 z-40' : ''}`}
                style={{
                  left: `calc(50% + ${offsetX}px)`,
                  top: `calc(50% + ${offsetY}px)`,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className={`px-2 py-1 rounded-full text-[10px] font-bold shadow-xl flex items-center gap-1 border backdrop-blur ${
                    isSelected
                      ? 'bg-purple-600 text-white border-white scale-105 ring-2 ring-purple-400'
                      : 'bg-slate-900/90 text-white border-slate-700 hover:border-purple-400'
                  }`}>
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>#{tutor.id.split('-')[1]}</span>
                    <span>• {formatCurrency(tutor.hourly_rate)}</span>
                  </div>
                  <div className={`w-3 h-3 rotate-45 border-r border-b -mt-1.5 ${
                    isSelected ? 'bg-purple-600 border-white' : 'bg-slate-900 border-slate-700'
                  }`} />
                </div>
              </button>
            )
          })}

          {/* Selected Tutor Floating Card */}
          {selectedTutor && (
            <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-80 z-40 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-4 animate-slide-up backdrop-blur-md">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {selectedTutor.id.split('-')[1]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold text-sm truncate">{`Tutor #${selectedTutor.id.split('-')[1]}`}</h3>
                    {selectedTutor.is_verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)]">{selectedTutor.subjects.join(', ')}</p>
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                    📍 {selectedTutor.distance_km} km away in {selectedTutor.location_area}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
                <div>
                  <span className="text-lg font-bold text-[var(--primary)]">{formatCurrency(selectedTutor.hourly_rate)}</span>
                  <span className="text-[10px] text-[var(--muted-foreground)]">/hr</span>
                </div>
                <Link href={`/tutors/${selectedTutor.id}`}>
                  <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs">
                    View Profile <ChevronRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <button className="p-2 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-md hover:bg-[var(--secondary)] text-xs font-semibold" onClick={() => setRadiusKm(Math.min(25, radiusKm + 5))}>
              + Zoom
            </button>
            <button className="p-2 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-md hover:bg-[var(--secondary)] text-xs font-semibold" onClick={() => setRadiusKm(Math.max(2, radiusKm - 3))}>
              - Zoom
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
