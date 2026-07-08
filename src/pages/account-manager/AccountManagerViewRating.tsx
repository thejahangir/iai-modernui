import React from 'react';
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
  MoreVertical,
  Briefcase,
  User,
  Calendar,
  X, Video, Link as LinkIcon, MapPin, ThumbsUp, ThumbsDown, ShieldCheck, Mail, Hash, Clock, FileText, StarHalf, ExternalLink, PlayCircle, Download, Code, MessageSquare, Camera} from "lucide-react";
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
  const cd = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  const rating = Math.floor(Math.random() * 5) + 1;
  const isRated = rating > 0 && Math.random() > 0.3;
  const hour = Math.floor(Math.random() * 8) + 9;
  const timeStr = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'} - ${hour + 1 > 12 ? hour + 1 - 12 : hour + 1}:00 ${hour + 1 >= 12 ? 'PM' : 'AM'}`;
  const name = NAMES[i % NAMES.length];
  return {
    id: 'PROF-' + (1000 + i),
    name: name,
    email: name.toLowerCase().replace(' ', '.') + '@example.com',
    mobile: '+91 ' + (Math.floor(Math.random() * 90000) + 10000) + (Math.floor(Math.random() * 90000) + 10000),
    designation: DESIGNATIONS[i % DESIGNATIONS.length],
    jobCode: 'REQ-' + (2000 + (i % 5)),
    recruiter: RECRUITERS[i % RECRUITERS.length],
    interviewDate: d.toISOString().split('T')[0],
    interviewTime: timeStr,
    createdDate: cd.toISOString().split('T')[0],
    rating: isRated ? rating : 0,
    status: STATUSES[i % STATUSES.length],
    primarySkill: SKILLS[i % SKILLS.length],
    meetingUrl: 'https://meet.google.com/abc-xyz-def',
    recordingUrl: 'https://drive.google.com/file/d/1234567890abcdef',
    recordingPasscode: '5n#XTtxw',
  };
});

