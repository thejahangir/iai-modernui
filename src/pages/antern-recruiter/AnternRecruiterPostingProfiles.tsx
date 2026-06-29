import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download,
  RefreshCw,
  PieChart,
  UserPlus,
  Eye,
  Calendar,
  History,
  FileText,
  Star,
  CalendarClock,
  FileEdit,
  ChevronDown,
  X,
  Clock,
  Video,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  UploadCloud,
  Users,
  FileCheck,
  Target,
  AlertCircle,
  MessageSquare,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchableSelect } from "../../components/SearchableSelect";

// Mock Data
const MOCK_PROFILES = Array.from({ length: 15 }).map((_, i) => {
  const statuses = ["Scheduled", "Pending", "Completed", "Selected", "Rejected"];
  return {
    id: `PROF-${2000 + i}`,
    name: ["Aarav Sharma", "Priya Patel", "Vikram Singh", "Neha Gupta"][i % 4],
    email: `candidate${i}@example.com`,
    mobile: `+91 98765${40000 + i}`,
    createdDate: `2026-10-${(i % 28) + 1}`,
    interviewDate: `2026-11-${(i % 28) + 1}`,
    vendor: ["TechSource", "HireRight", "Internal", "QuickStaff"][i % 4],
    rating: i % 3 === 0 ? 0 : Math.floor(Math.random() * 5) + 1,
    status: statuses[i % statuses.length],
    meetingUrl: `https://meet.google.com/abc-defg-hij`,
  };
});

const STATUS_COLORS = {
  "Scheduled": "bg-blue-50 text-blue-600 border-blue-200",
  "Pending": "bg-amber-50 text-amber-600 border-amber-200",
  "Completed": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Selected": "bg-purple-50 text-purple-600 border-purple-200",
  "Rejected": "bg-rose-50 text-rose-600 border-rose-200",
};

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

const MOCK_HISTORY = Array.from({ length: 5 }).map((_, i) => ({
  id: `HIST-${i}`,
  statusName: ["Scheduled", "Technical Round 1", "HR Round"][i % 3],
  followUpDate: `2026-10-1${i}`,
  createdDate: `2026-10-0${i + 1}`,
  comments: "Candidate progressed to the next stage successfully."
}));

const mockEscalationHistory = [
  { id: 1, date: "14 Oct 2026", status: "Medium", comments: "Not receiving enough quality profiles for this role." },
  { id: 2, date: "15 Oct 2026", status: "High", comments: "Still waiting on vendor responses. Requirement is critical." },
  { id: 3, date: "16 Oct 2026", status: "Resolved", comments: "Vendor strategy updated. New profiles expected by Friday." },
  { id: 4, date: "18 Oct 2026", status: "Medium", comments: "Profiles received but do not match the required skill set." },
  { id: 5, date: "20 Oct 2026", status: "Resolved", comments: "Conducted a sync with the recruitment team to recalibrate the requirement." },
];

