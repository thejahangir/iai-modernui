import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Calendar, 
  RefreshCw,
  FileSpreadsheet,
  CalendarPlus,
  History,
  Eye,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  User,
  Code,
  Video
} from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const MOCK_SKILLS = ["React", "Node.js", "Python", "Java", "Angular", "Vue", "AWS", "Docker"];
const MOCK_STATUSES = ["Pending", "Shortlisted", "Interview Scheduled", "Rejected", "Hired"];
const INDIAN_CANDIDATES = ["Aarav Sharma", "Priya Patel", "Vikram Singh", "Neha Gupta", "Rohan Desai", "Anjali Reddy", "Kiran Verma", "Sneha Iyer", "Arjun Nair", "Pooja Joshi", "Aditya Rao", "Kavya Menon", "Rahul Bose", "Swati Mishra", "Karan Johar"];
const INDIAN_RECRUITERS = ["Ramesh Kumar", "Sunita Sharma", "Deepak Gupta", "Meera Reddy", "Sanjay Patel", "Lalita Iyer"];

const MOCK_PROFILES = Array.from({ length: 45 }).map((_, i) => ({
  id: `PROF-${1000 + i}`,
  name: INDIAN_CANDIDATES[i % INDIAN_CANDIDATES.length],
  designation: ["Software Engineer", "Frontend Developer", "Backend Developer", "DevOps Engineer", "UI Designer"][i % 5],
  recruiter: INDIAN_RECRUITERS[Math.floor(i / 5) % INDIAN_RECRUITERS.length],
  interviewDate: `2026-11-${(i % 28 + 1).toString().padStart(2, '0')}`,
  rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
  status: MOCK_STATUSES[i % MOCK_STATUSES.length],
  primarySkill: MOCK_SKILLS[i % MOCK_SKILLS.length]
}));

const MOCK_SCHEDULE_DATA = [
  { round: "L1 Technical", date: "2026-11-20 10:00 AM", link: "https://meet.google.com/abc-defg-hij", rating: "4.2" },
  { round: "L2 Technical", date: "2026-11-22 02:00 PM", link: "https://meet.google.com/xyz-uvwx-yz", rating: "4.5" },
  { round: "HR Round", date: "Pending", link: "-", rating: "-" },
];

const MOCK_HISTORY = [
  { status: "Profile Created", date: "2026-10-15 09:00 AM", comments: "Candidate profile uploaded by vendor." },
  { status: "Shortlisted", date: "2026-10-18 02:30 PM", comments: "Profile matches requirements." },
  { status: "Interview Scheduled", date: "2026-11-01 11:00 AM", comments: "L1 interview scheduled." },
];

