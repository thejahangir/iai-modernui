import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SearchableSelect } from "../../components/SearchableSelect";
import { 
  Search, 
  Filter, 
  Briefcase, 
  Calendar, 
  User, 
  BookOpen, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Plus,
  Users,
  Target,
  FileCheck,
  ChevronDown,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy data for postings
const initialPostings = Array.from({ length: 24 }).map((_, i) => ({
  id: `REQ-00${i + 1}`,
  title: [
    "Senior Full Stack Engineer",
    "Product Designer (UI/UX)",
    "Lead Senior Enterprise DevOps Solutions Cloud Migration Architect (Remote)",
    "Backend Developer",
    "Frontend Developer",
    "Data Scientist",
    "Cloud Solutions Architect",
    "QA Automation Engineer"
  ][i % 8],
  postedBy: ["Sarah Jenkins", "David Chen", "Michael Ross", "Emily Wang"][i % 4],
  postedOn: `${Math.floor(Math.random() * 28) + 1} Oct 2026`,
  experience: ["2-4 Years", "3-5 Years", "5-8 Years", "8+ Years"][i % 4],
  designation: ["SDE II", "SDE III", "Lead Designer", "Principal Engineer"][i % 4],
  skills: [
    ["React", "Node.js", "AWS", "TypeScript", "GraphQL", "MongoDB", "Redux", "Express", "Docker", "Jest", "Tailwind", "Next.js"],
    ["Figma", "Prototyping", "User Research"],
    ["Kubernetes", "Terraform", "CI/CD", "GCP", "Jenkins", "Ansible", "Linux", "Prometheus", "Grafana", "Bash"],
    ["Python", "Django", "PostgreSQL", "FastAPI"],
    ["Vue.js", "Nuxt.js", "Tailwind CSS", "JavaScript"],
    ["Python", "TensorFlow", "PyTorch", "SQL"],
    ["AWS", "Azure", "Docker", "Microservices"],
    ["Selenium", "Cypress", "Jest", "Playwright"]
  ][i % 8],
  status: ["Open", "On-Hold", "Closed"][i % 3],
  metrics: { 
    related: Math.floor(Math.random() * 100) + 10, 
    applied: Math.floor(Math.random() * 50) + 5, 
    shortlisted: Math.floor(Math.random() * 10) 
  }
}));

const mockEscalationHistory = [
  { id: 1, date: "14 Oct 2026", status: "Medium", comments: "Not receiving enough quality profiles for this role." },
  { id: 2, date: "15 Oct 2026", status: "High", comments: "Still waiting on vendor responses. Requirement is critical." },
  { id: 3, date: "16 Oct 2026", status: "Resolved", comments: "Vendor strategy updated. New profiles expected by Friday." },
  { id: 4, date: "18 Oct 2026", status: "Medium", comments: "Profiles received but do not match the required skill set." },
  { id: 5, date: "20 Oct 2026", status: "Resolved", comments: "Conducted a sync with the recruitment team to recalibrate the requirement." },
];

const STATUS_COLORS = {
  "Open": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "On-Hold": "bg-amber-50 text-amber-600 border-amber-200",
  "Closed": "bg-slate-100 text-slate-600 border-slate-200",
};

export default function AccountManagerAllPostings() {
  const [postings, setPostings] = useState(initialPostings);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [filterJobCode, setFilterJobCode] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  
  // Status Update Modal state
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatusPosting, setSelectedStatusPosting] = useState<any>(null);
  
  // Summary Modal state
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [selectedSummaryPosting, setSelectedSummaryPosting] = useState<any>(null);
  const [updateStatusVal, setUpdateStatusVal] = useState("");
  const [assignee, setAssignee] = useState("");
  const [statusComments, setStatusComments] = useState("");
  const [statusErrors, setStatusErrors] = useState({ status: "", assignee: "" });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterSkill, filterJobCode, filterStatus]);
  
  // Modal state
  const [selectedPosting, setSelectedPosting] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"history" | "add">("history");

  // New Escalation Form State
  const [newStatus, setNewStatus] = useState("High");
  const [followUpDate, setFollowUpDate] = useState("");
  const [comments, setComments] = useState("");
  const [escalationError, setEscalationError] = useState("");

  const handleStatusChange = (id: string, newStatus: string) => {
    setPostings(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const openModal = (posting: any) => {
    setSelectedPosting(posting);
    setActiveTab("history");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsStatusModalOpen(false);
    setSelectedPosting(null);
    setSelectedStatusPosting(null);
  };

  const handleSubmitEscalation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatus) {
      setEscalationError("Please select a status level");
      return;
    }
    closeModal();
    // In a real app, we'd add the new escalation to the history state here
  };

  const filteredPostings = postings.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSkill = filterSkill ? p.skills.includes(filterSkill) : true;
    const matchJobCode = filterJobCode ? p.id === filterJobCode : true;
    const matchStatus = filterStatus ? p.status === filterStatus : true;
    return matchSearch && matchSkill && matchJobCode && matchStatus;
  });

  // Extract unique skills and job codes for dropdowns
  const uniqueSkills = Array.from(new Set(postings.flatMap(p => p.skills))).sort();
  const uniqueJobCodes = Array.from(new Set(postings.map(p => p.id))).sort();

  // Pagination logic
  const totalPages = Math.ceil(filteredPostings.length / itemsPerPage);
  const paginatedPostings = filteredPostings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">All Postings</h1>
          <p className="text-slate-500 mt-1">Manage and track your organization's job requirements</p>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Title or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2.5 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        
        <div className="relative w-full sm:w-48 shrink-0">
          <SearchableSelect
            value={filterSkill}
            onChange={setFilterSkill}
            placeholder="All Primary Skills"
            options={[
              { value: "", label: "All Primary Skills" },
              ...uniqueSkills.map(skill => ({ value: skill, label: skill }))
            ]}
            className="h-[42px]"
          />
        </div>

        <div className="relative w-full sm:w-32 shrink-0">
          <SearchableSelect
            value={filterJobCode}
            onChange={setFilterJobCode}
            placeholder="Job Code"
            options={[
              { value: "", label: "All Job Codes" },
              ...uniqueJobCodes.map(code => ({ value: code, label: code }))
            ]}
            className="h-[42px]"
          />
        </div>

        <div className="relative w-full sm:w-36 shrink-0">
          <SearchableSelect
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Status"
            options={[
              { value: "", label: "All Statuses" },
              { value: "Open", label: "Open" },
              { value: "On-Hold", label: "On-Hold" },
              { value: "Closed", label: "Closed" }
            ]}
            className="h-[42px]"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto shrink-0 ml-auto">
          <button 
            onClick={() => {
              setSearchTerm("");
              setFilterSkill("");
              setFilterJobCode("");
              setFilterStatus("");
            }}
            className="w-[42px] shrink-0 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 rounded-xl flex justify-center items-center transition-colors" 
            title="Reload Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl flex justify-center items-center text-sm shadow-sm hover:bg-primary/90 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Postings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {paginatedPostings.map((posting, idx) => (
            <motion.div
              key={posting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-5 pb-3 border-b border-slate-50 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-full -z-10"></div>
                <div className="flex justify-between items-start gap-3 mb-1.5">
                  <h3 
                    className="text-base font-bold text-slate-800 leading-tight truncate"
                    title={posting.title}
                  >
                    {posting.title}
                  </h3>
                  
                  {/* Status Button */}
                  <div className="relative group shrink-0">
                    <button
                      onClick={() => {
                        setSelectedStatusPosting(posting);
                        setUpdateStatusVal(posting.status);
                        setAssignee("");
                        setStatusComments("");
                        setIsStatusModalOpen(true);
                      }}
                      className={cn(
                        "flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-lg text-[11px] font-bold border cursor-pointer hover:opacity-80 transition-opacity",
                        STATUS_COLORS[posting.status as keyof typeof STATUS_COLORS]
                      )}
                    >
                      {posting.status}
                      <ChevronDown className="w-3 h-3 opacity-70" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center text-[11px] font-medium text-slate-400">
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded-md text-slate-600">{posting.id}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <User className="w-3 h-3" /> Posted By
                    </span>
                    <p className="text-sm font-medium text-slate-700">{posting.postedBy}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <Calendar className="w-3 h-3" /> Posted On
                    </span>
                    <p className="text-sm font-medium text-slate-700">{posting.postedOn}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <Briefcase className="w-3 h-3" /> Designation
                    </span>
                    <p className="text-sm font-medium text-slate-700">{posting.designation}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <Clock className="w-3 h-3" /> Experience
                    </span>
                    <p className="text-sm font-medium text-slate-700">{posting.experience}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <BookOpen className="w-3 h-3" /> Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {posting.skills.map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-auto">
                  <button 
                    onClick={() => {
                      setSelectedSummaryPosting(posting);
                      setIsSummaryModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                  >
                    <FileCheck className="w-4 h-4" />
                    Summary
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && filteredPostings.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-slate-200 shadow-sm mt-4"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredPostings.length)}</span> of{' '}
                <span className="font-medium text-slate-900">{filteredPostings.length}</span> results
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
          
          {/* Mobile Pagination */}
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

      {/* Escalation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
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
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{selectedPosting?.id} - {selectedPosting?.title}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="px-6 flex gap-6 border-b border-slate-100">
                <button
                  onClick={() => setActiveTab("history")}
                  className={cn(
                    "py-4 text-sm font-bold border-b-2 transition-colors",
                    activeTab === "history" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  )}
                >
                  History
                </button>
                <button
                  onClick={() => setActiveTab("add")}
                  className={cn(
                    "py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5",
                    activeTab === "add" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Plus className="w-4 h-4" /> Add Escalation
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto">
                {activeTab === "history" ? (
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
                          value={newStatus}
                          onChange={(val) => {
                            setNewStatus(val);
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
                          value={followUpDate}
                          onChange={(e) => setFollowUpDate(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Comments</label>
                      <textarea 
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Describe the escalation details..."
                        rows={4}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                        required
                      />
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button 
                        type="button"
                        onClick={() => setActiveTab("history")}
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

      {/* Status Update Modal */}
      <AnimatePresence>
        {isStatusModalOpen && selectedStatusPosting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Update Status</h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{selectedStatusPosting.id} - {selectedStatusPosting.title}</p>
                </div>
                <button 
                  onClick={() => setIsStatusModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    let hasError = false;
                    const newErrors = { status: "", assignee: "" };
                    if (!updateStatusVal) {
                      newErrors.status = "Please select a new status";
                      hasError = true;
                    }
                    if (!assignee) {
                      newErrors.assignee = "Please select an assignee";
                      hasError = true;
                    }
                    if (hasError) {
                      setStatusErrors(newErrors);
                      return;
                    }
                    const newPostings = postings.map(p => 
                      p.id === selectedStatusPosting.id ? { ...p, status: updateStatusVal } : p
                    );
                    setPostings(newPostings);
                    setIsStatusModalOpen(false);
                  }} 
                  className="space-y-5"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">New Status</label>
                      <AnimatePresence>
                        {statusErrors.status && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-rose-500 font-medium"
                          >
                            {statusErrors.status}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <SearchableSelect
                      value={updateStatusVal}
                      onChange={(val) => {
                        setUpdateStatusVal(val);
                        setStatusErrors(prev => ({ ...prev, status: "" }));
                      }}
                      options={[
                        { value: "Open", label: "Open" },
                        { value: "On-Hold", label: "On-Hold" },
                        { value: "Closed", label: "Closed" }
                      ]}
                      className="h-[42px]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">Assign To</label>
                      <AnimatePresence>
                        {statusErrors.assignee && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-rose-500 font-medium"
                          >
                            {statusErrors.assignee}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <SearchableSelect
                      value={assignee}
                      onChange={(val) => {
                        setAssignee(val);
                        setStatusErrors(prev => ({ ...prev, assignee: "" }));
                      }}
                      placeholder="Select Assignee..."
                      options={[
                        { value: "Sarah Jenkins", label: "Sarah Jenkins" },
                        { value: "David Chen", label: "David Chen" },
                        { value: "Michael Ross", label: "Michael Ross" },
                        { value: "Emily Wang", label: "Emily Wang" }
                      ]}
                      className="h-[42px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Comments</label>
                    <textarea 
                      value={statusComments}
                      onChange={(e) => setStatusComments(e.target.value)}
                      placeholder="Add reasoning or context for this assignment..."
                      rows={3}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      required
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsStatusModalOpen(false)}
                      className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                    >
                      Update Status
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Summary Modal */}
      <AnimatePresence>
        {isSummaryModalOpen && selectedSummaryPosting && (
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
                  <h2 className="text-xl font-bold text-slate-800">Summary Report</h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{selectedSummaryPosting.id} - {selectedSummaryPosting.title}</p>
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