export default function AnternRecruiterPostingProfiles() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  
  // Modals state
  const [viewProfileModal, setViewProfileModal] = useState<any>(null);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [addCandidateModalOpen, setAddCandidateModalOpen] = useState(false);

  // Status Modal form state
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedStatusProfile, setSelectedStatusProfile] = useState<any>(null);
  const [statusUpdateData, setStatusUpdateData] = useState({ status: "", nextFollowUp: "", comments: "" });
  const [isConfirmingStatusUpdate, setIsConfirmingStatusUpdate] = useState(false);
  
  // Schedule Modal form state
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedScheduleProfile, setSelectedScheduleProfile] = useState<any>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isConfirmingReschedule, setIsConfirmingReschedule] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({ date: "", time: "" });

  // History Modal form state
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedHistoryProfile, setSelectedHistoryProfile] = useState<any>(null);
  const [historyPage, setHistoryPage] = useState(1);
  const historyItemsPerPage = 5;

  // Add Candidate form state
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addMobile, setAddMobile] = useState("");
  const [addVendor, setAddVendor] = useState("");
  const [addResume, setAddResume] = useState<File | null>(null);

  // Escalation form state
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [escalationTab, setEscalationTab] = useState<"history" | "add">("history");
  const [newEscalationStatus, setNewEscalationStatus] = useState("High");
  const [escalationFollowUpDate, setEscalationFollowUpDate] = useState("");
  const [escalationComments, setEscalationComments] = useState("");
  const [escalationError, setEscalationError] = useState("");

  const handleSubmitEscalation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEscalationStatus) {
      setEscalationError("Please select a status level");
      return;
    }
    setShowEscalationModal(false);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(profiles.length / itemsPerPage);
  const paginatedProfiles = profiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExport = () => alert("Exporting data to Excel...");
  const handleReload = () => setProfiles([...MOCK_PROFILES]);
  const handleAddCandidate = () => setAddCandidateModalOpen(true);

  const handleDownloadResume = (e: React.MouseEvent, profileName: string) => {
    e.preventDefault();
    const element = document.createElement("a");
    const file = new Blob(["Mock resume content for " + profileName], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${profileName.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header & CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate("/dashboard/antern-recruiter/postings")}
            className="flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Postings
          </button>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold font-heading text-foreground flex items-center gap-2"
          >
            Profiles <span className="text-slate-400 font-normal text-lg">({id || "REQ-001"})</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-1 font-medium"
          >
            Manage candidates for this specific requirement.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-wrap items-center gap-2"
        >
          <button 
            onClick={handleExport}
            className="flex items-center justify-center w-[42px] h-[42px] bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors shadow-sm"
            title="Export to Excel"
          >
            <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={handleReload}
            className="flex items-center justify-center w-[42px] h-[42px] bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
            title="Reload Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setSummaryModalOpen(true)}
            className="flex items-center gap-2 px-4 h-[42px] bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            <PieChart className="w-4 h-4 text-purple-500" />
            <span className="hidden sm:inline">Summary</span>
          </button>
          <button 
            onClick={handleAddCandidate}
            className="flex items-center gap-2 px-4 h-[42px] bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Candidate</span>
          </button>
        </motion.div>
      </div>

      {/* Candidate Pipeline Flow */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border/50 shadow-sm"
      >
        <div className="flex items-center w-full md:w-auto overflow-x-auto pb-2 md:pb-0" style={{ scrollbarWidth: 'none' }}>
          {[
            { label: "Related Profiles", icon: Users, value: "124", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-200", path: "related" },
            { label: "Applied Profiles", icon: FileCheck, value: "68", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-200", path: "applied" },
            { label: "Shortlisted Profiles", icon: Target, value: "24", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-200", path: "shortlisted" },
          ].map((item, idx, arr) => (
            <div key={idx} className="flex items-center shrink-0">
              <button 
                onClick={() => navigate(`/dashboard/antern-recruiter/postings/${id}/candidates/${item.path}`)}
                className="flex flex-col items-center justify-center gap-1.5 group px-2 sm:px-4 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-full border border-transparent group-hover:${item.border} flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold font-heading text-foreground leading-none group-hover:text-primary transition-colors">{item.value}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1 group-hover:text-slate-700 transition-colors">{item.label}</span>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="h-12 w-px bg-slate-200 hidden md:block mx-2"></div>

        <button 
          onClick={() => setShowEscalationModal(true)}
          className="flex items-center justify-center gap-2.5 w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100 hover:border-rose-300 hover:shadow-md hover:shadow-rose-100 transition-all group shrink-0 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-rose-400/10 to-rose-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <AlertCircle className="w-5 h-5 text-rose-500 group-hover:animate-bounce" />
          <span className="font-bold text-sm tracking-wide text-rose-700">Escalations</span>
        </button>
      </motion.div>

      {/* Data Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
      >
        {profiles.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Video className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No candidates found for this posting.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-widest">Candidate Name</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Interview Date</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Vendor</th>
                  <th className="px-6 py-4 font-bold tracking-widest text-center">Rating</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Status</th>
                  <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedProfiles.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{p.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{p.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {p.interviewDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 font-medium rounded-md text-[11px]">
                        {p.vendor}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className={cn(
                              "w-4 h-4", 
                              star <= p.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                            )} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("px-2.5 py-1 rounded-md text-[11px] font-bold border", STATUS_COLORS[p.status as keyof typeof STATUS_COLORS] || "bg-slate-50 text-slate-600 border-slate-200")}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => setViewProfileModal(p)} className="p-1.5 text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors" title="View Profile">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => { 
                          setSelectedStatusProfile(p);
                          setIsConfirmingStatusUpdate(false);
                          setStatusUpdateData({ status: p.status, nextFollowUp: "", comments: "" });
                          setStatusModalOpen(true);
                        }} className="p-1.5 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors" title="Update Status">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button onClick={() => {
                          setSelectedScheduleProfile(p);
                          setIsRescheduling(false);
                          setIsConfirmingReschedule(false);
                          setRescheduleData({ date: p.interviewDate, time: p.interviewTime || "10:00 - 10:30" });
                          setScheduleModalOpen(true);
                        }} className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors" title="Schedule Interview">
                          <Clock className="w-4 h-4" />
                        </button>
                        <button onClick={() => {
                          setSelectedHistoryProfile(p);
                          setHistoryPage(1);
                          setHistoryModalOpen(true);
                        }} className="p-1.5 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors" title="View History">
                          <History className="w-4 h-4" />
                        </button>
                        <button onClick={(e) => handleDownloadResume(e, p.name)} className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Download Resume">
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && profiles.length > 0 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, profiles.length)}</span> of <span className="font-medium text-slate-900">{profiles.length}</span> results
          </p>
          <div className="flex gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {/* View Profile Modal */}
        {viewProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 font-heading">Candidate Details</h2>
                <button onClick={() => setViewProfileModal(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                    {viewProfileModal.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{viewProfileModal.name}</h3>
                    <p className="text-sm font-medium text-slate-500">{viewProfileModal.id}</p>
                  </div>
                  <div className="ml-auto">
                    <span className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border", STATUS_COLORS[viewProfileModal.status as keyof typeof STATUS_COLORS] || "bg-slate-50 text-slate-600 border-slate-200")}>
                      {viewProfileModal.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Email ID</label>
                    <p className="flex items-center gap-2 text-sm font-medium text-slate-700"><Mail className="w-4 h-4 text-slate-400" /> {viewProfileModal.email}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Mobile Number</label>
                    <p className="flex items-center gap-2 text-sm font-medium text-slate-700"><Phone className="w-4 h-4 text-slate-400" /> {viewProfileModal.mobile}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Created Date</label>
                    <p className="flex items-center gap-2 text-sm font-medium text-slate-700"><Calendar className="w-4 h-4 text-slate-400" /> {viewProfileModal.createdDate}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Interview Date</label>
                    <p className="flex items-center gap-2 text-sm font-medium text-slate-700"><Clock className="w-4 h-4 text-slate-400" /> {viewProfileModal.interviewDate}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Vendor</label>
                    <p className="flex items-center gap-2 text-sm font-medium text-slate-700"><User className="w-4 h-4 text-slate-400" /> {viewProfileModal.vendor}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={cn("w-4 h-4", star <= viewProfileModal.rating ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Meeting URL</label>
                    <a href={viewProfileModal.meetingUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-primary hover:underline w-fit">
                      <LinkIcon className="w-4 h-4" /> {viewProfileModal.meetingUrl}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Schedule / Reschedule Modal */}
        <AnimatePresence>
          {scheduleModalOpen && selectedScheduleProfile && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setScheduleModalOpen(false)}
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
                      {selectedScheduleProfile.name}
                    </p>
                  </div>
                  <button 
                    onClick={() => setScheduleModalOpen(false)}
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
                          <div className="text-sm text-slate-500">{selectedScheduleProfile.interviewTime || "10:00 - 10:30"}</div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Candidate Rating</label>
                          <div className="mt-1.5 flex items-center">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star key={star} className={cn("w-3.5 h-3.5", star <= selectedScheduleProfile.rating ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Meeting Link</label>
                        <div className="mt-1.5">
                          <a href={selectedScheduleProfile.meetingUrl || "#"} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium break-all">
                            {selectedScheduleProfile.meetingUrl || "https://meet.google.com/xyz-abcd-efg"}
                          </a>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex gap-3">
                        <button 
                          onClick={() => setScheduleModalOpen(false)}
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
                            setScheduleModalOpen(false);
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
          {statusModalOpen && selectedStatusProfile && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setStatusModalOpen(false)}
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
                      {selectedStatusProfile.name}
                    </p>
                  </div>
                  <button 
                    onClick={() => setStatusModalOpen(false)}
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
                            setStatusModalOpen(false);
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
                          onClick={() => setStatusModalOpen(false)}
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
          {historyModalOpen && selectedHistoryProfile && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setHistoryModalOpen(false)}
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
                      {selectedHistoryProfile.name}
                    </p>
                  </div>
                  <button 
                    onClick={() => setHistoryModalOpen(false)}
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

        {/* Summary Modal */}
        {summaryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 font-heading flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-500" />
                  Pipeline Summary
                </h2>
                <button onClick={() => setSummaryModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                  <span className="font-bold text-blue-800 text-sm">Total Candidates</span>
                  <span className="text-lg font-black text-blue-600">{MOCK_PROFILES.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                  <span className="font-bold text-emerald-800 text-sm">Selected</span>
                  <span className="text-lg font-black text-emerald-600">3</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
                  <span className="font-bold text-amber-800 text-sm">Pending Interviews</span>
                  <span className="text-lg font-black text-amber-600">8</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-rose-50/50 border border-rose-100 rounded-xl">
                  <span className="font-bold text-rose-800 text-sm">Rejected</span>
                  <span className="text-lg font-black text-rose-600">4</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Add Candidate Modal */}
        {addCandidateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
                <h2 className="text-xl font-bold text-slate-800 font-heading flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-indigo-500" />
                  Add Candidate
                </h2>
                <button onClick={() => setAddCandidateModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-5 overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Candidate Name <span className="text-rose-500">*</span></label>
                  <input type="text" value={addName} onChange={(e) => setAddName(e.target.value)} placeholder="e.g. John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email ID / Username <span className="text-rose-500">*</span></label>
                  <input type="email" value={addEmail} onChange={(e) => setAddEmail(e.target.value)} placeholder="e.g. john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Mobile Number <span className="text-rose-500">*</span></label>
                    <input type="tel" value={addMobile} onChange={(e) => setAddMobile(e.target.value)} placeholder="+1 234 567 8900" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Vendor</label>
                    <SearchableSelect
                      options={[
                        { value: "TechSource", label: "TechSource" },
                        { value: "HireRight", label: "HireRight" },
                        { value: "Internal", label: "Internal" },
                        { value: "QuickStaff", label: "QuickStaff" }
                      ]}
                      value={addVendor}
                      onChange={setAddVendor}
                      placeholder="Search Vendor..."
                      className="h-[46px]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Upload Resume <span className="text-rose-500">*</span></label>
                  <input 
                    type="file" 
                    id="resume-upload" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setAddResume(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="resume-upload" className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group relative">
                    {addResume ? (
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                          <FileText className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-bold text-slate-700">{addResume.name}</p>
                        <p className="text-xs font-medium text-emerald-500 mt-1">Ready to upload</p>
                        <button 
                          type="button" 
                          onClick={(e) => { e.preventDefault(); setAddResume(null); }} 
                          className="absolute top-4 right-4 p-1.5 text-slate-400 bg-white shadow-sm rounded-full hover:text-rose-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-5 h-5 text-indigo-500" />
                        </div>
                        <p className="text-sm font-bold text-slate-700">Click to upload or drag and drop</p>
                        <p className="text-xs font-medium text-slate-500 mt-1">PDF, DOCX up to 5MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                <button onClick={() => setAddCandidateModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
                <button onClick={() => setAddCandidateModalOpen(false)} className="px-6 py-2.5 text-sm font-bold bg-primary text-white hover:bg-primary/90 rounded-xl shadow-sm transition-colors">Add Candidate</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Escalations Modal */}
      <AnimatePresence>
        {showEscalationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEscalationModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Escalation Manager</h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">Manage escalations for {id || "this posting"}</p>
                </div>
                <button 
                  onClick={() => setShowEscalationModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="px-6 flex gap-6 border-b border-slate-100">
                <button
                  onClick={() => setEscalationTab("history")}
                  className={cn(
                    "py-4 text-sm font-bold border-b-2 transition-colors",
                    escalationTab === "history" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  )}
                >
                  History
                </button>
                <button
                  onClick={() => setEscalationTab("add")}
                  className={cn(
                    "py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5",
                    escalationTab === "add" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Plus className="w-4 h-4" /> Add Escalation
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto">
                {escalationTab === "history" ? (
                  <div className="space-y-6">
                    {mockEscalationHistory.map((item) => (
                      <div key={item.id} className="relative pl-6 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-100" />
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" /> {item.date}
                            </span>
                            <span className={cn(
                              "px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg",
                              item.status === "Resolved" ? "bg-emerald-100 text-emerald-700" :
                              item.status === "High" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                            )}>
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
                ) : (
                  <form onSubmit={handleSubmitEscalation} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-bold text-slate-700">Status Level</label>
                          <AnimatePresence>
                            {escalationError && (
                              <motion.span 
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="text-[11px] text-rose-500 font-medium"
                              >
                                {escalationError}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        <SearchableSelect
                          value={newEscalationStatus}
                          onChange={(val) => {
                            setNewEscalationStatus(val);
                            setEscalationError("");
                          }}
                          options={[
                            { value: "High", label: "High Priority" },
                            { value: "Medium", label: "Medium Priority" },
                            { value: "Resolved", label: "Resolved" }
                          ]}
                          className="h-[42px]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Next Follow-Up Date</label>
                        <input 
                          type="date"
                          value={escalationFollowUpDate}
                          onChange={(e) => setEscalationFollowUpDate(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Comments</label>
                      <textarea 
                        value={escalationComments}
                        onChange={(e) => setEscalationComments(e.target.value)}
                        placeholder="Describe the escalation details..."
                        rows={4}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                        required
                      />
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button 
                        type="button"
                        onClick={() => setEscalationTab("history")}
                        className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                      >
                        Submit Escalation
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

