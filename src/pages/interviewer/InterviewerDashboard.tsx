import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  RefreshCw, 
  LayoutGrid, 
  List, 
  Video, 
  Clock, 
  Star,
  Briefcase,
  CheckCircle2,
  CalendarClock,
  MoreVertical,
  Eye,
  Trash2,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type InterviewStatus = 'Scheduled' | 'Completed' | 'Cancelled';

interface Interview {
  id: string;
  candidateName: string;
  interviewDate: string; // YYYY-MM-DD for sorting/filtering
  time: string;
  primarySkill: string;
  interviewType: string;
  rating: number | null;
  status: InterviewStatus;
  meetingLink?: string;
  avatarUrl?: string;
  isConfirmed?: boolean;
}

// Generate 25 Mock Interviews for Pagination
const initialMockInterviews: Interview[] = Array.from({ length: 25 }, (_, i) => {
  const isConfirmed = i % 3 !== 0;
  const status = i % 4 === 0 ? 'Completed' : i % 7 === 0 ? 'Cancelled' : 'Scheduled';
  const names = ['Alex Johnson', 'Sarah Smith', 'Michael Chen', 'Emily Davis', 'David Wilson', 'Jessica Taylor', 'Chris Anderson', 'Amanda Thomas', 'Brian Jackson', 'Laura White'];
  const skills = ['React.js', 'Node.js', 'Python', 'UI/UX Design', 'Java / Spring', 'Angular', 'DevOps', 'Data Science', 'C# .NET', 'Ruby on Rails'];
  return {
    id: `INT-${(i + 1).toString().padStart(3, '0')}`,
    candidateName: names[i % names.length],
    interviewDate: `2026-06-${(20 + (i % 10)).toString()}`,
    time: `${9 + (i % 8)}:00 AM - ${10 + (i % 8)}:00 AM`,
    primarySkill: skills[i % skills.length],
    interviewType: i % 2 === 0 ? 'Technical Round 1' : i % 3 === 0 ? 'System Design' : 'Technical Round 2',
    rating: status === 'Completed' ? 4 + (i % 2) * 0.5 : null,
    status: status as InterviewStatus,
    isConfirmed,
    meetingLink: status === 'Scheduled' ? 'https://meet.google.com/abc-defg-hij' : undefined,
    avatarUrl: `https://ui-avatars.com/api/?name=${names[i % names.length].replace(' ', '+')}&background=64748b&color=fff`
  };
});

const getStatusColor = (status: InterviewStatus) => {
  switch (status) {
    case 'Scheduled': return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    case 'Cancelled': return 'bg-rose-50 text-rose-600 border-rose-200';
    default: return 'bg-slate-50 text-slate-600 border-slate-200';
  }
};

const getStatusIcon = (status: InterviewStatus) => {
  switch (status) {
    case 'Scheduled': return <CalendarClock className="w-4 h-4 mr-1.5" />;
    case 'Completed': return <CheckCircle2 className="w-4 h-4 mr-1.5" />;
    default: return null;
  }
};