export default function VendorAllProfiles() {
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  
  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [primarySkill, setPrimarySkill] = useState("");
  const [isRatedOnly, setIsRatedOnly] = useState(false);
  
  // Active Filters (Applied after Search click)
  const [activeFromDate, setActiveFromDate] = useState("");
  const [activeToDate, setActiveToDate] = useState("");
  const [activePrimarySkill, setActivePrimarySkill] = useState("");
  const [activeIsRatedOnly, setActiveIsRatedOnly] = useState(false);

  // Modals
  const [selectedProfile, setSelectedProfile] = useState<typeof MOCK_PROFILES[0] | null>(null);
  const [activeModal, setActiveModal] = useState<'details' | 'schedule' | 'status' | 'history' | null>(null);
  
  // Status Modal State
  const [newStatus, setNewStatus] = useState("");
  const [scheduleConfirmData, setScheduleConfirmData] = useState<{round: string} | null>(null);

  // View Mode
  const [viewMode, setViewMode] = useState<"card" | "grid">("card");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFromDate, activeToDate, activePrimarySkill, activeIsRatedOnly]);

  const filteredProfiles = profiles.filter(p => {
    const matchSkill = activePrimarySkill ? p.primarySkill === activePrimarySkill : true;
    const matchRated = activeIsRatedOnly ? parseFloat(p.rating) >= 4.0 : true; // Assuming "Rated" means high rating or simply has a rating
    
    // Date range filter
    const matchDate = (!activeFromDate || p.interviewDate >= activeFromDate) && 
                      (!activeToDate || p.interviewDate <= activeToDate);

    return matchSkill && matchRated && matchDate;
  });

  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage) || 1;
  const paginatedProfiles = filteredProfiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = () => {
    setActiveFromDate(fromDate);
    setActiveToDate(toDate);
    setActivePrimarySkill(primarySkill);
    setActiveIsRatedOnly(isRatedOnly);
  };

  const handleReload = () => {
    setFromDate("");
    setToDate("");
    setPrimarySkill("");
    setIsRatedOnly(false);
    
    setActiveFromDate("");
    setActiveToDate("");
    setActivePrimarySkill("");
    setActiveIsRatedOnly(false);
    
    setProfiles(MOCK_PROFILES);
  };

  const handleAction = (action: string, id: string) => {
    const p = profiles.find(x => x.id === id);
    if (!p) return;
    setSelectedProfile(p);
    if (action === "Schedule Interview") setActiveModal('schedule');
    else if (action === "Update Status") setActiveModal('status');
    else if (action === "View History") setActiveModal('history');
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold font-heading text-foreground"
          >
            All Profiles
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-2 font-medium"
          >
            Manage and track candidate profiles submitted by your team
          </motion.p>
        </div>
      </div>

      {/* Toolbar / Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
      >
        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto flex-1">
          {/* Date Range */}
          <div className="flex items-center gap-2 shrink-0">
            <input 
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-[125px] sm:w-[135px] bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]"
              title="From Date"
            />
            <span className="text-slate-400 font-medium text-sm">to</span>
            <input 
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-[125px] sm:w-[135px] bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]"
              title="To Date"
            />
          </div>

          {/* Primary Skill */}
          <div className="w-full sm:w-48 shrink-0 relative z-50">
            <SearchableSelect
              value={primarySkill}
              onChange={setPrimarySkill}
              options={[
                { value: "", label: "All Skills" },
                ...MOCK_SKILLS.map(s => ({ value: s, label: s }))
              ]}
              placeholder="Primary Skill"
              className="h-[42px]"
            />
          </div>

          {/* Rated Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer h-[42px] px-2 text-sm font-bold text-slate-700 select-none shrink-0">
            <input
              type="checkbox"
              checked={isRatedOnly}
              onChange={(e) => setIsRatedOnly(e.target.checked)}
              className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary/20"
            />
            Rated
          </label>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleReload}
              className="flex items-center justify-center w-[42px] h-[42px] bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl transition-all hover:bg-slate-200 shrink-0"
              title="Reload Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              onClick={handleSearch}
              className="px-6 h-[42px] bg-primary text-white font-bold rounded-xl flex justify-center items-center gap-2 text-sm shadow-sm shadow-primary/20 hover:bg-primary/90 transition-colors shrink-0"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center w-full xl:w-auto justify-end border-t xl:border-t-0 xl:border-l border-slate-100 pt-4 xl:pt-0 xl:pl-4 gap-3 shrink-0">
          <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 rounded-lg flex items-center justify-center transition-all ${viewMode === "card" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              title="Card View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              title="Grid View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button 
            className="flex items-center justify-center gap-2 h-[42px] px-5 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 text-sm font-bold rounded-xl transition-all w-full sm:w-auto"
            onClick={() => alert("Exporting to Excel...")}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export to Excel
          </button>
        </div>
      </motion.div>

      {/* Grid / Table View */}
      {viewMode === "grid" ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative z-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Designation</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                  {paginatedProfiles.map((profile, index) => (
                    <motion.tr 
                      key={profile.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4 font-bold text-slate-800 max-w-[150px] truncate" title={profile.name}>
                        {profile.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600 max-w-[150px] truncate" title={profile.designation}>
                        {profile.designation}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                          profile.status === 'Hired' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          profile.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                          profile.status === 'Interview Scheduled' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                          profile.status === 'Shortlisted' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-slate-50 text-slate-600 border border-slate-100'
                        }`}>
                          {profile.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => { setSelectedProfile(profile); setActiveModal('details'); }}
                            className="p-1.5 rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAction("Schedule Interview", profile.id)}
                            className="p-1.5 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all"
                            title="Schedule Interview"
                          >
                            <CalendarPlus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAction("Update Status", profile.id)}
                            className="p-1.5 rounded-lg text-amber-600 bg-amber-50 hover:bg-amber-100 transition-all"
                            title="Update Status"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAction("View History", profile.id)}
                            className="p-1.5 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                            title="View History"
                          >
                            <History className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {filteredProfiles.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                        No profiles found matching your filters.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-0">
          <AnimatePresence>
            {paginatedProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                
                <div className="flex justify-between items-start mb-3">
                  <div className="min-w-0 pr-3 flex-1">
                    <h3 className="text-lg font-bold text-slate-800 truncate" title={profile.name}>
                      {profile.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 truncate mt-1">
                      {profile.designation}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                      profile.status === 'Hired' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      profile.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                      profile.status === 'Interview Scheduled' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      profile.status === 'Shortlisted' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      'bg-slate-50 text-slate-600 border border-slate-100'
                    }`}>
                      {profile.status}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-rose-400 text-rose-400" />
                      <span className="text-sm font-bold text-rose-500">{profile.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-auto pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="truncate">Int. Date: {profile.interviewDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="truncate">Recruiter: {profile.recruiter}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Code className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="truncate">Skill: {profile.primarySkill}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleAction("Schedule Interview", profile.id)}
                    className="flex-1 flex flex-col xl:flex-row items-center justify-center gap-1 xl:gap-1.5 py-2 px-1 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all"
                    title="Schedule Interview"
                  >
                    <CalendarPlus className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-bold">Schedule</span>
                  </button>
                  <button
                    onClick={() => handleAction("Update Status", profile.id)}
                    className="flex-1 flex flex-col xl:flex-row items-center justify-center gap-1 xl:gap-1.5 py-2 px-1 rounded-xl text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all"
                    title="Update Status"
                  >
                    <RefreshCw className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-bold">Status</span>
                  </button>
                  <button
                    onClick={() => handleAction("View History", profile.id)}
                    className="flex-1 flex flex-col xl:flex-row items-center justify-center gap-1 xl:gap-1.5 py-2 px-1 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                    title="View History"
                  >
                    <History className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-bold">History</span>
                  </button>
                </div>
              </motion.div>
            ))}
            {filteredProfiles.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-100">
                <p>No profiles found matching your filters.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && filteredProfiles.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-slate-200 shadow-sm mt-4 relative z-0"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredProfiles.length)}</span> of{' '}
                <span className="font-medium text-slate-900">{filteredProfiles.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-4 w-4" />
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
                            ? 'z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary' 
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
                      <span key={pageNumber} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-500 ring-1 ring-inset ring-slate-200">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" />
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

      {/* Modals Section */}
      <AnimatePresence>
        {activeModal && selectedProfile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedProfile(null); setActiveModal(null); }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
                activeModal === 'history' ? 'max-w-4xl' :
                activeModal === 'schedule' ? 'max-w-4xl' :
                activeModal === 'status' ? 'max-w-lg' : 'max-w-2xl'
              }`}
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {activeModal === 'details' && "Profile Details"}
                    {activeModal === 'schedule' && "Interview Rounds"}
                    {activeModal === 'status' && "Update Status"}
                    {activeModal === 'history' && "Status History"}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    {selectedProfile.name} • {selectedProfile.designation}
                  </p>
                </div>
                <button 
                  onClick={() => { setSelectedProfile(null); setActiveModal(null); }}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Details */}
              {activeModal === 'details' && (
                <div className="p-6 space-y-4 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Designation</label>
                      <div className="font-medium text-slate-700 text-sm">{selectedProfile.designation}</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Status</label>
                      <div className="font-medium text-slate-700 text-sm">{selectedProfile.status}</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Rating</label>
                      <div className="font-medium text-slate-700 text-sm flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-rose-400 text-rose-400" />
                        <span>{selectedProfile.rating}</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Recruiter</label>
                      <div className="font-medium text-slate-700 text-sm">{selectedProfile.recruiter}</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Interview Date</label>
                      <div className="font-medium text-slate-700 text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {selectedProfile.interviewDate}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Primary Skill</label>
                      <div className="font-medium text-slate-700 text-sm">{selectedProfile.primarySkill}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Body: Schedule */}
              {activeModal === 'schedule' && (
                <div className="p-6 overflow-y-auto">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative z-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-4">Interview Rounds</th>
                            <th className="px-6 py-4">Interview Date</th>
                            <th className="px-6 py-4">Meeting Link</th>
                            <th className="px-6 py-4">Rating</th>
                            <th className="px-6 py-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {MOCK_SCHEDULE_DATA.map((round, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800">{round.round}</td>
                              <td className="px-6 py-4 font-medium text-slate-600">
                                {round.date !== "Pending" ? (
                                  <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-1.5">
                                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                      <span>{round.date.split(" ").slice(0, 1).join(" ")}</span>
                                    </div>
                                    <span className="text-[11px] text-slate-400 pl-5">{round.date.split(" ").slice(1).join(" ")}</span>
                                  </div>
                                ) : (
                                  <span className="text-slate-400 italic">Pending</span>
                                )}
                              </td>
                              <td className="px-6 py-4 font-medium text-blue-600">
                                {round.link !== "-" ? (
                                  <a href={round.link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Join Meeting">
                                    <Video className="w-4 h-4" />
                                  </a>
                                ) : (
                                  <span className="text-slate-400 italic">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                {round.rating !== "-" ? (
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-rose-400 text-rose-400" />
                                    <span className="font-bold text-slate-700">{round.rating}</span>
                                  </div>
                                ) : (
                                  <span className="text-slate-400 italic">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button 
                                    onClick={() => setScheduleConfirmData({ round: round.round })}
                                    className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors" 
                                    title="Schedule"
                                  >
                                    <CalendarPlus className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Body: Update Status */}
              {activeModal === 'status' && (
                <div className="p-6 space-y-5 overflow-y-auto">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Status <span className="text-rose-500">*</span></label>
                    <SearchableSelect
                      options={MOCK_STATUSES.map(s => ({ value: s, label: s }))}
                      value={newStatus}
                      onChange={setNewStatus}
                      placeholder="Select new status..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Next Follow-Up Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="date" 
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-700" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Comments</label>
                    <textarea 
                      placeholder="Add any additional notes..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[100px] resize-none"
                    />
                  </div>
                  <div className="pt-2">
                    <button 
                      onClick={() => { setSelectedProfile(null); setActiveModal(null); }}
                      className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Update Status
                    </button>
                  </div>
                </div>
              )}

              {/* Modal Body: History */}
              {activeModal === 'history' && (
                <div className="p-6 overflow-y-auto min-h-[300px]">
                  <div className="relative pl-6 ml-3 border-l-2 border-slate-100 space-y-6">
                    {MOCK_HISTORY.map((hist, idx) => (
                      <div key={idx} className="relative">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[33px] top-1.5 w-3.5 h-3.5 bg-primary rounded-full ring-4 ring-white shadow-sm" />
                        
                        {/* Content Card */}
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                            <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-white text-slate-700 border border-slate-200 shrink-0 shadow-sm w-fit">
                              {hist.status}
                            </span>
                            <span className="text-xs font-bold text-slate-400 shrink-0">
                              {hist.date}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-slate-600 leading-relaxed">
                            {hist.comments}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Schedule Confirmation Modal */}
      <AnimatePresence>
        {scheduleConfirmData && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setScheduleConfirmData(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarPlus className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Confirm Action</h3>
              <p className="text-sm text-slate-500 mb-8">
                Are you sure you want to schedule the <span className="font-bold text-slate-800">{scheduleConfirmData.round}</span>? This will notify the candidate.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setScheduleConfirmData(null)}
                  className="flex-1 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setScheduleConfirmData(null);
                    // Add schedule logic here
                  }}
                  className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-sm transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
