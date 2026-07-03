import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SearchableSelect } from "../../components/SearchableSelect";
import { 
  Search, 
  Eye, 
  History, 
  Download, 
  RefreshCw, 
  FileSpreadsheet,
  LayoutList,
  UserPlus,
  Building,
  User,
  Calendar,
  X,
  AlertCircle,
  Phone,
  Mail,
  Star,
  Video,
  Upload,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockCandidates = Array.from({ length: 15 }).map((_, i) => ({
  id: `CAN-00${i + 1}`,
  jobCode: `REQ-00${Math.floor(Math.random() * 8) + 1}`,
  company: ["TCS", "Wipro", "Infosys", "HCL"][i % 4],
  recruiter: ["Sarah Jenkins", "David Chen", "Michael Ross", "Emily Wang"][i % 4],
  name: ["Alice Johnson", "Bob Smith", "Charlie Davis", "Diana Evans", "Ethan Wright"][i % 5],
  email: `candidate${i+1}@example.com`,
  mobile: `+1 (555) 010-${Math.floor(1000 + Math.random() * 9000)}`,
  createdDate: `${Math.floor(Math.random() * 28) + 1} Oct 2026`,
  vendor: ["Alpha Staffing", "Beta Recruits", "Gamma Solutions"][i % 3],
  meetingUrl: "https://meet.google.com/abc-defg-hij",
  interviewDate: `${Math.floor(Math.random() * 28) + 1} Nov 2026`,
  rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
  status: ["Pending", "Shortlisted", "Rejected", "Hired"][i % 4],
  history: [
    { id: 1, date: "10 Oct 2026", status: "Profile Added", comments: "Vendor submitted profile." },
    { id: 2, date: "12 Oct 2026", status: "Interview Scheduled", comments: "L1 Technical round scheduled." },
    { id: 3, date: "15 Oct 2026", status: "Feedback Received", comments: "Strong technical skills, proceeding to next round." },
  ]
}));

export default function AccountManagerAddProfiles() {
  const [candidates, setCandidates] = useState(mockCandidates);
  
  // Filter states
  const [filterCompany, setFilterCompany] = useState("");
  const [filterRecruiter, setFilterRecruiter] = useState("");
  const [filterJobCode, setFilterJobCode] = useState("");

  // Modal states
  const [activeModal, setActiveModal] = useState<"view" | "history" | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  // New modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "card">("grid");
  
  // Add Candidate Form State
  const [addFormVendor, setAddFormVendor] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const filteredCandidates = useMemo(() => {
    return candidates.filter(cand => {
      const matchCompany = filterCompany ? cand.company === filterCompany : true;
      const matchRecruiter = filterRecruiter ? cand.recruiter === filterRecruiter : true;
      const matchJobCode = filterJobCode ? cand.jobCode === filterJobCode : true;
      return matchCompany && matchRecruiter && matchJobCode;
    });
  }, [candidates, filterCompany, filterRecruiter, filterJobCode]);

  const openModal = (type: "view" | "history", candidate: any) => {
    setSelectedCandidate(candidate);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedCandidate(null);
  };

  const handleDownloadResume = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    // Simulate download
    alert(`Downloading resume for candidate ${id}...`);
  };

  const STATUS_COLORS: Record<string, string> = {
    "Pending": "bg-slate-100 text-slate-700 border-slate-200",
    "Shortlisted": "bg-blue-50 text-blue-700 border-blue-200",
    "Hired": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Rejected": "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Add Profiles</h1>
          <p className="text-slate-500 mt-1">Manage and track candidate profiles for company requirements</p>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
          <Search className="w-4 h-4" /> Filter Profiles
        </h3>
        <div className="flex flex-col md:flex-row gap-4 items-end justify-between flex-wrap">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="w-full md:w-56 shrink-0">
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Company</label>
              <SearchableSelect
                value={filterCompany}
                onChange={setFilterCompany}
                placeholder="Select Company"
                options={[
                  { value: "", label: "All Companies" },
                  { value: "TCS", label: "TCS" },
                  { value: "Wipro", label: "Wipro" },
                  { value: "Infosys", label: "Infosys" },
                  { value: "HCL", label: "HCL" }
                ]}
                className="h-[42px]"
              />
            </div>
            <div className="w-full md:w-56 shrink-0">
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Recruiter</label>
              <SearchableSelect
                value={filterRecruiter}
                onChange={setFilterRecruiter}
                placeholder="Select Recruiter"
                options={[
                  { value: "", label: "All Recruiters" },
                  { value: "Sarah Jenkins", label: "Sarah Jenkins" },
                  { value: "David Chen", label: "David Chen" },
                  { value: "Michael Ross", label: "Michael Ross" },
                  { value: "Emily Wang", label: "Emily Wang" }
                ]}
                className="h-[42px]"
              />
            </div>
            <div className="w-full md:w-48 shrink-0">
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Job Code</label>
              <SearchableSelect
                value={filterJobCode}
                onChange={setFilterJobCode}
                placeholder="Select Job Code"
                options={[
                  { value: "", label: "All Job Codes" },
                  ...Array.from({length: 8}).map((_,i) => ({ value: `REQ-00${i+1}`, label: `REQ-00${i+1}` }))
                ]}
                className="h-[42px]"
              />
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto shrink-0 mt-2 md:mt-0">
            <button 
              onClick={() => {
                setFilterCompany("");
                setFilterRecruiter("");
                setFilterJobCode("");
              }}
              className="h-[42px] px-4 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 rounded-xl flex justify-center items-center font-bold text-sm transition-colors border border-slate-200" 
            >
              Reset
            </button>
            <button className="h-[42px] px-6 bg-primary text-white font-bold rounded-xl flex justify-center items-center text-sm shadow-sm hover:bg-primary/90 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-sm font-bold transition-colors border border-emerald-100"
            onClick={() => alert("Exporting to Excel...")}
          >
            <FileSpreadsheet className="w-4 h-4" /> Export to Excel
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-sm font-bold transition-colors border border-blue-100"
            onClick={() => setIsSummaryModalOpen(true)}
          >
            <LayoutList className="w-4 h-4" /> Summary
          </button>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode("card")}
              className={cn(
                "p-1.5 rounded-lg transition-colors flex items-center justify-center",
                viewMode === "card" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-lg transition-colors flex items-center justify-center",
                viewMode === "grid" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={() => {
              setFilterCompany("");
              setFilterRecruiter("");
              setFilterJobCode("");
            }}
            className="w-[40px] h-[40px] shrink-0 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 rounded-xl flex justify-center items-center transition-colors border border-slate-200" 
            title="Reload Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-primary text-white hover:bg-primary/90 rounded-xl text-sm font-bold transition-colors shadow-sm shadow-primary/20"
            onClick={() => setIsAddModalOpen(true)}
          >
            <UserPlus className="w-4 h-4" /> Add Candidate
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "grid" ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Candidate Name</th>
                <th className="px-6 py-4">Vendor</th>
                <th className="px-6 py-4">Interview Date</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.length > 0 ? filteredCandidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">{cand.name}</span>
                      <span className="text-[11px] font-medium text-slate-500 mt-0.5">{cand.jobCode} • {cand.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-400" />
                      {cand.vendor}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {cand.interviewDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-slate-700">{cand.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 text-xs font-bold rounded-lg border",
                      STATUS_COLORS[cand.status]
                    )}>
                      {cand.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openModal("view", cand)}
                        className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openModal("history", cand)}
                        className="p-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        title="View History"
                      >
                        <History className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => handleDownloadResume(e, cand.id)}
                        className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                        title="Download Resume"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                    No candidates found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCandidates.length > 0 ? filteredCandidates.map((cand) => (
            <motion.div 
              key={cand.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{cand.name}</h3>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 mt-1">
                      {cand.jobCode} • {cand.company}
                    </div>
                  </div>
                  <span className={cn(
                    "px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase tracking-wider",
                    STATUS_COLORS[cand.status]
                  )}>
                    {cand.status}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Building className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium">Vendor: <span className="text-slate-800">{cand.vendor}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium">Interview: <span className="text-slate-800">{cand.interviewDate}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                    <span className="font-medium">Rating: <span className="text-slate-800">{cand.rating}</span></span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50/80 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{cand.id}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openModal("view", cand)}
                    className="p-1.5 text-blue-600 bg-white border border-blue-100 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openModal("history", cand)}
                    className="p-1.5 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
                    title="View History"
                  >
                    <History className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => handleDownloadResume(e, cand.id)}
                    className="p-1.5 text-emerald-600 bg-white border border-emerald-100 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Download Resume"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-12 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200">
              No candidates found matching your criteria.
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {activeModal && selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "relative w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]",
                activeModal === "history" ? "max-w-lg" : "max-w-2xl"
              )}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    {activeModal === "view" && <User className="w-5 h-5 text-blue-500" />}
                    {activeModal === "history" && <History className="w-5 h-5 text-slate-500" />}
                    {activeModal === "view" ? "Candidate Profile" : "Profile History"}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{selectedCandidate.name} ({selectedCandidate.id})</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* View Modal Content */}
              {activeModal === "view" && (
                <div className="p-6 overflow-y-auto space-y-8">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> Email ID</p>
                        <p className="font-semibold text-slate-800">{selectedCandidate.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> Mobile No</p>
                        <p className="font-semibold text-slate-800">{selectedCandidate.mobile}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Created Date</p>
                        <p className="font-semibold text-slate-800">{selectedCandidate.createdDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Building className="w-3.5 h-3.5"/> Vendor Source</p>
                        <p className="font-semibold text-slate-800">{selectedCandidate.vendor}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interview Info */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Application & Interview Status</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">Job Code / Company</p>
                        <p className="font-semibold text-slate-800">{selectedCandidate.jobCode} • {selectedCandidate.company}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">Recruiter</p>
                        <p className="font-semibold text-slate-800">{selectedCandidate.recruiter}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Interview Date</p>
                        <p className="font-semibold text-slate-800">{selectedCandidate.interviewDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Video className="w-3.5 h-3.5"/> Meeting URL</p>
                        <a href={selectedCandidate.meetingUrl} className="font-semibold text-blue-600 hover:underline line-clamp-1">{selectedCandidate.meetingUrl}</a>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Star className="w-3.5 h-3.5"/> Final Rating</p>
                        <p className="font-semibold text-slate-800">{selectedCandidate.rating} / 5.0</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">Current Status</p>
                        <span className={cn(
                          "inline-block px-2.5 py-1 text-xs font-bold rounded-lg border mt-1",
                          STATUS_COLORS[selectedCandidate.status]
                        )}>
                          {selectedCandidate.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* History Modal Content */}
              {activeModal === "history" && (
                <div className="p-6 overflow-y-auto">
                  <div className="space-y-6">
                    {selectedCandidate.history.map((item: any) => (
                      <div key={item.id} className="relative pl-6 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-100" />
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" /> {item.date}
                            </span>
                            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg bg-blue-100 text-blue-700">
                              {item.status}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <p className="text-sm text-slate-700 font-medium leading-relaxed">
                              {item.comments}
                            </p>
                          </div>
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

      {/* Add Candidate Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-primary" /> Add Candidate
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">Enter new candidate details below.</p>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Candidate Name</label>
                  <input type="text" placeholder="Enter full name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Email ID / User Name</label>
                  <input type="email" placeholder="Enter email address" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Mobile No</label>
                    <input type="tel" placeholder="Enter mobile number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Vendor</label>
                    <SearchableSelect
                      value={addFormVendor}
                      onChange={setAddFormVendor}
                      placeholder="Search Vendor..."
                      options={[
                        { value: "", label: "Select Vendor" },
                        { value: "Alpha Staffing", label: "Alpha Staffing" },
                        { value: "Beta Recruits", label: "Beta Recruits" },
                        { value: "Gamma Solutions", label: "Gamma Solutions" }
                      ]}
                      className="h-[46px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Upload Resume</label>
                  <div className="relative w-full">
                    <input 
                      type="file" 
                      id="resume-upload" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                    />
                    <label 
                      htmlFor="resume-upload" 
                      className={cn(
                        "flex items-center gap-3 w-full px-4 py-3 bg-slate-50 border border-slate-200 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 transition-colors",
                        selectedFile ? "border-primary bg-primary/5" : ""
                      )}
                    >
                      <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                        <Upload className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-700 truncate">
                          {selectedFile ? selectedFile.name : "Click to upload file"}
                        </p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">
                          {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "PDF, DOC, DOCX up to 10MB"}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                >
                  Save Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Summary Modal */}
      <AnimatePresence>
        {isSummaryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSummaryModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Profiles Summary Report</h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">Overview of candidates by company</p>
                </div>
                <button 
                  onClick={() => setIsSummaryModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-6 pt-4 pb-6 overflow-y-auto space-y-3">
                {/* Date Range Selector */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <Calendar className="w-4 h-4 text-primary" />
                    Date Range
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="date" 
                      className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                      defaultValue={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 
                    />
                    <span className="text-sm font-medium text-slate-500">to</span>
                    <input 
                      type="date" 
                      className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                      defaultValue={new Date().toISOString().split('T')[0]} 
                    />
                    <button className="ml-2 px-4 py-1.5 bg-primary text-white text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all">
                      Search
                    </button>
                  </div>
                </div>

                {/* Grid Data */}
                <div className="overflow-x-auto border border-slate-100 rounded-xl">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                      <tr>
                        <th className="px-4 py-3 leading-tight">No of Profiles<br />Received</th>
                        <th className="px-4 py-3 leading-tight">No of Interviews<br />Completed</th>
                        <th className="px-4 py-3 leading-tight">No of Interviews<br />Scheduled</th>
                        <th className="px-4 py-3 leading-tight">Candidates<br />(3+ Rating)</th>
                        <th className="px-4 py-3 leading-tight">Candidates<br />(2.5-2.9 Rating)</th>
                        <th className="px-4 py-3 leading-tight">No of<br />No Responses</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <tr key={item} className="hover:bg-slate-50/50 transition-colors font-semibold text-slate-700">
                          <td className="px-4 py-4">{Math.floor(Math.random() * 50) + 20}</td>
                          <td className="px-4 py-4">{Math.floor(Math.random() * 30) + 10}</td>
                          <td className="px-4 py-4">{Math.floor(Math.random() * 20) + 5}</td>
                          <td className="px-4 py-4 text-emerald-600">{Math.floor(Math.random() * 15) + 5}</td>
                          <td className="px-4 py-4 text-amber-600">{Math.floor(Math.random() * 10) + 2}</td>
                          <td className="px-4 py-4 text-rose-600">{Math.floor(Math.random() * 5)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination */}
                  <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 sm:px-6 bg-slate-50/50 rounded-b-xl">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-slate-500">
                          Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">5</span> of{' '}
                          <span className="font-medium text-slate-900">24</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm" aria-label="Pagination">
                          <button className="relative inline-flex items-center rounded-l-lg px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 transition-colors">
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">1</button>
                          <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 transition-colors">2</button>
                          <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 transition-colors">3</button>
                          <button className="relative inline-flex items-center rounded-r-lg px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 transition-colors">
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
