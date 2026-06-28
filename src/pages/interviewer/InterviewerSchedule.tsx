import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  Search, 
  Plus, 
  Copy, 
  Trash2,
  CalendarCheck,
  CalendarSearch,
  X,
  Save,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchableSelect } from '../../components/SearchableSelect';

// Types
interface ScheduleEntry {
  id: string;
  date: string;
  timeSlot: string;
}

const TIME_SLOT_OPTIONS = [
  { value: '09:00 AM - 10:00 AM', label: '09:00 AM - 10:00 AM' },
  { value: '10:00 AM - 11:00 AM', label: '10:00 AM - 11:00 AM' },
  { value: '11:00 AM - 12:00 PM', label: '11:00 AM - 12:00 PM' },
  { value: '12:00 PM - 01:00 PM', label: '12:00 PM - 01:00 PM' },
  { value: '02:00 PM - 03:00 PM', label: '02:00 PM - 03:00 PM' },
  { value: '03:00 PM - 04:00 PM', label: '03:00 PM - 04:00 PM' },
  { value: '04:00 PM - 05:00 PM', label: '04:00 PM - 05:00 PM' },
  { value: '05:00 PM - 06:00 PM', label: '05:00 PM - 06:00 PM' },
];

// Generate Initial Mock Data
const initialSetSchedules: ScheduleEntry[] = [
  { id: 'SCH-001', date: '2026-06-28', timeSlot: '10:00 AM - 11:00 AM' },
  { id: 'SCH-002', date: '2026-06-28', timeSlot: '02:00 PM - 03:00 PM' },
  { id: 'SCH-003', date: '2026-06-29', timeSlot: '11:00 AM - 12:00 PM' },
];

const initialSearchedSchedules: ScheduleEntry[] = [
  { id: 'SCH-101', date: '2026-06-28', timeSlot: '10:00 AM - 11:00 AM' },
  { id: 'SCH-102', date: '2026-06-28', timeSlot: '02:00 PM - 03:00 PM' },
  { id: 'SCH-103', date: '2026-06-30', timeSlot: '09:00 AM - 10:00 AM' },
  { id: 'SCH-104', date: '2026-07-01', timeSlot: '04:00 PM - 05:00 PM' },
  { id: 'SCH-105', date: '2026-07-02', timeSlot: '11:00 AM - 12:00 PM' },
];

