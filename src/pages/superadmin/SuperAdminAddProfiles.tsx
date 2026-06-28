import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, Download, Plus, FileText, Calendar as CalendarIcon, History, Edit, X, User, Star, Briefcase, Users, FileCheck, Target, AlertCircle, Calendar, MessageSquare, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchableSelect } from "../../components/SearchableSelect";
import { getStatusBadgeClasses } from "../../../lib/utils";

const MOCK_COMPANIES = [
  { label: "Tech Mahindra", value: "techmahindra" },
  { label: "HCLTech", value: "hcltech" }
];

const MOCK_RECRUITERS = [
  { label: "Rohan Gupta", value: "john" },
  { label: "Priya Desai", value: "jane" }
];

const MOCK_JOBCODES = [
  { label: "DEV-01", value: "dev_01" },
  { label: "QA-02", value: "qa_02" }
];

const MOCK_VENDORS = [
  { label: "Vendor A", value: "vendor_a" },
  { label: "Vendor B", value: "vendor_b" }
];

const MOCK_RATINGS = [
  { label: "5 Stars", value: "5" },
  { label: "4+ Stars", value: "4" },
  { label: "3+ Stars", value: "3" },
  { label: "2+ Stars", value: "2" },
  { label: "1+ Stars", value: "1" }
];

const MOCK_SKILLS = [
  { label: "React", value: "react" },
  { label: "Node.js", value: "nodejs" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "AWS", value: "aws" }
];

const initialData = [
  { 
    id: "P001", name: "Aarohi Patel", jobCode: "dev_01", interviewDate: "2026-06-25", 
    rating: "3.5", status: "In Progress", company: "techmahindra", recruiter: "jane", 
    skills: ["react", "nodejs"] 
  },
  { 
    id: "P002", name: "Rahul Sharma", jobCode: "qa_02", interviewDate: "2026-06-26", 
    rating: "4.0", status: "Selected", company: "hcltech", recruiter: "john", 
    skills: ["java", "aws"] 
  },
];

const mockEscalationHistory = [
  { id: 1, date: "14 Oct 2026", status: "Medium", comments: "Not receiving enough quality profiles for this role." },
  { id: 2, date: "15 Oct 2026", status: "High", comments: "Still waiting on vendor responses. Requirement is critical." },
  { id: 3, date: "16 Oct 2026", status: "Resolved", comments: "Vendor strategy updated. New profiles expected by Friday." },
  { id: 4, date: "18 Oct 2026", status: "Medium", comments: "Profiles received but do not match the required skill set." },
  { id: 5, date: "20 Oct 2026", status: "Resolved", comments: "Conducted a sync with the recruitment team to recalibrate the requirement." },
];