export default function AccountManagerViewRating() {
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "grid">("card");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [activeFeedbackTab, setActiveFeedbackTab] = useState<"overview" | "ratings" | "summary">("overview");
  const [selectedFeedbackProfile, setSelectedFeedbackProfile] = useState<any>(null);

  const openFeedbackModal = (prof: any) => {
    setSelectedFeedbackProfile(prof);
    setActiveFeedbackTab("overview");
    setIsFeedbackModalOpen(true);
  };


  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  
  // Custom Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [isRated, setIsRated] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Modals
  // Add a simple state for the customizable vendor logo
  const [vendorLogoUrl, setVendorLogoUrl] = useState<string>("https://ui-avatars.com/api/?name=Vendor+Corp&background=eef2ff&color=4f46e5&rounded=true&bold=true");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setVendorLogoUrl(url);
    }
  };

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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewProfile, setSelectedViewProfile] = useState<any>(null);
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
  const openViewModal = (prof: any) => { setSelectedViewProfile(prof); setIsViewModalOpen(true); };

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
          <div className="overflow-x-auto min-h-[400px] pb-32">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Recruiter</th>
                  <th className="px-6 py-4">Interview Date</th>
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
                        {prof.recruiter}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{prof.interviewDate}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{prof.interviewTime}</div>
                      </td>
                      
                      <td className="px-6 py-4 font-medium">
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${getStatusColor(prof.status)}`}>
                          {prof.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button onClick={() => openViewModal(prof)} className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-all" title="View All Data">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => openFeedbackModal(prof)} className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-50 transition-all" title="Feedback Report">
                            <Star className="w-4 h-4" />
                          </button>
                          <button onClick={() => {}} className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-all" title="Recording">
                            <Video className="w-4 h-4" />
                          </button>
                          <button onClick={() => openStatusModal(prof)} className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-all" title="Update Status">
                            <FileEdit className="w-4 h-4" />
                          </button>
                          <button onClick={() => openHistoryModal(prof)} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-all" title="View Story">
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
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="min-w-0 pr-3 flex-1">
                    <h3 className="text-base font-bold text-slate-800 truncate" title={prof.name}>
                      {prof.name}
                    </h3>
                    <div 
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-0.5 cursor-pointer group/copy hover:text-primary transition-colors w-fit"
                      onClick={(e) => handleCopyMobile(prof.id, prof.mobile, e)}
                      title="Copy Mobile"
                    >
                      <Phone className="w-3 h-3 text-slate-400 group-hover/copy:text-primary" />
                      {prof.mobile}
                      {copiedId === prof.id ? (
                        <CheckCircle2 className="w-3 h-3 text-green-500 ml-0.5" />
                      ) : (
                        <Copy className="w-3 h-3 opacity-0 group-hover/copy:opacity-100 transition-opacity ml-0.5" />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${getStatusColor(prof.status)}`}>
                      {prof.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 mb-0.5 flex items-center gap-1"><Briefcase className="w-3 h-3"/> Designation</div>
                    <div className="text-xs font-semibold text-slate-700 truncate">{prof.designation}</div>
                  </div>
                  <div className="bg-primary/5 p-2 rounded-lg border border-primary/10">
                    <div className="text-[10px] font-bold text-primary/70 mb-0.5 flex items-center gap-1"><Calendar className="w-3 h-3"/> Interview</div>
                    <div className="text-xs font-semibold text-primary truncate">
                      {prof.interviewDate} <span className="text-[10px] font-medium opacity-80 ml-0.5">{prof.interviewTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                   <a href={prof.meetingUrl} className="text-[11px] font-semibold flex justify-center items-center gap-1.5 text-blue-600 hover:bg-blue-100 bg-blue-50 px-2 py-1.5 rounded-lg border border-blue-100 flex-1 transition-colors"><Video className="w-3 h-3"/> Join Meeting</a>
                   <div className="flex items-center justify-between text-[11px] bg-purple-50 px-2 py-1.5 rounded-lg border border-purple-100 flex-1">
                     <a href={prof.recordingUrl} className="flex items-center gap-1.5 font-semibold text-purple-600 hover:text-purple-700 truncate"><PlayCircle className="w-3 h-3 shrink-0"/> <span className="truncate">Recording URL</span></a>
                     <span className="text-[10px] font-mono font-bold text-purple-700 ml-1 shrink-0">({prof.recordingPasscode})</span>
                   </div>
                </div>

                <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between">
                  {prof.rating > 0 ? (
                    <div className="flex items-center gap-1 text-rose-500 text-[11px] font-bold">
                      <Star className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      {prof.rating}.0
                    </div>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400">Unrated</span>
                  )}
                  <div className="flex items-center gap-0.5">
                    <button onClick={() => openViewModal(prof)} className="p-1.5 rounded-md text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all" title="View Details"><Eye className="w-3.5 h-3.5" /></button>
                    <button onClick={() => openFeedbackModal(prof)} className="p-1.5 rounded-md text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-all" title="Feedback Report"><Star className="w-3.5 h-3.5" /></button>
                    <button onClick={() => {}} className="p-1.5 rounded-md text-slate-400 hover:text-purple-500 hover:bg-purple-50 transition-all" title="Recording"><Video className="w-3.5 h-3.5" /></button>
                    <button onClick={() => openStatusModal(prof)} className="p-1.5 rounded-md text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all" title="Update Status"><FileEdit className="w-3.5 h-3.5" /></button>
                    <button onClick={() => openHistoryModal(prof)} className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all" title="View Story"><History className="w-3.5 h-3.5" /></button>
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

      
      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedViewProfile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsViewModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Profile Details</h2>
                </div>
                <button 
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Name</label><div className="font-semibold text-slate-800">{selectedViewProfile.name}</div></div>
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Designation</label><div className="font-semibold text-slate-800">{selectedViewProfile.designation}</div></div>
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Email ID</label><div className="font-semibold text-slate-800">{selectedViewProfile.email}</div></div>
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Mobile No</label><div className="font-semibold text-slate-800">{selectedViewProfile.mobile}</div></div>
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Recruiter</label><div className="font-semibold text-slate-800">{selectedViewProfile.recruiter}</div></div>
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Job Code</label><div className="font-semibold text-slate-800">{selectedViewProfile.jobCode}</div></div>
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Interview Date</label><div className="font-semibold text-slate-800">{selectedViewProfile.interviewDate} {selectedViewProfile.interviewTime}</div></div>
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Rating</label><div className="mt-1">{renderStars(selectedViewProfile.rating)}</div></div>
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Status</label><div className="mt-1"><span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold shrink-0 ${getStatusColor(selectedViewProfile.status)}`}>{selectedViewProfile.status}</span></div></div>
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Created Date</label><div className="font-semibold text-slate-800">{selectedViewProfile.createdDate}</div></div>
                  <div className="col-span-2"><label className="text-xs font-bold text-slate-400 uppercase">Meeting URL</label><div className="font-semibold text-blue-600 break-all"><a href={selectedViewProfile.meetingUrl} target="_blank">{selectedViewProfile.meetingUrl}</a></div></div>
                  <div className="col-span-2"><label className="text-xs font-bold text-slate-400 uppercase">Recording URL</label><div className="font-semibold text-purple-600 break-all"><a href={selectedViewProfile.recordingUrl} target="_blank">{selectedViewProfile.recordingUrl}</a></div></div>
                </div>
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
                  <div className="overflow-x-auto min-h-[400px] pb-32">
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
      {/* Feedback Report Modal */}
      <AnimatePresence>
        {isFeedbackModalOpen && selectedFeedbackProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFeedbackModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[1000px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: '90vh' }}
            >
              {/* Header block spanning full width */}
              <div className="bg-slate-50 border-b border-slate-200 shrink-0">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60">
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">Feedback Report</h2>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="relative group cursor-pointer flex items-center justify-center h-10 min-w-[40px] max-w-[120px] rounded-xl overflow-hidden">
                        <img 
                          src={vendorLogoUrl}
                          alt="Vendor Logo" 
                          className="h-full w-auto object-contain"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleLogoUpload}
                        />
                      </label>
                    </div>
                    
                    <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                    
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="Download PDF">
                        <FileText className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="Download Image">
                        <Download className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setIsFeedbackModalOpen(false)}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
                  <div className="flex items-center gap-6 z-10 w-full md:w-auto">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-white shadow-sm border-4 border-blue-500/20 flex items-center justify-center relative shrink-0 text-3xl font-black text-blue-600">
                      {selectedFeedbackProfile.name.charAt(0)}
                    </div>
                    {/* Info */}
                    <div className="flex flex-col gap-1 w-full md:w-64">
                      <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest">{selectedFeedbackProfile.name}</h3>
                      <div className="h-px w-full bg-slate-200 my-1"></div>
                      <div className="flex items-center gap-2 text-xs text-slate-600"><Phone className="w-3.5 h-3.5 text-slate-400"/> {selectedFeedbackProfile.mobile}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-600"><Mail className="w-3.5 h-3.5 text-slate-400"/> {selectedFeedbackProfile.email}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-600"><MapPin className="w-3.5 h-3.5 text-slate-400"/> Bangalore, India</div>
                    </div>
                  </div>

                  <div className="h-20 w-px bg-slate-200 hidden md:block"></div>

                  <div className="flex items-center justify-center z-10">
                    <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-[6px] border-slate-200">
                      {/* Fake Doughnut Chart overlay */}
                      <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="289" strokeDashoffset="208" strokeLinecap="round" />
                      </svg>
                      <span className="text-xl font-black text-blue-600">28%</span>
                    </div>
                  </div>

                  <div className="h-20 w-px bg-slate-200 hidden md:block"></div>

                  <div className="flex flex-col gap-3 z-10">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="p-1 rounded bg-blue-100 text-blue-600"><Video className="w-4 h-4"/></div>
                      <span className="font-semibold text-slate-700">Recording</span>
                      <span className="text-slate-500 font-mono text-xs">({selectedFeedbackProfile.recordingPasscode})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="p-1 rounded bg-green-100 text-green-600"><ShieldCheck className="w-4 h-4"/></div>
                      <span className="text-slate-600">Is Genuine : <span className="font-bold text-slate-900">Yes</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="p-1 rounded bg-slate-200 text-slate-500"><ThumbsDown className="w-4 h-4"/></div>
                      <span className="text-slate-600">Recommend For Next Round : <span className="font-bold text-slate-900">No</span></span>
                    </div>
                  </div>
                </div>

                </div>

              {/* Scrollable Body (Custom Scrollbar) */}
              <div className="p-6 overflow-y-auto bg-slate-50 flex-1 min-h-0 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 transition-colors">
                
                {/* Recap */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm shrink-0">
                  <div className="bg-slate-100/50 px-5 py-3 border-b border-slate-100 font-bold text-slate-800">
                    Quick Recap of Interview
                  </div>
                  <div className="p-5 text-sm text-slate-600 leading-relaxed block">
                    This was a technical interview between Nisheeth and Alekhya for a software development position. Alekhya presented her 12-13 years of experience spanning UI development, backend development, mobile applications, and cloud technologies, with expertise in JavaScript, Java, React, Angular, and Azure. The discussion covered her experience with microservices architecture, where she explained working with Kubernetes in Azure and using event hubs and service bus for microservice communication. Alekhya described her work with AI tools including CodeWhisperer, detailing how they review and validate generated code to ensure alignment with architecture and design standards.
                  </div>
                </div>

                {/* Ratings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                  {/* Technical Rating */}
                  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
                    <div className="bg-white px-6 py-5 flex justify-between items-center shrink-0 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Code className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-800 text-lg tracking-tight">Technical Rating</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xl font-bold text-rose-500 tracking-tight">1.4</span>
                        <span className="text-sm font-bold text-slate-400">/ 5</span>
                      </div>
                    </div>
                    <div className="p-5 grid gap-3 bg-slate-50/50 flex-1">
                      {[
                        { title: "Java 8 and Above", desc: "She doesn't know anything in Java just knows some definition", score: 1 },
                        { title: "Spring Boot and Spring Security", desc: "She hasn't worked on spring springboot and security", score: 1 },
                        { title: "RESTful APIs", desc: "She hasn't worked on restful webservice and has not worked on anything", score: 1 },
                        { title: "Microservices Architecture", desc: "Minimal exposure.", score: 1 }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 group">
                          <div className="flex justify-between items-start gap-4">
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                            <div className="flex gap-0.5 shrink-0 mt-0.5" title={`Score: ${item.score} / 5`}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`w-4 h-4 ${star <= item.score ? (item.score >= 4 ? 'fill-emerald-400 text-emerald-400' : item.score >= 3 ? 'fill-amber-400 text-amber-400' : 'fill-rose-400 text-rose-400') : 'fill-slate-100 text-slate-200'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Soft Skill Rating */}
                  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col h-fit">
                    <div className="bg-white px-6 py-5 flex justify-between items-center shrink-0 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-800 text-lg tracking-tight">Soft Skill Rating</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xl font-bold text-emerald-500 tracking-tight">3.6</span>
                        <span className="text-sm font-bold text-slate-400">/ 5</span>
                      </div>
                    </div>
                    <div className="p-5 grid gap-3 bg-slate-50/50 flex-1">
                      {[
                        { title: "English Communication", desc: "Good", score: 4 },
                        { title: "Attitude", desc: "Good", score: 4 },
                        { title: "Interpersonal Skill Communication", desc: "Average", score: 3 }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 group">
                          <div className="flex justify-between items-start gap-4">
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                            <div className="flex gap-0.5 shrink-0 mt-0.5" title={`Score: ${item.score} / 5`}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`w-4 h-4 ${star <= item.score ? (item.score >= 4 ? 'fill-emerald-400 text-emerald-400' : item.score >= 3 ? 'fill-amber-400 text-amber-400' : 'fill-rose-400 text-rose-400') : 'fill-slate-100 text-slate-200'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm shrink-0">
                  <div className="bg-slate-100/50 px-5 py-3 border-b border-slate-100 font-bold text-slate-800">
                    Summary of the Discussion
                  </div>
                  <div className="p-5 space-y-6 overflow-y-auto max-h-[300px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 transition-colors">
                    <div className="block">
                      <h4 className="text-sm font-bold text-slate-800 mb-1.5">Technical Interview with Alekhya</h4>
                      <p className="text-sm text-slate-600 leading-relaxed break-words">Nisheeth conducted an interview with Alekhya, starting with verification of her government ID. Alekhya presented her 13-year experience across UI development, backend, mobile apps, and cloud technologies including Azure and AWS. When discussing Java experience, Alekhya confirmed 4 years of JavaScript experience and mentioned knowledge of Spring Boot and microservices architecture. The interview ended with Nisheeth asking Alekhya to explain microservice architecture from her project experience.</p>
                    </div>
                    <div className="h-px bg-slate-100 w-full shrink-0"></div>
                    <div className="shrink-0">
                      <h4 className="text-sm font-bold text-slate-800 mb-1.5">Microservices Architecture Experience Discussion</h4>
                      <p className="text-sm text-slate-600 leading-relaxed break-words">Alekhya discussed her experience with microservices architecture, explaining that their project consists of multiple microservices deployed individually in Kubernetes in Azure, with communication handled through Event Hubs and Service Bus. When asked about specific design patterns, Alekhya mentioned limited exposure to event-driven architecture but was unsure about the technical implementation details. She also noted her transition from traditional Java development to AI tools like ChatGPT in her current role.</p>
                    </div>
                    <div className="h-px bg-slate-100 w-full shrink-0"></div>
                    <div className="shrink-0">
                      <h4 className="text-sm font-bold text-slate-800 mb-1.5">CoPilot Code Verification Process</h4>
                      <p className="text-sm text-slate-600 leading-relaxed break-words">Nisheeth discussed the process of verifying code generated by CoPilot for new projects and existing codebases, emphasizing the importance of aligning it with architecture and design standards. Alekhya explained that they review the code for alignment with their architecture and design systems, including UI components, before merging it. Nisheeth raised a concern about reviewing complex architectural patterns like event-driven architecture or saga design patterns without prior knowledge, to which Alekhya responded that they can use CoPilot's multiple agents and multitasking features to learn and understand the code during the review process.</p>
                    </div>
                    <div className="h-px bg-slate-100 w-full shrink-0"></div>
                    <div className="shrink-0">
                      <h4 className="text-sm font-bold text-slate-800 mb-1.5">Agent Insights Translation Development Update</h4>
                      <p className="text-sm text-slate-600 leading-relaxed break-words">Alekhya discussed her work on Agent Insights, a translation agent they developed as a POC to reduce translation costs in their applications. The agent can automatically translate content when developers make changes to EN.JSON files and includes both PR-based and portal-based translation options. Alekhya also mentioned her technical comfort with Java, including OOP concepts, inheritance, interfaces, abstract methods, and microservices development.</p>
                    </div>
                    <div className="h-px bg-slate-100 w-full shrink-0"></div>
                    <div className="shrink-0">
                      <h4 className="text-sm font-bold text-slate-800 mb-1.5">Microservices and Data Structures Discussion</h4>
                      <p className="text-sm text-slate-600 leading-relaxed break-words">Alekhya discussed her experience with microservices in both backend and frontend development, and confirmed she has knowledge of Stream API in Java though not extensive. She explained the differences between ArrayList and LinkedList, noting that ArrayList is faster for reading operations while LinkedList is better for frequent insertions and deletions. Nisheeth asked if Alekhya had mostly worked on the UI side at Sims, though this question was not fully answered in the transcript.</p>
                    </div>
                    <div className="h-px bg-slate-100 w-full shrink-0"></div>
                    <div className="shrink-0">
                      <h4 className="text-sm font-bold text-slate-800 mb-1.5">Micro-Frontend Architecture Overview</h4>
                      <p className="text-sm text-slate-600 leading-relaxed break-words">Alekhya explained micro-frontend architecture, comparing it to microservices in the backend. She described how different modules (like admin, contacts, and settings) can be created as separate UI components that can be built, deployed, and maintained independently. Alekhya explained that this approach prevents issues in one module from affecting the entire frontend system, similar to how microservices work in the backend.</p>
                    </div>
                    <div className="h-px bg-slate-100 w-full shrink-0 my-6"></div>
                    <div className="block">
                      <h4 className="text-sm font-bold text-slate-800 mb-1.5">Angular State Management Interview</h4>
                      <p className="text-sm text-slate-600 leading-relaxed break-words">Nisheeth interviewed Alekhya about Angular state management and technical experience. Alekhya explained her experience with React state management using Redux and demonstrated knowledge of implementing auto-suggest functionality in both React and Angular using state, useEffect, and RxJS operators. Alekhya also discussed her experience with Azure cloud platforms, including event hubs, Azure functions, notification hubs, service buses, key vaults, and OpenAI services. Nisheeth concluded the interview by informing Alekhya that HR would follow up with next steps in the process.</p>
                    </div>
                  </div>
                </div>

                {/* Interviewer Comments */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-6 shrink-0">
                  <div className="bg-slate-100/50 px-5 py-3 border-b border-slate-100 font-bold text-slate-800">
                    Interviewer Comments
                  </div>
                  <div className="p-5 text-sm text-slate-600 font-medium block">
                    She has not worked on Java j2ee and related frameworks. not worked on spring springboot. Mostly written code with ai. Overall not good for next round
                  </div>
                </div>

                <div className="mt-2 mb-4 text-center shrink-0">
                  <a href="https://www.iaminterviewed.com" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-500 transition-colors font-medium">
                    (www.iaminterviewed.com)
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

