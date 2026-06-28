import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw,
  LayoutGrid,
  List,
  Phone,
  Copy,
  CheckCircle2,
  CalendarClock,
  FileEdit,
  History,
  Star,
  Briefcase,
  User,
  Calendar,
  X
} from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const NAMES = ["Aarav Sharma", "Priya Patel", "Vikram Singh", "Neha Gupta", "Rohan Desai", "Anjali Reddy", "Kiran Verma", "Sneha Iyer", "Arjun Nair", "Pooja Joshi"];
const DESIGNATIONS = ["Software Engineer", "Senior Developer", "UI/UX Designer", "Product Manager", "DevOps Engineer"];
const RECRUITERS = ["Amitabh", "Deepika", "Shahrukh", "Alia"];
const SKILLS = ["React", "Node.js", "Python", "Java", "AWS", "Figma", "Docker", "SQL"];
const STATUSES = ["Scheduled", "Pending", "Completed", "Selected", "Rejected"];

const UPDATE_STATUS_OPTIONS = [
  "Interviewer Rescheduled",
  "Candidate Rescheduled",
  "JD Mismatch",
  "No Response",
  "Client Rejected",
  "Candidate Rejected",
  "Confirmed",
  "Pending Review",
  "Offered"
].map(s => ({ value: s, label: s }));

const MOCK_HISTORY = Array.from({ length: 35 }).map((_, i) => {
  const statuses = ["Scheduled", "Rescheduled", "Pending Review", "Technical Round 1", "Technical Round 2", "HR Round", "Selected"];
  const d = new Date(2023, 10, i + 1);
  const f = new Date(2023, 10, i + 3);
  return {
    id: `HIST-${i}`,
    statusName: statuses[Math.floor(Math.random() * statuses.length)],
    followUpDate: f.toISOString().split('T')[0],
    createdDate: d.toISOString().split('T')[0],
    comments: `Status automatically updated during phase ${i+1}. Candidate responded positively.`
  };
});

const MOCK_PROFILES = Array.from({ length: 65 }).map((_, i) => {
  const d = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  const rating = Math.floor(Math.random() * 5) + 1;
  const isRated = rating > 0 && Math.random() > 0.3; // some chance to not be rated
  
  const hour = Math.floor(Math.random() * 8) + 9; // 9 AM to 4 PM
  const timeStr = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'} - ${hour + 1 > 12 ? hour + 1 - 12 : hour + 1}:00 ${hour + 1 >= 12 ? 'PM' : 'AM'}`;

  return {
    id: `PROF-${1000 + i}`,
    name: NAMES[i % NAMES.length],
    mobile: `+91 ${Math.floor(Math.random() * 90000) + 10000}${Math.floor(Math.random() * 90000) + 10000}`,
    designation: DESIGNATIONS[i % DESIGNATIONS.length],
    recruiter: RECRUITERS[i % RECRUITERS.length],
    interviewDate: d.toISOString().split('T')[0],
    interviewTime: timeStr,
    rating: isRated ? rating : 0,
    status: STATUSES[i % STATUSES.length],
    primarySkill: SKILLS[i % SKILLS.length]
  };
});