export default function SuperAdminAddProfiles() {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [filterCompany, setFilterCompany] = useState("");
  const [filterRecruiter, setFilterRecruiter] = useState("");
  const [filterJobCode, setFilterJobCode] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [filterSkill, setFilterSkill] = useState("");

  // Modals state
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [selectedDateRange, setSelectedDateRange] = useState("this_month");

  // Escalation Manager state
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

  // Apply filters on the fly
  const filteredData = data.filter(item => {
    const matchCompany = filterCompany ? item.company === filterCompany : true;
    const matchRecruiter = filterRecruiter ? item.recruiter === filterRecruiter : true;
    const matchJobCode = filterJobCode ? item.jobCode === filterJobCode : true;
    const matchRating = filterRating ? parseFloat(item.rating) >= parseFloat(filterRating) : true;
    const matchSkill = filterSkill ? item.skills.includes(filterSkill) : true;
    
    return matchCompany && matchRecruiter && matchJobCode && matchRating && matchSkill;
  });

  const handleSearch = () => {
    // With on-the-fly filtering, this button could just be a visual confirmation or trigger an API call in a real app.
  };

  const handleReset = () => {
    setFilterCompany("");
    setFilterRecruiter("");
    setFilterJobCode("");
    setFilterRating("");
    setFilterSkill("");
  };

  const handleReload = () => {
    handleReset();
  };

  const handleDownloadGrid = () => {
    alert("Downloading Profiles Grid...");
  };

  const handleDownloadResume = (name: string) => {
    alert(`Downloading resume for ${name}...`);
  };

  return (
    <div className="space-y-6 relative">
      <div>
        <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Add Profiles</h2>
        <p className="text-muted-foreground mt-1">Manage candidate profiles, update status, and view history.</p>
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
                onClick={() => navigate(`/dashboard/admin/candidates/${item.path}`)}
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

      {/* Unified Action Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-3 px-4 rounded-2xl shadow-sm border border-border/50 flex flex-col xl:flex-row items-center justify-between gap-3 relative z-10"
      >
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 w-full xl:w-auto">
          <SearchableSelect
            options={MOCK_COMPANIES}
            value={filterCompany}
            onChange={(val) => setFilterCompany(val)}
            placeholder="Company"
            className="w-full lg:w-[180px] h-[42px]"
          />
          <SearchableSelect
            options={MOCK_RECRUITERS}
            value={filterRecruiter}
            onChange={(val) => setFilterRecruiter(val)}
            placeholder="Recruiter"
            className="w-full lg:w-[180px] h-[42px]"
          />
          <SearchableSelect
            options={MOCK_JOBCODES}
            value={filterJobCode}
            onChange={(val) => setFilterJobCode(val)}
            placeholder="JobCode"
            className="w-full lg:w-[120px] h-[42px]"
          />
          <SearchableSelect
            options={MOCK_RATINGS}
            value={filterRating}
            onChange={(val) => setFilterRating(val)}
            placeholder="Rating"
            className="w-full lg:w-[120px] h-[42px]"
          />
          <SearchableSelect
            options={MOCK_SKILLS}
            value={filterSkill}
            onChange={(val) => setFilterSkill(val)}
            placeholder="Skill"
            className="w-full lg:w-[140px] h-[42px]"
          />
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button 
              onClick={handleSearch}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 h-[42px] px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
            <button 
              onClick={handleReset}
              className="h-[42px] px-4 bg-secondary/50 text-muted-foreground hover:text-foreground text-sm font-bold rounded-xl hover:bg-secondary transition-all shrink-0"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full xl:w-auto justify-end border-t xl:border-t-0 xl:border-l border-border/50 pt-3 xl:pt-0 xl:pl-3">
          <button 
            onClick={handleReload}
            className="flex items-center justify-center w-[42px] h-[42px] bg-secondary text-secondary-foreground rounded-xl hover:bg-black/5 transition-all shrink-0"
            title="Reload Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDownloadGrid}
            className="flex items-center justify-center w-[42px] h-[42px] bg-secondary text-secondary-foreground rounded-xl hover:bg-black/5 transition-all shrink-0"
            title="Download Data"
          >
            <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setShowSummaryModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 h-[42px] px-4 bg-[#0085F7]/10 text-[#0085F7] text-sm font-bold rounded-xl hover:bg-[#0085F7]/20 transition-all shrink-0"
          >
            <FileText className="w-4 h-4" />
            Summary
          </button>
          <button 
            onClick={() => setShowAddCandidateModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 h-[42px] px-5 bg-[#00A94B] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#00A94B]/90 transition-all shrink-0"
          >
            <Plus className="w-4 h-4 shrink-0" />
            Add Candidate
          </button>
        </div>
      </motion.div>

      {/* Main Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold">Candidate Details</th>
                <th className="px-6 py-4 font-bold">Interview Date</th>
                <th className="px-6 py-4 font-bold">Rating</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{item.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Briefcase className="w-3 h-3" /> {item.jobCode}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{item.interviewDate}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">10:00 AM EST</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-orange-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold ml-1 text-sm">{item.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusBadgeClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setSelectedProfile(item); setShowUpdateStatusModal(true); }}
                        className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
                        title="Update Status"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedProfile(item); setShowScheduleModal(true); }}
                        className="p-1.5 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white transition-colors"
                        title="Schedule Interview"
                      >
                        <CalendarIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedProfile(item); setShowHistoryModal(true); }}
                        className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 hover:bg-purple-500 hover:text-white transition-colors"
                        title="View History"
                      >
                        <History className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDownloadResume(item.name)}
                        className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors"
                        title="Download Resume"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    No profiles found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Candidate Modal */}
      <AnimatePresence>
        {showAddCandidateModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowAddCandidateModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[101] border border-border/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00A94B]/10 rounded-lg">
                    <User className="w-5 h-5 text-[#00A94B]" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground">Add Candidate</h3>
                </div>
                <button onClick={() => setShowAddCandidateModal(false)} className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]" placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Email / UserName</label>
                  <input type="text" className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]" placeholder="Email Address" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Mobile No</label>
                    <input type="text" className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]" placeholder="Mobile Number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Vendor</label>
                    <SearchableSelect options={MOCK_VENDORS} value="" onChange={() => {}} placeholder="Select Vendor" className="w-full h-[42px]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Upload Resume</label>
                  <input type="file" className="w-full px-4 py-2 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                </div>
              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50 shrink-0 rounded-b-2xl">
                <button onClick={() => setShowAddCandidateModal(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors">Cancel</button>
                <button onClick={() => setShowAddCandidateModal(false)} className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors">Save</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Update Status Modal */}
      <AnimatePresence>
        {showUpdateStatusModal && selectedProfile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={() => setShowUpdateStatusModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Edit className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Update Status</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedProfile.name} • {selectedProfile.jobCode}</p>
                  </div>
                </div>
                <button onClick={() => setShowUpdateStatusModal(false)} className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Status</label>
                  <SearchableSelect options={[{label: "In Progress", value: "ip"}, {label: "Selected", value: "sel"}, {label: "Rejected", value: "rej"}]} value="" onChange={() => {}} placeholder="Select Status" className="w-full h-[42px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">New Followup Date</label>
                  <input type="date" className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Comments</label>
                  <textarea rows={3} className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="Add comments..." />
                </div>
              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50 shrink-0 rounded-b-2xl">
                <button onClick={() => setShowUpdateStatusModal(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors">Cancel</button>
                <button onClick={() => setShowUpdateStatusModal(false)} className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors">Update</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Schedule Interview Modal */}
      <AnimatePresence>
        {showScheduleModal && selectedProfile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={() => setShowScheduleModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg"><CalendarIcon className="w-5 h-5 text-green-600" /></div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Schedule Interview</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedProfile.name} • {selectedProfile.jobCode}</p>
                  </div>
                </div>
                <button onClick={() => setShowScheduleModal(false)} className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 overflow-y-auto">
                <table className="w-full text-sm text-left whitespace-nowrap border border-border/50 rounded-xl overflow-hidden">
                  <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                    <tr>
                      <th className="px-4 py-3 font-bold">Interview Rounds</th>
                      <th className="px-4 py-3 font-bold">Interview Date</th>
                      <th className="px-4 py-3 font-bold">Meeting Link</th>
                      <th className="px-4 py-3 font-bold">Rating</th>
                      <th className="px-4 py-3 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">Technical Round 1</td>
                      <td className="px-4 py-3 text-muted-foreground">2026-06-25</td>
                      <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">Join Meet</td>
                      <td className="px-4 py-3 font-bold">3.5</td>
                      <td className="px-4 py-3 text-right">
                        <button className="px-3 py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg mr-2 transition-colors">Schedule</button>
                        <button className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors">Reschedule</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* View History Modal */}
      <AnimatePresence>
        {showHistoryModal && selectedProfile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={() => setShowHistoryModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg"><History className="w-5 h-5 text-purple-600" /></div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">History</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedProfile.name} • {selectedProfile.jobCode}</p>
                  </div>
                </div>
                <button onClick={() => setShowHistoryModal(false)} className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 overflow-y-auto">
                <table className="w-full text-sm text-left whitespace-nowrap border border-border/50 rounded-xl overflow-hidden">
                  <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                    <tr>
                      <th className="px-4 py-3 font-bold">Candidate Name</th>
                      <th className="px-4 py-3 font-bold">Follow Up Date</th>
                      <th className="px-4 py-3 font-bold">Comments</th>
                      <th className="px-4 py-3 font-bold">Created Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">{selectedProfile.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">2026-06-30</td>
                      <td className="px-4 py-3 text-muted-foreground">Follow up after round 1</td>
                      <td className="px-4 py-3 text-muted-foreground">2026-06-25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Summary Modal */}
      <AnimatePresence>
        {showSummaryModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={() => setShowSummaryModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#0085F7]/10 rounded-lg"><FileText className="w-5 h-5 text-[#0085F7]" /></div>
                  <h3 className="text-xl font-bold font-heading text-foreground">Summary</h3>
                </div>
                <button onClick={() => setShowSummaryModal(false)} className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6">
                
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <div className="flex flex-wrap items-center gap-2">
                      <button 
                        onClick={() => setSelectedDateRange("last_7_days")}
                        className={`px-4 h-[42px] rounded-xl text-sm transition-all ${selectedDateRange === 'last_7_days' ? 'font-bold bg-secondary border border-border/50 text-foreground shadow-sm' : 'font-medium bg-white border border-border/50 hover:bg-secondary hover:text-foreground text-muted-foreground'}`}>Last 7 Days</button>
                      <button 
                        onClick={() => setSelectedDateRange("this_month")}
                        className={`px-4 h-[42px] rounded-xl text-sm transition-all ${selectedDateRange === 'this_month' ? 'font-bold bg-secondary border border-border/50 text-foreground shadow-sm' : 'font-medium bg-white border border-border/50 hover:bg-secondary hover:text-foreground text-muted-foreground'}`}>This Month</button>
                      <button 
                        onClick={() => setSelectedDateRange("custom")}
                        className={`px-4 h-[42px] rounded-xl text-sm transition-all ${selectedDateRange === 'custom' ? 'font-bold bg-secondary border border-border/50 text-foreground shadow-sm' : 'font-medium bg-white border border-border/50 hover:bg-secondary hover:text-foreground text-muted-foreground'}`}>Custom Range</button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                    <div className={`flex items-center h-[42px] bg-white border border-border/50 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all w-full sm:w-auto shadow-sm ${selectedDateRange !== 'custom' ? 'opacity-60 cursor-not-allowed bg-secondary/50 grayscale-[50%]' : ''}`}>
                      <input type="date" disabled={selectedDateRange !== 'custom'} className="px-3 h-full text-sm outline-none text-foreground bg-transparent w-full sm:w-[130px] disabled:cursor-not-allowed disabled:text-muted-foreground" defaultValue="2026-06-01" />
                      <div className="px-3 text-xs font-bold text-muted-foreground uppercase bg-secondary/30 h-full flex items-center border-x border-border/50">to</div>
                      <input type="date" disabled={selectedDateRange !== 'custom'} className="px-3 h-full text-sm outline-none text-foreground bg-transparent w-full sm:w-[130px] disabled:cursor-not-allowed disabled:text-muted-foreground" defaultValue="2026-06-30" />
                    </div>
                    <button className="flex items-center justify-center gap-2 h-[42px] px-6 bg-primary text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 w-full sm:w-auto shrink-0">
                      <Search className="w-4 h-4" /> 
                      <span>Search</span>
                    </button>
                  </div>
                </div>

                <div className="border border-border/50 rounded-xl overflow-hidden">
                  <table className="w-full text-sm text-center whitespace-nowrap">
                    <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                      <tr className="divide-x divide-border/50">
                        <th className="px-4 py-4 font-bold border-r border-border/50">Profiles Received</th>
                        <th className="px-4 py-4 font-bold border-r border-border/50">Interviews Completed</th>
                        <th className="px-4 py-4 font-bold border-r border-border/50">Interviews Scheduled</th>
                        <th className="px-4 py-4 font-bold border-r border-border/50">Rating ≥ 3</th>
                        <th className="px-4 py-4 font-bold border-r border-border/50">Rating 2.5 - 2.9</th>
                        <th className="px-4 py-4 font-bold">No Responses</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      <tr className="divide-x divide-border/50 bg-white">
                        <td className="px-4 py-4 font-bold text-lg text-foreground">120</td>
                        <td className="px-4 py-4 font-bold text-lg text-foreground">85</td>
                        <td className="px-4 py-4 font-bold text-lg text-foreground">12</td>
                        <td className="px-4 py-4 font-bold text-lg text-green-600">45</td>
                        <td className="px-4 py-4 font-bold text-lg text-orange-500">20</td>
                        <td className="px-4 py-4 font-bold text-lg text-red-500">5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </motion.div>
          </>
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
                  <p className="text-sm font-medium text-slate-500 mt-0.5">Manage escalations for all profiles</p>
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