export default function InterviewerSchedule() {
  const [activeTab, setActiveTab] = useState<'set' | 'search'>('set');
  
  // Set Schedule State
  const [setSchedules, setSetSchedules] = useState<ScheduleEntry[]>(initialSetSchedules);
  const [setDate, setSetDate] = useState('');
  const [setTimeSlot, setSetTimeSlot] = useState('');
  
  // Search Schedule State
  const [searchedSchedules, setSearchedSchedules] = useState<ScheduleEntry[]>(initialSearchedSchedules);
  const [searchDate, setSearchDate] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Clone Modal State
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [cloneFromDate, setCloneFromDate] = useState('');
  const [cloneToDate, setCloneToDate] = useState('');

  // Handlers for Tab 1 (Set)
  const handleSetClear = () => {
    setSetDate('');
    setSetTimeSlot('');
  };

  const handleSetSave = () => {
    if (!setDate || !setTimeSlot) return;
    
    const newEntry: ScheduleEntry = {
      id: `SCH-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      date: setDate,
      timeSlot: setTimeSlot
    };
    
    setSetSchedules([newEntry, ...setSchedules]);
    handleSetClear();
  };

  const handleClone = (id: string) => {
    setIsCloneModalOpen(true);
  };

  const handleDeleteSet = (id: string) => {
    if(confirm("Are you sure you want to delete this schedule?")) {
      setSetSchedules(prev => prev.filter(s => s.id !== id));
    }
  };

  // Handlers for Tab 2 (Search)
  const handleSearchClear = () => {
    setSearchDate('');
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 600);
  };

  const filteredSearchSchedules = searchDate 
    ? searchedSchedules.filter(s => s.date === searchDate)
    : searchedSchedules;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Schedule</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your interview availability and view upcoming slots.
        </p>
      </div>

      {/* Custom Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit relative z-0">
        <button
          onClick={() => setActiveTab('set')}
          className={cn(
            "relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all z-10",
            activeTab === 'set' 
              ? "text-slate-800" 
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          {activeTab === 'set' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/60"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <CalendarCheck className="w-4 h-4" />
            Interview Set Schedule
          </span>
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={cn(
            "relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all z-10",
            activeTab === 'search' 
              ? "text-slate-800" 
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          {activeTab === 'search' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/60"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <CalendarSearch className="w-4 h-4" />
            Interview Schedule Search
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'set' && (
            <div className="space-y-6">
              {/* Set Schedule Panel */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/50">
                <div className="flex flex-col lg:flex-row gap-6 items-end justify-between">
                  
                  {/* Left Side: Inputs & Save */}
                  <div className="flex flex-col md:flex-row gap-6 items-end w-full lg:w-auto">
                    <div className="w-full md:w-56 space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-slate-400" />
                        Select Date
                      </label>
                      <input 
                        type="date" 
                        value={setDate}
                        onChange={(e) => setSetDate(e.target.value)}
                        className="w-full px-4 h-[46px] bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all shadow-sm text-slate-700"
                      />
                    </div>

                    <div className="w-full md:w-64 space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        Time Slot
                      </label>
                      <SearchableSelect
                        options={TIME_SLOT_OPTIONS}
                        value={setTimeSlot}
                        onChange={setSetTimeSlot}
                        placeholder="Select time slot..."
                        className="h-[46px]"
                      />
                    </div>

                    <button 
                      onClick={handleSetSave}
                      className="w-full md:w-auto flex items-center justify-center gap-2 px-8 h-[46px] bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-[#0085F7]/20 shrink-0"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </div>

                  {/* Right Side: Clear */}
                  <div className="w-full lg:w-auto flex justify-end shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                    <button 
                      onClick={handleSetClear}
                      className="w-full lg:w-auto px-6 h-[46px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold transition-colors shadow-sm"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Set Schedule Grid */}
              <div className="bg-white rounded-3xl shadow-sm border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-border/50">
                      <tr>
                        <th className="px-6 py-4 font-bold tracking-wider">Date</th>
                        <th className="px-6 py-4 font-bold tracking-wider">Time Slot</th>
                        <th className="px-6 py-4 font-bold tracking-wider text-right">Clone for All Days</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {setSchedules.map((schedule) => (
                        <tr key={schedule.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100">
                                <CalendarDays className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-slate-800">{new Date(schedule.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold border border-slate-200">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              {schedule.timeSlot}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleClone(schedule.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-colors"
                              >
                                <Copy className="w-3.5 h-3.5" />
                                Clone
                              </button>
                              <button 
                                onClick={() => handleDeleteSet(schedule.id)}
                                className="inline-flex items-center justify-center p-1.5 bg-white text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                                title="Remove slot"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {setSchedules.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center text-slate-500">
                              <CalendarCheck className="w-8 h-8 text-slate-300 mb-3" />
                              <p className="font-medium text-slate-600">No schedules set yet.</p>
                              <p className="text-xs mt-1">Use the panel above to add availability.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="space-y-6">
              {/* Search Panel */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/50">
                <div className="flex flex-col lg:flex-row gap-6 items-end justify-between">
                  
                  {/* Left Side: Inputs & Search */}
                  <div className="flex flex-col md:flex-row gap-6 items-end w-full lg:w-auto">
                    <div className="w-full md:w-56 space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-slate-400" />
                        Filter by Date
                      </label>
                      <input 
                        type="date" 
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="w-full px-4 h-[46px] bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all shadow-sm text-slate-700"
                      />
                    </div>

                    <button 
                      onClick={handleSearch}
                      className="w-full md:w-auto flex items-center justify-center gap-2 px-8 h-[46px] bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-[#0085F7]/20 shrink-0"
                    >
                      {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      Search
                    </button>
                  </div>

                  {/* Right Side: Clear */}
                  <div className="w-full lg:w-auto flex justify-end shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                    <button 
                      onClick={handleSearchClear}
                      className="w-full lg:w-auto px-6 h-[46px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold transition-colors shadow-sm"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Grid */}
              <div className="bg-white rounded-3xl shadow-sm border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-border/50">
                      <tr>
                        <th className="px-6 py-4 font-bold tracking-wider">Date</th>
                        <th className="px-6 py-4 font-bold tracking-wider">Time Slot</th>
                        <th className="px-6 py-4 font-bold tracking-wider text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {filteredSearchSchedules.map((schedule) => (
                        <tr key={schedule.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100">
                                <CalendarDays className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-slate-800">{new Date(schedule.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold border border-slate-200">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              {schedule.timeSlot}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Active Slot
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredSearchSchedules.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center text-slate-500">
                              <Search className="w-8 h-8 text-slate-300 mb-3" />
                              <p className="font-medium text-slate-600">No schedules found.</p>
                              <p className="text-xs mt-1">Try adjusting your date filter.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Clone Schedule Modal */}
      <AnimatePresence>
        {isCloneModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCloneModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border/50 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50 bg-slate-50/50 rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <Copy className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Clone Schedules</h2>
                    <p className="text-sm text-slate-500">Duplicate this slot across multiple days</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCloneModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-white text-slate-400 hover:text-slate-600 transition-colors shadow-sm border border-transparent hover:border-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* From Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      From Date
                    </label>
                    <input 
                      type="date"
                      value={cloneFromDate}
                      onChange={(e) => setCloneFromDate(e.target.value)}
                      className="w-full px-4 h-[46px] bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all shadow-sm text-slate-700"
                    />
                  </div>

                  {/* To Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      To Date
                    </label>
                    <input 
                      type="date"
                      value={cloneToDate}
                      onChange={(e) => setCloneToDate(e.target.value)}
                      className="w-full px-4 h-[46px] bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all shadow-sm text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 bg-slate-50 border-t border-border/50 flex flex-col sm:flex-row justify-end gap-3 rounded-b-3xl">
                <button 
                  onClick={() => {
                    setCloneFromDate('');
                    setCloneToDate('');
                  }}
                  className="px-6 py-2.5 h-[46px] bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-bold transition-colors shadow-sm w-full sm:w-auto"
                >
                  Clear
                </button>
                <button 
                  onClick={() => setIsCloneModalOpen(false)}
                  className="px-8 py-2.5 h-[46px] flex items-center justify-center gap-2 bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-[#0085F7]/20 w-full sm:w-auto"
                >
                  <Copy className="w-4 h-4" />
                  Clone for all weekdays
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
