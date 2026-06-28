import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  Briefcase, 
  FileText, 
  CalendarCheck,
  CheckCircle2,
  Hand,
  LayoutGrid,
  List
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PickupEntry {
  id: string;
  date: string;
  timeSlot: string;
  experience: string;
  notes: string;
  bookedSlotsForDay: string[];
  status: 'available' | 'picked';
}

const mockPickupData: PickupEntry[] = [
  {
    id: 'PK-001',
    date: '2026-06-29',
    timeSlot: '09:00 AM - 10:00 AM',
    experience: '5-8 Years',
    notes: 'Requires strong React & Node.js knowledge.',
    bookedSlotsForDay: ['11:00 AM - 12:00 PM', '04:00 PM - 05:00 PM'],
    status: 'available'
  },
  {
    id: 'PK-002',
    date: '2026-06-29',
    timeSlot: '11:00 AM - 12:00 PM',
    experience: '3-5 Years',
    notes: 'Focus on System Design basics.',
    bookedSlotsForDay: ['09:00 AM - 10:00 AM', '04:00 PM - 05:00 PM'],
    status: 'available'
  },
  {
    id: 'PK-003',
    date: '2026-06-30',
    timeSlot: '02:00 PM - 03:00 PM',
    experience: '8-12 Years',
    notes: 'Principal Engineer role - deep dive into architecture.',
    bookedSlotsForDay: [],
    status: 'available'
  },
  {
    id: 'PK-004',
    date: '2026-07-01',
    timeSlot: '10:00 AM - 11:00 AM',
    experience: '1-3 Years',
    notes: 'Standard frontend interview (CSS, JS basics).',
    bookedSlotsForDay: ['02:00 PM - 03:00 PM'],
    status: 'available'
  }
];

export default function InterviewerPickupSchedule() {
  const [interviews, setInterviews] = useState<PickupEntry[]>(mockPickupData);
  const [viewMode, setViewMode] = useState<'cards' | 'grid'>('cards');

  const handlePickup = (id: string) => {
    setInterviews(prev => 
      prev.map(interview => 
        interview.id === id 
          ? { ...interview, status: 'picked' }
          : interview
      )
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Pickup Interviews</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Browse and pick up unassigned interview requests that match your availability.
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0 w-fit">
          <button
            onClick={() => setViewMode('cards')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
              viewMode === 'cards' 
                ? "bg-white text-slate-800 shadow-sm border border-slate-200/60" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            Cards
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
              viewMode === 'grid' 
                ? "bg-white text-slate-800 shadow-sm border border-slate-200/60" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <List className="w-4 h-4" />
            Grid
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {interviews.map(interview => (
            <div key={interview.id} className="bg-white rounded-3xl p-6 shadow-sm border border-border/50 hover:shadow-md hover:border-[#0085F7]/20 transition-all flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#0085F7]/5 to-transparent rounded-bl-full" />
              
              {/* Card Header: Date & Time */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-[#0085F7]" />
                    <span className="font-bold text-slate-800">
                      {new Date(interview.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold border border-slate-200 w-fit">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {interview.timeSlot}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-4 flex-1 relative z-10">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Experience</h4>
                  <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    {interview.experience}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Special Notes</h4>
                  <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 line-clamp-2" title={interview.notes}>
                      {interview.notes}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Booked Slots</h4>
                  <div className="flex flex-wrap gap-2">
                    {interview.bookedSlotsForDay.length > 0 ? (
                      interview.bookedSlotsForDay.map((slot, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-semibold border border-slate-200 whitespace-nowrap">
                          {slot}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No slots booked today</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 relative z-10">
                {interview.status === 'available' ? (
                  <button 
                    onClick={() => handlePickup(interview.id)}
                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-[#0085F7]/20"
                  >
                    <Hand className="w-4 h-4" />
                    PickUp Interview
                  </button>
                ) : (
                  <span className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4" />
                    Picked Up
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Main Grid Card */
        <div className="bg-white rounded-3xl shadow-sm border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Interview Date</th>
                <th className="px-6 py-4 font-bold tracking-wider">Time</th>
                <th className="px-6 py-4 font-bold tracking-wider">Years of Experience</th>
                <th className="px-6 py-4 font-bold tracking-wider">Special Notes</th>
                <th className="px-6 py-4 font-bold tracking-wider text-center">Your booked slots for the day</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {interviews.map((interview) => (
                <tr key={interview.id} className="hover:bg-slate-50/50 transition-colors group">
                  
                  {/* Interview Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100">
                        <CalendarDays className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-800">
                        {new Date(interview.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </td>
                  
                  {/* Time Slot */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {interview.timeSlot}
                    </span>
                  </td>

                  {/* Years of Experience */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      {interview.experience}
                    </span>
                  </td>

                  {/* Special Notes */}
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2 max-w-xs">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <p className="text-slate-600 line-clamp-2" title={interview.notes}>
                        {interview.notes}
                      </p>
                    </div>
                  </td>

                  {/* Booked Slots */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2 max-w-[200px]">
                      {interview.bookedSlotsForDay.length > 0 ? (
                        interview.bookedSlotsForDay.map((slot, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-semibold border border-slate-200 whitespace-nowrap">
                            {slot}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">No slots booked</span>
                      )}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {interview.status === 'available' ? (
                      <button 
                        onClick={() => handlePickup(interview.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-[#0085F7]/20"
                      >
                        <Hand className="w-4 h-4" />
                        PickUp
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4" />
                        Picked Up
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              
              {interviews.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <CalendarCheck className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="font-medium text-slate-600">No interviews available for pickup.</p>
                      <p className="text-xs mt-1">Check back later for new requests.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  );
}