export default function InterviewerDashboard() {
  const [interviews, setInterviews] = useState<Interview[]>(initialMockInterviews);
  const [viewMode, setViewMode] = useState<'cards' | 'grid'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isReloading, setIsReloading] = useState(false);
  
  // Modals state
  const [viewInterview, setViewInterview] = useState<Interview | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter Data
  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          interview.primarySkill.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDate = true;
    if (dateFrom && interview.interviewDate < dateFrom) matchesDate = false;
    if (dateTo && interview.interviewDate > dateTo) matchesDate = false;

    return matchesSearch && matchesDate;
  });

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(filteredInterviews.length / itemsPerPage));
  const paginatedInterviews = filteredInterviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, dateFrom, dateTo]);

  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => setIsReloading(false), 800);
  };

  const handleDelete = (id: string) => {
    setInterviews(prev => prev.filter(i => i.id !== id));
    setDeleteConfirmId(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header section with Title */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Interviewer Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage and review your upcoming and past interviews.
        </p>
      </div>

      {/* Search & Filter Panel */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-border/50 flex flex-col xl:flex-row gap-4 items-end xl:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto flex-1">
          {/* Search */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search candidate or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all"
            />
          </div>

          {/* Date Range */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input 
                type="date" 
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="pl-3 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all min-w-[140px]"
              />
            </div>
            <span className="text-muted-foreground text-sm font-medium">to</span>
            <div className="relative">
              <input 
                type="date" 
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="pl-3 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all min-w-[140px]"
              />
            </div>
            
            <button className="px-5 py-2.5 bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl text-sm font-bold shadow-sm transition-all ml-1">
              Search
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('cards')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                viewMode === 'cards' 
                  ? "bg-white text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              Cards
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                viewMode === 'grid' 
                  ? "bg-white text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5"
              )}
            >
              <List className="w-4 h-4" />
              Grid
            </button>
          </div>

          <button 
            onClick={handleReload}
            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#0085F7] hover:bg-[#0085F7]/5 transition-colors group"
            title="Reload Data"
          >
            <RefreshCw className={cn("w-5 h-5", isReloading && "animate-spin text-[#0085F7]")} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedInterviews.map(interview => (
            <div key={interview.id} className="bg-white rounded-3xl p-6 shadow-sm border border-border/50 hover:shadow-md hover:border-[#0085F7]/20 transition-all flex flex-col group relative overflow-hidden">
              {/* Top Row: Avatar & Status */}
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <img src={interview.avatarUrl} alt={interview.candidateName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground leading-tight group-hover:text-[#0085F7] transition-colors line-clamp-1">{interview.candidateName}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 font-medium">{interview.id}</p>
                  </div>
                </div>
                <div className={cn("px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center shadow-sm whitespace-nowrap shrink-0", getStatusColor(interview.status))}>
                  {getStatusIcon(interview.status)}
                  {interview.status}
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-4 flex-1 relative z-10">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Role / Skill</p>
                    <p className="text-sm font-bold text-slate-800">{interview.primarySkill}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{interview.interviewType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Schedule</p>
                    <p className="text-sm font-bold text-slate-800">{new Date(interview.interviewDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      {interview.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row / Actions */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between relative z-10">
                {/* Rating */}
                <div className="flex flex-col">
                   <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Rating</span>
                   {interview.rating ? (
                     <div className="flex items-center gap-1">
                       <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                       <span className="text-sm font-bold text-slate-800">{interview.rating}/5</span>
                     </div>
                   ) : (
                     <span className="text-sm font-semibold text-slate-400 italic">Not rated</span>
                   )}
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewInterview(interview)}
                    className="inline-flex items-center justify-center p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setDeleteConfirmId(interview.id)}
                    className="inline-flex items-center justify-center p-2 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-colors"
                    title="Delete Interview"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredInterviews.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-border/50 border-dashed">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-700">No interviews found</h3>
              <p className="text-slate-500 max-w-sm mt-1">Try adjusting your search query or date range filters.</p>
            </div>
          )}
        </div>
      ) : (
        /* Streamlined Grid (Table) View */
        <div className="bg-white rounded-3xl shadow-sm border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider">Candidate</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Role & Type</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-center">Meeting</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {paginatedInterviews.map(interview => (
                  <tr key={interview.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img src={interview.avatarUrl} alt="" className="w-9 h-9 rounded-full border border-slate-200" />
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-[#0085F7] transition-colors">{interview.candidateName}</p>
                          <p className="text-xs text-slate-500">{interview.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700">
                          {new Date(interview.interviewDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          {interview.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700">{interview.primarySkill}</span>
                        <span className="text-slate-500 text-xs mt-0.5">{interview.interviewType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={cn("inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border items-center shadow-sm", getStatusColor(interview.status))}>
                        {getStatusIcon(interview.status)}
                        {interview.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {interview.status === 'Scheduled' && interview.meetingLink ? (
                        <a 
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0085F7]/10 text-[#0085F7] hover:bg-[#0085F7] hover:text-white rounded-lg transition-colors font-bold text-xs shadow-sm"
                          title="Join Meeting"
                        >
                          <Video className="w-3.5 h-3.5" />
                          Join
                        </a>
                      ) : (
                        <span className="text-slate-400 text-xs italic">--</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setViewInterview(interview)}
                          className="inline-flex items-center justify-center p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirmId(interview.id)}
                          className="inline-flex items-center justify-center p-2 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-colors"
                          title="Delete Interview"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredInterviews.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                      No interviews found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && filteredInterviews.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-border/50 shadow-sm mt-4 relative z-0"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredInterviews.length)}</span> of{' '}
                <span className="font-medium text-slate-900">{filteredInterviews.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNumber = idx + 1;
                  const isCurrent = pageNumber === currentPage;
                  
                  if (
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-slate-200 focus:z-20 focus:outline-offset-0 transition-colors ${
                          isCurrent 
                            ? 'z-10 bg-[#0085F7] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0085F7]' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 || 
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span key={pageNumber} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-500 ring-1 ring-inset ring-slate-200 focus:outline-offset-0">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
          
          <div className="flex flex-1 justify-between sm:hidden items-center">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-500">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* View Interview Modal */}
      <AnimatePresence>
        {viewInterview && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setViewInterview(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-border/50"
            >
              {/* Dynamic Status Banner */}
              <div className={cn(
                "px-6 py-4 flex items-center justify-between border-b",
                viewInterview.status === 'Completed' ? "bg-emerald-50 border-emerald-100/50 text-emerald-700" :
                viewInterview.status === 'Cancelled' ? "bg-rose-50 border-rose-100/50 text-rose-700" :
                viewInterview.isConfirmed ? "bg-[#0085F7]/5 border-[#0085F7]/10 text-[#0085F7]" : "bg-amber-50 border-amber-100/50 text-amber-700"
              )}>
                <div className="flex items-center gap-2">
                  {viewInterview.status === 'Completed' ? (
                    <><CheckCircle2 className="w-5 h-5" /><span className="font-bold">Interview Completed</span></>
                  ) : viewInterview.status === 'Cancelled' ? (
                    <><X className="w-5 h-5" /><span className="font-bold">Interview Cancelled</span></>
                  ) : viewInterview.isConfirmed ? (
                    <><CheckCircle2 className="w-5 h-5" /><span className="font-bold">Confirmed & Scheduled</span></>
                  ) : (
                    <><AlertTriangle className="w-5 h-5" /><span className="font-bold">Pending Confirmation</span></>
                  )}
                </div>
                <button 
                  onClick={() => setViewInterview(null)}
                  className="p-1.5 hover:bg-black/5 rounded-full transition-colors opacity-70 hover:opacity-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-6 pb-6 pt-6 space-y-6">
                {/* Profile Block */}
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white shrink-0">
                    <img src={viewInterview.avatarUrl} alt={viewInterview.candidateName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground leading-tight">{viewInterview.candidateName}</h3>
                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mt-1">{viewInterview.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Date & Time</p>
                    <p className="text-sm font-bold text-slate-800">{new Date(viewInterview.interviewDate).toLocaleDateString()}</p>
                    <p className="text-sm text-slate-600">{viewInterview.time}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Role / Skill</p>
                    <p className="text-sm font-bold text-slate-800">{viewInterview.primarySkill}</p>
                    <p className="text-sm text-slate-600">{viewInterview.interviewType}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Rating</p>
                    {viewInterview.rating ? (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-slate-800">{viewInterview.rating}/5</span>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-slate-500 italic">Not rated yet</span>
                    )}
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-center">
                    {viewInterview.meetingLink && viewInterview.status === 'Scheduled' ? (
                      <a 
                        href={viewInterview.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 px-4 py-2 bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl text-sm font-bold transition-all shadow-sm"
                      >
                        <Video className="w-4 h-4" />
                        Join Call
                      </a>
                    ) : (
                      <span className="text-sm text-slate-500 italic">No link available</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-border/50 flex justify-end">
                <button 
                  onClick={() => setViewInterview(null)}
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setDeleteConfirmId(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-border/50 text-center p-6"
            >
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Delete Interview?</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Are you sure you want to remove this interview? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