export default function AnternClientAllProfiles() {
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "grid">("grid");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Custom Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [isRated, setIsRated] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Modals
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedScheduleProfile, setSelectedScheduleProfile] = useState<any>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isConfirmingReschedule, setIsConfirmingReschedule] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({ date: "", time: "" });

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatusProfile, setSelectedStatusProfile] = useState<any>(null);
  const [statusUpdateData, setStatusUpdateData] = useState({ status: "", nextFollowUp: "", comments: "" });
  const [isConfirmingStatusUpdate, setIsConfirmingStatusUpdate] = useState(false);

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedHistoryProfile, setSelectedHistoryProfile] = useState<any>(null);
  const [historyPage, setHistoryPage] = useState(1);
  const historyItemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate, filterSkill, isRated]);

  const filteredProfiles = profiles.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSkill = filterSkill ? p.primarySkill === filterSkill : true;
    const matchRated = isRated ? p.rating > 0 : true;
    
    let matchDate = true;
    if (startDate && endDate) {
      matchDate = p.interviewDate >= startDate && p.interviewDate <= endDate;
    } else if (startDate) {
      matchDate = p.interviewDate >= startDate;
    } else if (endDate) {
      matchDate = p.interviewDate <= endDate;
    }

    return matchSearch && matchSkill && matchRated && matchDate;
  });

  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
  const paginatedProfiles = filteredProfiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleReload = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setFilterSkill("");
    setIsRated(false);
  };

  const openScheduleModal = (prof: any) => {
    setSelectedScheduleProfile(prof);
    setIsRescheduling(false);
    setIsConfirmingReschedule(false);
    setRescheduleData({ date: prof.interviewDate, time: prof.interviewTime });
    setIsScheduleModalOpen(true);
  };

  const openStatusModal = (prof: any) => {
    setSelectedStatusProfile(prof);
    setIsConfirmingStatusUpdate(false);
    setStatusUpdateData({ status: "", nextFollowUp: "", comments: "" });
    setIsStatusModalOpen(true);
  };

  const openHistoryModal = (prof: any) => {
    setSelectedHistoryProfile(prof);
    setHistoryPage(1);
    setIsHistoryModalOpen(true);
  };

  const handleCopyMobile = (profId: string, mobile: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(mobile);
    setCopiedId(profId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderStars = (rating: number) => {
    if (rating === 0) return <span className="text-slate-400 text-xs font-bold">Unrated</span>;
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`w-3.5 h-3.5 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Selected': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-rose-100 text-rose-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      case 'Scheduled': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
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
            Browse and manage all candidate profiles and interview statuses
          </motion.p>
        </div>
      </div>

      {/* Toolbar / Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
          <div className="relative w-full lg:w-64 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full sm:w-40 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-[42px]"
              title="Start Date"
            />
            <input 
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full sm:w-40 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-[42px]"
              title="End Date"
            />
            
            <div className="w-full sm:w-48 relative z-50">
              <SearchableSelect
                value={filterSkill}
                onChange={setFilterSkill}
                options={[
                  { value: "", label: "All Primary Skills" },
                  ...SKILLS.map(s => ({ value: s, label: s }))
                ]}
                placeholder="Primary Skill"
                className="h-[42px]"
              />
            </div>
            
            <label className="flex items-center gap-2 cursor-pointer group h-[42px] px-2">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={isRated}
                  onChange={(e) => setIsRated(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-slate-300 rounded text-primary flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary">
                  {isRated && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">Rated</span>
            </label>
          </div>

          <div className="flex items-center gap-3 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-5">
            <div className="flex bg-slate-100 p-1 rounded-xl">
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
              onClick={handleReload}
              className="flex items-center justify-center gap-2 h-[42px] px-4 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all"
              title="Reset Filters"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden xl:inline">Reset</span>
            </button>
            <button 
              className="flex items-center justify-center gap-2 h-[42px] px-6 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Grid / Table View Content */}
      {viewMode === "grid" ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative z-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Designation</th>
                  <th className="px-6 py-4">Recruiter</th>
                  <th className="px-6 py-4">Interview Date</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                  {paginatedProfiles.map((prof, index) => (
                    <motion.tr 
                      key={prof.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800 truncate" title={prof.name}>{prof.name}</div>
                        <div 
                          className="flex items-center gap-2 mt-1 group/copy cursor-pointer w-fit"
                          onClick={(e) => handleCopyMobile(prof.id, prof.mobile, e)}
                          title="Copy Mobile Number"
                        >
                          <span className="text-xs text-slate-500 group-hover/copy:text-primary transition-colors">{prof.mobile}</span>
                          {copiedId === prof.id ? (
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3 opacity-0 group-hover/copy:opacity-100 transition-opacity text-slate-400 group-hover/copy:text-primary" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {prof.designation}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {prof.recruiter}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{prof.interviewDate}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{prof.interviewTime}</div>
                      </td>
                      <td className="px-6 py-4">
                        {renderStars(prof.rating)}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${getStatusColor(prof.status)}`}>
                          {prof.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openScheduleModal(prof)}
                            className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-all"
                            title="Schedule Interview"
                          >
                            <CalendarClock className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openStatusModal(prof)}
                            className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-all"
                            title="Update Status"
                          >
                            <FileEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openHistoryModal(prof)}
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-all"
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
                      <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                        No profiles found matching your search.
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
            {paginatedProfiles.map((prof, index) => (
              <motion.div
                key={prof.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className="min-w-0 pr-4 flex-1">
                    <h3 className="text-xl font-bold text-slate-800 truncate" title={prof.name}>
                      {prof.name}
                    </h3>
                    <div 
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 mt-1 cursor-pointer group/copy hover:text-primary transition-colors w-fit"
                      onClick={(e) => handleCopyMobile(prof.id, prof.mobile, e)}
                      title="Copy Mobile"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400 group-hover/copy:text-primary" />
                      {prof.mobile}
                      {copiedId === prof.id ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 ml-0.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-0 group-hover/copy:opacity-100 transition-opacity ml-0.5" />
                      )}
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold shrink-0 ${getStatusColor(prof.status)}`}>
                    {prof.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="truncate">{prof.designation}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="truncate">Recruiter: {prof.recruiter}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="truncate">Interview: {prof.interviewDate}</span>
                      <span className="text-xs text-slate-400">{prof.interviewTime}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    {renderStars(prof.rating)}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openScheduleModal(prof)}
                      className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-all"
                      title="Schedule Interview"
                    >
                      <CalendarClock className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openStatusModal(prof)}
                      className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-all"
                      title="Update Status"
                    >
                      <FileEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openHistoryModal(prof)}
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-all"
                      title="View History"
                    >
                      <History className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredProfiles.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-100">
                <p>No profiles found matching your search.</p>
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

      {/* Schedule / Reschedule Modal */}
      <AnimatePresence>
        {isScheduleModalOpen && selectedScheduleProfile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScheduleModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {isRescheduling ? "Reschedule Interview" : "Interview Details"}
                  </h2>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {selectedScheduleProfile.name} • {selectedScheduleProfile.designation}
                  </p>
                </div>
                <button 
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {!isRescheduling ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interview Rounds</label>
                        <div className="mt-1.5 font-bold text-slate-700">Technical Round 1</div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interviewer</label>
                        <div className="mt-1.5 font-bold text-slate-700">Rahul Verma</div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date & Time</label>
                        <div className="mt-1.5 font-bold text-slate-700">{selectedScheduleProfile.interviewDate}</div>
                        <div className="text-sm text-slate-500">{selectedScheduleProfile.interviewTime}</div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Candidate Rating</label>
                        <div className="mt-1.5">{renderStars(selectedScheduleProfile.rating)}</div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Meeting Link</label>
                      <div className="mt-1.5">
                        <a href="#" className="text-blue-600 hover:underline font-medium break-all">
                          https://meet.google.com/xyz-abcd-efg
                        </a>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex gap-3">
                      <button 
                        onClick={() => setIsScheduleModalOpen(false)}
                        className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        Close
                      </button>
                      <button 
                        onClick={() => setIsRescheduling(true)}
                        className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                ) : isConfirmingReschedule ? (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarClock className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Confirm Reschedule</h3>
                    <p className="text-slate-600 font-medium">
                      Are you sure you want to reschedule this interview for <br/>
                      <span className="font-bold text-slate-800">{rescheduleData.date}</span> at <span className="font-bold text-slate-800">{rescheduleData.time}</span>?
                    </p>
                    <div className="pt-6 flex gap-3 mt-4">
                      <button 
                        onClick={() => setIsConfirmingReschedule(false)}
                        className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          setIsConfirmingReschedule(false);
                          setIsScheduleModalOpen(false);
                        }}
                        className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                      >
                        Yes, Reschedule
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">New Date</label>
                      <input 
                        type="date"
                        value={rescheduleData.date}
                        onChange={(e) => setRescheduleData({...rescheduleData, date: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">New Time Slot</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                        {["9:00 - 9:30", "9:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00", "1:00 - 1:30", "1:30 - 2:00", "2:00 - 2:30", "2:30 - 3:00", "3:00 - 3:30", "3:30 - 4:00"].map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setRescheduleData({...rescheduleData, time: slot})}
                            className={`py-2 px-1 text-[12px] font-medium rounded-xl border transition-all ${
                              rescheduleData.time === slot
                                ? 'bg-slate-200 border-slate-300 text-slate-800 shadow-sm font-bold'
                                : 'bg-transparent text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex gap-3 mt-8 border-t border-slate-100">
                      <button 
                        onClick={() => setIsRescheduling(false)}
                        className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => {
                          if (!rescheduleData.date || !rescheduleData.time) return;
                          setIsConfirmingReschedule(true);
                        }}
                        disabled={!rescheduleData.date || !rescheduleData.time}
                        className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20 disabled:opacity-50 disabled:hover:bg-primary"
                      >
                        Confirm Reschedule
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Update Status Modal */}
      <AnimatePresence>
        {isStatusModalOpen && selectedStatusProfile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStatusModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Update Status
                  </h2>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {selectedStatusProfile.name} • {selectedStatusProfile.designation}
                  </p>
                </div>
                <button 
                  onClick={() => setIsStatusModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {isConfirmingStatusUpdate ? (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileEdit className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Confirm Status Update</h3>
                    <p className="text-slate-600 font-medium">
                      Are you sure you want to update the status of <span className="font-bold text-slate-800">{selectedStatusProfile.name}</span> to <span className="font-bold text-slate-800">{statusUpdateData.status}</span>?
                    </p>
                    <div className="pt-6 flex gap-3 mt-4">
                      <button 
                        onClick={() => setIsConfirmingStatusUpdate(false)}
                        className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          setIsConfirmingStatusUpdate(false);
                          setIsStatusModalOpen(false);
                        }}
                        className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                      >
                        Yes, Update Status
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative z-[60]">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                      <SearchableSelect
                        value={statusUpdateData.status}
                        onChange={(val) => setStatusUpdateData({...statusUpdateData, status: val})}
                        options={UPDATE_STATUS_OPTIONS}
                        placeholder="Search status..."
                        className="h-[42px]"
                      />
                    </div>

                    <div className="relative z-[50]">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Next Follow-Up Date</label>
                      <input 
                        type="date"
                        value={statusUpdateData.nextFollowUp}
                        onChange={(e) => setStatusUpdateData({...statusUpdateData, nextFollowUp: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div className="relative z-[40]">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Comments</label>
                      <textarea 
                        value={statusUpdateData.comments}
                        onChange={(e) => setStatusUpdateData({...statusUpdateData, comments: e.target.value})}
                        placeholder="Enter any additional remarks..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[100px] resize-y"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex gap-3 relative z-[30]">
                      <button 
                        onClick={() => setIsStatusModalOpen(false)}
                        className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          if (!statusUpdateData.status) return;
                          setIsConfirmingStatusUpdate(true);
                        }}
                        disabled={!statusUpdateData.status}
                        className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20 disabled:opacity-50 disabled:hover:bg-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View History Modal */}
      <AnimatePresence>
        {isHistoryModalOpen && selectedHistoryProfile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Status History
                  </h2>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {selectedHistoryProfile.name} • {selectedHistoryProfile.designation}
                  </p>
                </div>
                <button 
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto min-h-[400px]">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative z-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3">Status Name</th>
                          <th className="px-4 py-3">Follow Up Date</th>
                          <th className="px-4 py-3">Comments</th>
                          <th className="px-4 py-3 whitespace-nowrap">Created Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {MOCK_HISTORY.slice((historyPage - 1) * historyItemsPerPage, historyPage * historyItemsPerPage).map((hist) => (
                          <tr key={hist.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 whitespace-nowrap">
                                {hist.statusName}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-600 whitespace-nowrap">
                              {hist.followUpDate}
                            </td>
                            <td className="px-4 py-3 text-slate-600 min-w-[200px]">
                              {hist.comments}
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-600 whitespace-nowrap">
                              {hist.createdDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* History Pagination */}
                {Math.ceil(MOCK_HISTORY.length / historyItemsPerPage) > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-slate-500">
                      Showing <span className="font-medium text-slate-900">{(historyPage - 1) * historyItemsPerPage + 1}</span> to <span className="font-medium text-slate-900">{Math.min(historyPage * historyItemsPerPage, MOCK_HISTORY.length)}</span> of{' '}
                      <span className="font-medium text-slate-900">{MOCK_HISTORY.length}</span> results
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setHistoryPage(p => Math.max(1, p - 1))}
                        disabled={historyPage === 1}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      {[...Array(Math.ceil(MOCK_HISTORY.length / historyItemsPerPage))].map((_, idx) => {
                        const pageNumber = idx + 1;
                        // Basic sliding window for modal pagination
                        if (pageNumber === 1 || pageNumber === Math.ceil(MOCK_HISTORY.length / historyItemsPerPage) || (pageNumber >= historyPage - 1 && pageNumber <= historyPage + 1)) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => setHistoryPage(pageNumber)}
                              className={`w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                                historyPage === pageNumber 
                                  ? 'bg-primary text-white' 
                                  : 'text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (pageNumber === historyPage - 2 || pageNumber === historyPage + 2) {
                          return <span key={pageNumber} className="px-1 text-slate-400">...</span>;
                        }
                        return null;
                      })}

                      <button
                        onClick={() => setHistoryPage(p => Math.min(Math.ceil(MOCK_HISTORY.length / historyItemsPerPage), p + 1))}
                        disabled={historyPage === Math.ceil(MOCK_HISTORY.length / historyItemsPerPage)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

